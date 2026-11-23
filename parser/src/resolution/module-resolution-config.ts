
import path from "node:path";
import { existsSync } from "node:fs";
import * as ts from "typescript";

export interface ModuleResolutionConfig {
  configPath: string | null;
  compilerOptions: ts.CompilerOptions | undefined;
  diagnostics: readonly ts.Diagnostic[];
}

function parseModuleResolutionConfig(
  configPath: string,
): ModuleResolutionConfig {
  const diagnostics: ts.Diagnostic[] = [];

  try {
    const parsed = ts.getParsedCommandLineOfConfigFile(
      configPath,
      {},
      {
        ...ts.sys,
        onUnRecoverableConfigFileDiagnostic(diagnostic) {
          diagnostics.push(diagnostic);
        },
      },
    );

    if (!parsed) {
      return {
        configPath,
        compilerOptions: undefined,
        diagnostics,
      };
    }

    diagnostics.push(...parsed.errors);

    return {
      configPath,
      compilerOptions: parsed.options,
      diagnostics,
    };
  } catch (error) {
    diagnostics.push({
      category: ts.DiagnosticCategory.Error,
      code: 0,
      file: undefined,
      start: undefined,
      length: undefined,
      messageText:
        error instanceof Error
          ? error.message
          : "Unable to read module resolution configuration.",
    });

    return {
      configPath,
      compilerOptions: undefined,
      diagnostics,
    };
  }
}

export function loadModuleResolutionConfig(
  rootPath: string,
): ModuleResolutionConfig {
  const absoluteRoot = path.resolve(rootPath);

  const configCandidates = [
    path.join(absoluteRoot, "tsconfig.json"),
    path.join(absoluteRoot, "jsconfig.json"),
  ];

  const configPath =
    configCandidates.find((candidate) => existsSync(candidate)) ?? null;

  if (!configPath) {
    return {
      configPath: null,
      compilerOptions: undefined,
      diagnostics: [],
    };
  }

  return parseModuleResolutionConfig(configPath);
}

/**
 * Discovers and parses TypeScript/JavaScript project configurations
 * inside the repository. Each configuration is parsed only once.
 */
export function loadModuleResolutionConfigs(
  rootPath: string,
): ModuleResolutionConfig[] {
  const absoluteRoot = path.resolve(rootPath);

  const discoveredPaths = ts.sys.readDirectory(
    absoluteRoot,
    [".json"],
    [
      "**/node_modules/**",
      "**/.git/**",
    ],
    [
      "**/tsconfig.json",
      "**/jsconfig.json",
    ],
  );

  const rootConfigPaths = [
    path.join(absoluteRoot, "tsconfig.json"),
    path.join(absoluteRoot, "jsconfig.json"),
  ].filter(existsSync);

  const configPaths = [
    ...new Set(
      [...rootConfigPaths, ...discoveredPaths].map((configPath) =>
        path.resolve(configPath),
      ),
    ),
  ];

  // Prefer tsconfig.json when both config types exist in one directory.
  configPaths.sort((a, b) => {
    const directoryDifference =
      path.dirname(a).length - path.dirname(b).length;

    if (directoryDifference !== 0) {
      return directoryDifference;
    }

    const aPriority = path.basename(a) === "tsconfig.json" ? 0 : 1;
    const bPriority = path.basename(b) === "tsconfig.json" ? 0 : 1;

    return aPriority - bPriority || a.localeCompare(b);
  });

  const configsByDirectory = new Map<
    string,
    ModuleResolutionConfig
  >();

  for (const configPath of configPaths) {
    const directory = path.dirname(configPath);

    if (configsByDirectory.has(directory)) {
      continue;
    }

    configsByDirectory.set(
      directory,
      parseModuleResolutionConfig(configPath),
    );
  }

  return [...configsByDirectory.values()];
}

/**
 * Returns the nearest applicable configuration for a source file.
 *
 * A null result means no configuration was found in the source
 * directory or any of its parent directories inside the repository.
 */
export function findModuleResolutionConfigForFile(
  sourceFile: string,
  rootPath: string,
  configs: ModuleResolutionConfig[],
): ModuleResolutionConfig | null {
  const absoluteRoot = path.resolve(rootPath);
  const absoluteSource = path.resolve(absoluteRoot, sourceFile);

  const relativeSource = path.relative(
    absoluteRoot,
    absoluteSource,
  );

  if (
    relativeSource === ".." ||
    relativeSource.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativeSource)
  ) {
    return null;
  }

  const configsByDirectory = new Map<string, ModuleResolutionConfig>();

  for (const config of configs) {
    if (!config.configPath) {
      continue;
    }

    configsByDirectory.set(
      path.resolve(path.dirname(config.configPath)),
      config,
    );
  }

  let currentDirectory = path.dirname(absoluteSource);

  while (true) {
    const config = configsByDirectory.get(currentDirectory);

    if (config) {
      return config;
    }

    if (currentDirectory === absoluteRoot) {
      break;
    }

    const parentDirectory = path.dirname(currentDirectory);

    if (
      parentDirectory === currentDirectory ||
      !(
        parentDirectory === absoluteRoot ||
        parentDirectory.startsWith(`${absoluteRoot}${path.sep}`)
      )
    ) {
      break;
    }

    currentDirectory = parentDirectory;
  }

  return null;
}
