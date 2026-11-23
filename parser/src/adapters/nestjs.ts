import ts from "typescript";

import { mapConcurrent } from "../util/map-concurrent";

import type { ExtractedRoute } from "../types";
import type { FrameworkAdapter, RouteContext } from "./framework-adapter";
import { baseName, isConfigFile, isSourceFile, isTestFile } from "./role-helpers";

const SUFFIX_ROLES: Record<string, string> = {
  controller: "Controllers",
  resolver: "Resolvers",
  gateway: "Gateways",
  service: "Services",
  repository: "Repositories",
  module: "Modules",
  entity: "Entities",
  dto: "DTOs",
  guard: "Guards",
  interceptor: "Interceptors",
  pipe: "Pipes",
  filter: "Filters",
  middleware: "Middleware",
  decorator: "Decorators",
};

const METHOD_DECORATORS: Record<string, string> = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Delete: "DELETE",
  Patch: "PATCH",
  Options: "OPTIONS",
  Head: "HEAD",
  All: "ALL",
};

function joinPattern(...parts: string[]): string {
  const segments = parts
    .flatMap((part) => part.split("/"))
    .filter((segment) => segment.length > 0);

  return `/${segments.join("/")}`;
}

/** Local names that @nestjs/common's exports are imported under. */
function nestImports(sourceFile: ts.SourceFile): Map<string, string> {
  const names = new Map<string, string>();

  for (const statement of sourceFile.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.moduleSpecifier.text === "@nestjs/common" &&
      statement.importClause?.namedBindings &&
      ts.isNamedImports(statement.importClause.namedBindings)
    ) {
      for (const element of statement.importClause.namedBindings.elements) {
        names.set(element.name.text, (element.propertyName ?? element.name).text);
      }
    }
  }

  return names;
}

type DecoratorCall = { name: string; args: readonly ts.Expression[]; node: ts.Decorator };

function decoratorsOf(node: ts.Node, imports: Map<string, string>): DecoratorCall[] {
  if (!ts.canHaveDecorators(node)) return [];

  const calls: DecoratorCall[] = [];

  for (const decorator of ts.getDecorators(node) ?? []) {
    const expression = decorator.expression;

    if (ts.isCallExpression(expression) && ts.isIdentifier(expression.expression)) {
      const name = imports.get(expression.expression.text);
      if (name) calls.push({ name, args: expression.arguments, node: decorator });
    } else if (ts.isIdentifier(expression)) {
      const name = imports.get(expression.text);
      if (name) calls.push({ name, args: [], node: decorator });
    }
  }

  return calls;
}

/**
 * The prefix a @Controller(...) gives, or null when it can't be read exactly:
 * @Controller(), @Controller("cats"), or @Controller({ path: "cats" }).
 * A version, a computed value or several paths all change what the URL is.
 */
function controllerPrefix(call: DecoratorCall): string | null {
  if (call.args.length === 0) return "";

  if (call.args.length !== 1) return null;

  const [argument] = call.args;

  if (ts.isStringLiteralLike(argument)) return argument.text;

  if (ts.isObjectLiteralExpression(argument)) {
    let prefix = "";

    for (const property of argument.properties) {
      if (!ts.isPropertyAssignment(property)) return null;

      const name = ts.isIdentifier(property.name) ? property.name.text : null;

      if (name === "path") {
        if (!ts.isStringLiteralLike(property.initializer)) return null;
        prefix = property.initializer.text;
      } else if (name === "version") {
        return null;
      }
    }

    return prefix;
  }

  return null;
}

function methodPath(call: DecoratorCall): string | null {
  if (call.args.length === 0) return "";
  if (call.args.length === 1 && ts.isStringLiteralLike(call.args[0])) {
    return call.args[0].text;
  }
  return null;
}

type GlobalPrefix = { kind: "none" } | { kind: "prefix"; value: string } | { kind: "unknown" };

/**
 * setGlobalPrefix, versioning and RouterModule all change every URL. If one
 * is used in a way that can't be read exactly, no route in the repository is
 * exact, so none are reported.
 */
