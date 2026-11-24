
import path from "node:path";
import { existsSync } from "node:fs";
import * as ts from "typescript";

export interface ModuleResolutionConfig {
  configPath: string | null;
  compilerOptions: ts.CompilerOptions | undefined;
  diagnostics: readonly ts.Diagnostic[];
}

export interface ModuleResolutionConfigIndex {
  rootPath: string;
  configsByDirectory: Map<string, ModuleResolutionConfig>;
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

export function createModuleResolutionConfigIndex(
  rootPath: string,
  configs: ModuleResolutionConfig[],
): ModuleResolutionConfigIndex {
  const absoluteRoot = path.resolve(rootPath);

  const configsByDirectory = new Map<
    string,
    ModuleResolutionConfig
  >();

  for (const config of configs) {
    if (!config.configPath) {
      continue;
    }

    configsByDirectory.set(
      path.resolve(path.dirname(config.configPath)),
      config,
    );
  }

  return {
    rootPath: absoluteRoot,
    configsByDirectory,
  };
}

export function findModuleResolutionConfigForFile(
  sourceFile: string,
  rootPath: string,
  configs: ModuleResolutionConfig[],
): ModuleResolutionConfig | null {
  return findModuleResolutionConfigUsingIndex(
    sourceFile,
    createModuleResolutionConfigIndex(rootPath, configs),
  );
}

export function findModuleResolutionConfigUsingIndex(
  sourceFile: string,
  index: ModuleResolutionConfigIndex,
): ModuleResolutionConfig | null {
  const absoluteSource = path.resolve(index.rootPath, sourceFile);

  const relativeSource = path.relative(
    index.rootPath,
    absoluteSource,
  );

  if (
    relativeSource === ".." ||
    relativeSource.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativeSource)
  ) {
    return null;
  }

  let currentDirectory = path.dirname(absoluteSource);

  while (true) {
    const config = index.configsByDirectory.get(currentDirectory);

    if (config) {
      return config;
    }

    if (currentDirectory === index.rootPath) {
      break;
    }

    const parentDirectory = path.dirname(currentDirectory);

    if (
      parentDirectory === currentDirectory ||
      !(
        parentDirectory === index.rootPath ||
        parentDirectory.startsWith(`${index.rootPath}${path.sep}`)
      )
    ) {
      break;
    }

    currentDirectory = parentDirectory;
  }

  return null;
}
