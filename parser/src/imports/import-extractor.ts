
import ts from "typescript";

import type {
  ImportKind,
  ImportOccurrence,
} from "../types";

export interface ImportExtractorResult {
  imports: ImportOccurrence[];
  sourceFile: string;
  /**
   * Prologue directives such as "use server" and "use client": string
   * statements at the very top of the file, before any other code.
   */
  directives: string[];
  /** Names a CommonJS module exports. Empty for a module that does not. */
  commonJsExports: string[];
}

function createImportId(
  sourceFile: string,
  kind: ImportKind,
  specifier: string,
  line: number,
  column: number,
): string {
  return [
    "import",
    sourceFile,
    kind,
    specifier,
    line,
    column,
  ].join(":");
}

function createOccurrence(
  sourceFilePath: string,
  sourceFile: ts.SourceFile,
  node: ts.Node,
  specifier: string,
  kind: ImportKind,
): ImportOccurrence {
  const position = sourceFile.getLineAndCharacterOfPosition(
    node.getStart(sourceFile),
  );

  const line = position.line + 1;
  const column = position.character + 1;

  return {
    id: createImportId(
      sourceFilePath,
      kind,
      specifier,
      line,
      column,
    ),
    sourceFile: sourceFilePath,
    specifier,
    kind,
    line,
    column,
  };
}

function getModuleSpecifier(
  node: ts.Node,
): string | null {
  if (!ts.isStringLiteralLike(node)) {
    return null;
  }

  return node.text;
}

export function extractImports(
  sourceFilePath: string,
  sourceCode: string,
): ImportExtractorResult {
  const sourceFile = ts.createSourceFile(
    sourceFilePath,
    sourceCode,
    ts.ScriptTarget.Latest,
    false,
    sourceFilePath.endsWith(".tsx") ||
      sourceFilePath.endsWith(".jsx")
      ? ts.ScriptKind.TSX
      : sourceFilePath.endsWith(".js") ||
          sourceFilePath.endsWith(".mjs") ||
          sourceFilePath.endsWith(".cjs")
        ? ts.ScriptKind.JS
        : ts.ScriptKind.TS,
  );

  const imports: ImportOccurrence[] = [];
  const commonJsExports = new Set<string>();

  function visit(node: ts.Node): void {
    // import ... from "./module"
    // import "./module"
    if (
      ts.isImportDeclaration(node) &&
      node.moduleSpecifier
    ) {
      const specifier = getModuleSpecifier(node.moduleSpecifier);

      if (specifier !== null) {
        imports.push(
          createOccurrence(
            sourceFilePath,
            sourceFile,
            node,
            specifier,
            "static",
          ),
        );
      }
    }

    // export { ... } from "./module"
    // export * from "./module"
    if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier
    ) {
      const specifier = getModuleSpecifier(node.moduleSpecifier);

      if (specifier !== null) {
        imports.push(
          createOccurrence(
            sourceFilePath,
            sourceFile,
            node,
            specifier,
            "re-export",
          ),
        );
      }
    }

    // import("./module")
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length === 1
    ) {
      const argument = node.arguments[0];
      const specifier = getModuleSpecifier(argument);

      if (specifier !== null) {
        imports.push(
          createOccurrence(
            sourceFilePath,
            sourceFile,
            node,
            specifier,
            "dynamic",
          ),
        );
      }
    }

    // require("./module")
    // Only a plain call to a free `require` with one literal argument counts.
    // Anything computed has no specifier to read, so it is not an import here.
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "require" &&
      node.arguments.length === 1
    ) {
      const specifier = getModuleSpecifier(node.arguments[0]);

      if (specifier !== null) {
        imports.push(
          createOccurrence(
            sourceFilePath,
            sourceFile,
            node,
            specifier,
            "require",
          ),
        );
      }
    }

    collectCommonJsExports(node, commonJsExports);

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  imports.sort((a, b) => {
    if (a.line !== b.line) {
      return a.line - b.line;
    }

    return a.column - b.column;
  });

  return {
    imports,
    sourceFile: sourceFilePath,
    directives: readDirectives(sourceFile),
    commonJsExports: [...commonJsExports].sort(),
  };
}

function readDirectives(sourceFile: ts.SourceFile): string[] {
  const directives: string[] = [];

  for (const statement of sourceFile.statements) {
    if (
      ts.isExpressionStatement(statement) &&
      ts.isStringLiteral(statement.expression)
    ) {
      directives.push(statement.expression.text);
      continue;
    }

    break;
  }

  return directives;
}

function isIdentifierNamed(node: ts.Node, name: string): boolean {
  return ts.isIdentifier(node) && node.text === name;
}

function propertyName(name: ts.PropertyName): string | null {
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name)) return name.text;
  return null;
}

/**
 * Reads the names a CommonJS module exports, from the three shapes that
 * name them in the source:
 *
 *   exports.name = ...
 *   module.exports.name = ...
 *   module.exports = { name, other: value }
 *
 * `module.exports = something` with a non-literal right-hand side exports a
 * value whose names are not written here, so it adds none.
 */
function collectCommonJsExports(node: ts.Node, names: Set<string>): void {
  if (
    !ts.isBinaryExpression(node) ||
    node.operatorToken.kind !== ts.SyntaxKind.EqualsToken
  ) {
    return;
  }

  const left = node.left;

  if (ts.isPropertyAccessExpression(left)) {
    const target = left.expression;

    if (isIdentifierNamed(target, "exports")) {
      names.add(left.name.text);
      return;
    }

    if (
      ts.isPropertyAccessExpression(target) &&
      isIdentifierNamed(target.expression, "module") &&
      target.name.text === "exports"
    ) {
      names.add(left.name.text);
      return;
    }

    if (
      isIdentifierNamed(target, "module") &&
      left.name.text === "exports" &&
      ts.isObjectLiteralExpression(node.right)
    ) {
      for (const property of node.right.properties) {
        if (
          ts.isPropertyAssignment(property) ||
          ts.isShorthandPropertyAssignment(property) ||
          ts.isMethodDeclaration(property)
        ) {
          const name = propertyName(property.name);
          if (name !== null) names.add(name);
        }
      }
    }
  }
}