function globalPrefixFrom(texts: readonly string[]): GlobalPrefix {
  const prefixes = new Set<string>();

  for (const text of texts) {
    if (/enableVersioning\s*\(/.test(text) || /RouterModule\s*\.\s*register/.test(text)) {
      return { kind: "unknown" };
    }

    if (!text.includes("setGlobalPrefix")) continue;

    const calls = text.match(/setGlobalPrefix\s*\(/g)?.length ?? 0;
    const literal = [...text.matchAll(/setGlobalPrefix\s*\(\s*(['"`])([^'"`$\\]*)\1\s*\)/g)];

    if (calls !== literal.length) return { kind: "unknown" };

    for (const match of literal) prefixes.add(match[2]);
  }

  if (prefixes.size === 0) return { kind: "none" };
  if (prefixes.size > 1) return { kind: "unknown" };

  return { kind: "prefix", value: [...prefixes][0] };
}

async function extractRoutes(context: RouteContext): Promise<ExtractedRoute[]> {
  const sources = context.files.filter(
    (file) => isSourceFile(file) && file.kind !== "test" && !isTestFile(file),
  );

  const texts = await mapConcurrent(sources, 32, (file) => context.read(file.path));

  const global = globalPrefixFrom(texts);
  if (global.kind === "unknown") return [];

  const routes: ExtractedRoute[] = [];

  sources.forEach((file, index) => {
    const text = texts[index];
    if (!text.includes("@Controller")) return;

    const sourceFile = ts.createSourceFile(
      file.path,
      text,
      ts.ScriptTarget.Latest,
      false,
      file.extension === ".ts" || file.extension === ".mts" || file.extension === ".cts"
        ? ts.ScriptKind.TS
        : ts.ScriptKind.JS,
    );

    const imports = nestImports(sourceFile);

    for (const statement of sourceFile.statements) {
      if (!ts.isClassDeclaration(statement)) continue;

      const classDecorators = decoratorsOf(statement, imports);
      const controller = classDecorators.find((call) => call.name === "Controller");

      if (!controller || classDecorators.some((call) => call.name === "Version")) continue;

      const prefix = controllerPrefix(controller);
      if (prefix === null) continue;

      for (const member of statement.members) {
        if (!ts.isMethodDeclaration(member)) continue;

        const decorators = decoratorsOf(member, imports);
        if (decorators.some((call) => call.name === "Version")) continue;

        for (const call of decorators) {
          const method = METHOD_DECORATORS[call.name];
          if (!method) continue;

          const path = methodPath(call);
          if (path === null) continue;

          const pattern = joinPattern(
            global.kind === "prefix" ? global.value : "",
            prefix,
            path,
          );

          const line =
            sourceFile.getLineAndCharacterOfPosition(call.node.getStart(sourceFile)).line + 1;

          routes.push({
            id: `route:${method}:${pattern}:${file.path}:${line}`,
            method,
            pattern,
            sourceFile: file.path,
            line,
          });
        }
      }
    }
  });

  return routes.sort(
    (a, b) =>
      a.pattern.localeCompare(b.pattern) ||
      a.method.localeCompare(b.method) ||
      a.sourceFile.localeCompare(b.sourceFile) ||
      a.line - b.line,
  );
}

export const nestjsAdapter: FrameworkAdapter = {
  id: "nestjs",
  version: "1.0.0",

  detect(context) {
    return (
      context.rootDependencies.has("@nestjs/core") ||
      context.rootDependencies.has("@nestjs/common") ||
      context.files.some((file) => file.path === "nest-cli.json") ||
      context.allDependencies.has("@nestjs/core") ||
      context.allDependencies.has("@nestjs/common")
    );
  },

  classifier() {
    return (file) => {
      if (isTestFile(file)) return "Tests";
      if (isConfigFile(file)) return "Config files";
      if (!isSourceFile(file) || file.kind === "type-declaration") return "Unclassified";

      const parts = baseName(file).toLowerCase().split(".");
      const suffix = parts.length > 1 ? parts[parts.length - 1] : "";

      if (SUFFIX_ROLES[suffix]) return SUFFIX_ROLES[suffix];
      if (parts.length === 1 && parts[0] === "main") return "Bootstrap";

      return "Unclassified";
    };
  },

  extractRoutes,
};