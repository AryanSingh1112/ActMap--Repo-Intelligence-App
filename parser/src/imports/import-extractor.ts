
import ts from "typescript";
import { performance } from "node:perf_hooks";

import type {
  ImportKind,
  ImportOccurrence,
} from "../types";

export interface ImportExtractorResult {
  imports: ImportOccurrence[];
  sourceFile: string;
  directives: string[];
  commonJsExports: string[];
}

export interface ImportExtractionTiming {
  sourceFileMs: number;
  traversalMs: number;
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

function getModuleSpecifier(node: ts.Node): string | null {
  return ts.isStringLiteralLike(node) ? node.text : null;
}

function readDirectives(sourceFile: ts.SourceFile): string[] {
  const directives: string[] = [];

  for (const statement of sourceFile.statements) {
    if (
      ts.isExpressionStatement(statement) &&
      ts.isStringLiteral(statement.expression)
    ) {
      directives.push(statement.expression.text);
    } else {
      break;
    }
  }

  return directives;
}

function isIdentifierNamed(
  node: ts.Node,
  name: string,
): boolean {
  return ts.isIdentifier(node) && node.text === name;
}

function propertyName(name: ts.PropertyName): string | null {
  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteralLike(name)
  ) {
    return name.text;
  }

  return null;
}

function collectCommonJsExports(
  node: ts.BinaryExpression,
  names: Set<string>,
): void {
  if (
    node.operatorToken.kind !== ts.SyntaxKind.EqualsToken
  ) {
    return;
  }

  const left = node.left;

  if (!ts.isPropertyAccessExpression(left)) {
    return;
  }

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

        if (name !== null) {
          names.add(name);
        }
      }
    }
  }
}

export function extractImports(
  sourceFilePath: string,
  sourceCode: string,
  onTiming?: (timing: ImportExtractionTiming) => void,
): ImportExtractorResult {
  const sourceFileStartedAt = performance.now();

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

  const sourceFileMs =
    performance.now() - sourceFileStartedAt;

  const traversalStartedAt = performance.now();

  const imports: ImportOccurrence[] = [];
  const commonJsExports = new Set<string>();

  function addImport(
    node: ts.Node,
    specifierNode: ts.Node,
    kind: ImportKind,
  ): void {
    const specifier = getModuleSpecifier(specifierNode);

    if (specifier === null) {
      return;
    }

    imports.push(
      createOccurrence(
        sourceFilePath,
        sourceFile,
        node,
        specifier,
        kind,
      ),
    );
  }

  function visit(node: ts.Node): void {
    switch (node.kind) {
      case ts.SyntaxKind.ImportDeclaration: {
        const declaration = node as ts.ImportDeclaration;

        addImport(
          declaration,
          declaration.moduleSpecifier,
          "static",
        );

        break;
      }

      case ts.SyntaxKind.ExportDeclaration: {
        const declaration = node as ts.ExportDeclaration;

        if (declaration.moduleSpecifier) {
          addImport(
            declaration,
            declaration.moduleSpecifier,
            "re-export",
          );
        }

        break;
      }

      case ts.SyntaxKind.CallExpression: {
        const call = node as ts.CallExpression;

        if (call.arguments.length === 1) {
          if (
            call.expression.kind === ts.SyntaxKind.ImportKeyword
          ) {
            addImport(
              call,
              call.arguments[0],
              "dynamic",
            );
          } else if (
            ts.isIdentifier(call.expression) &&
            call.expression.text === "require"
          ) {
            addImport(
              call,
              call.arguments[0],
              "require",
            );
          }
        }

        break;
      }

      case ts.SyntaxKind.BinaryExpression: {
        collectCommonJsExports(
          node as ts.BinaryExpression,
          commonJsExports,
        );

        break;
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  const directives = readDirectives(sourceFile);
  const sortedCommonJsExports = [...commonJsExports].sort();

  const traversalMs =
    performance.now() - traversalStartedAt;

  onTiming?.({
    sourceFileMs,
    traversalMs,
  });

  return {
    imports,
    sourceFile: sourceFilePath,
    directives,
    commonJsExports: sortedCommonJsExports,
  };
}
