import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it, afterEach } from "node:test";

import { parseRepository } from "../src/repository-parser";
import { extractImports } from "../src/imports/import-extractor";
import { taxonomyFor, TAXONOMIES } from "../taxonomy/categories";

const roots: string[] = [];

async function repo(files: Record<string, string>): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "actmap-adapter-"));
  roots.push(root);

  for (const [name, content] of Object.entries(files)) {
    const full = path.join(root, name);
    await mkdir(path.dirname(full), { recursive: true });
    await writeFile(full, content);
  }

  return root;
}

afterEach(async () => {
  while (roots.length) await rm(roots.pop()!, { recursive: true, force: true });
});

const roleOf = (map: Awaited<ReturnType<typeof parseRepository>>, p: string) =>
  map.files.find((file) => file.path === p)?.role;

describe("Next.js adapter", () => {
  it("assigns roles from paths and reads route handlers exactly", async () => {
    const root = await repo({
      "package.json": JSON.stringify({ dependencies: { next: "16", react: "19" } }),
      "app/page.tsx": "export default function Page() { return null }",
      "app/layout.tsx": "export default function L() { return null }",
      "app/loading.tsx": "export default function L() { return null }",
      "app/actions.ts": '"use server";\nexport async function save() {}',
      "app/api/chat/route.ts": "export async function POST() {}\nexport const GET = () => {}\nexport const dynamic = 'force-dynamic'",
      "app/(shell)/threads/[id]/route.ts": "export { handler as DELETE } from './h'",
      "app/@modal/route.ts": "export function GET() {}",
      "app/_private/route.ts": "export function GET() {}",
      "pages/api/legacy.ts": "export default function handler() {}",
      "components/button.tsx": "export const B = () => null",
      "hooks/use-thing.ts": "export const useThing = () => 1",
      "proxy.ts": "export function proxy() {}",
      "next.config.ts": "export default {}",
      "tests/a.test.ts": "export {}",
    });

    const map = await parseRepository({ rootPath: root });

    assert.equal(map.framework, "nextjs");
    assert.equal(roleOf(map, "app/page.tsx"), "Page routes");
    assert.equal(roleOf(map, "app/layout.tsx"), "Layouts");
    assert.equal(roleOf(map, "app/loading.tsx"), "Loading & error UI");
    assert.equal(roleOf(map, "app/actions.ts"), "Server actions");
    assert.equal(roleOf(map, "app/api/chat/route.ts"), "API endpoints");
    assert.equal(roleOf(map, "pages/api/legacy.ts"), "API endpoints");
    assert.equal(roleOf(map, "components/button.tsx"), "Components");
    assert.equal(roleOf(map, "hooks/use-thing.ts"), "Hooks");
    assert.equal(roleOf(map, "proxy.ts"), "Middleware");
    assert.equal(roleOf(map, "next.config.ts"), "Config files");
    assert.equal(roleOf(map, "tests/a.test.ts"), "Tests");

    const summary = map.routes.map((route) => `${route.method} ${route.pattern} ${route.sourceFile}:${route.line}`);

    assert.deepEqual(summary, [
      "GET /api/chat app/api/chat/route.ts:2",
      "POST /api/chat app/api/chat/route.ts:1",
      "DELETE /threads/[id] app/(shell)/threads/[id]/route.ts:1",
    ].sort((a, b) => a.split(" ")[1].localeCompare(b.split(" ")[1]) || a.split(" ")[0].localeCompare(b.split(" ")[0])));
  });
});

describe("NestJS adapter", () => {
  const controller = `
import { Controller, Get, Post, Version } from "@nestjs/common";
const dynamicPath = "x";

@Controller("cats")
export class CatsController {
  @Get()
  list() {}

  @Get(":id")
  one() {}

  @Post("new")
  create() {}

  @Get(dynamicPath)
  computed() {}

  @Version("2")
  @Get("versioned")
  versioned() {}
}

@Controller({ path: "dogs" })
export class DogsController {
  @Get()
  list() {}
}

@Controller(["a", "b"])
export class ManyController {
  @Get()
  list() {}
}
`;

  it("assembles full patterns from the controller and method decorators and skips anything inferred", async () => {
    const root = await repo({
      "package.json": JSON.stringify({ dependencies: { "@nestjs/core": "10", express: "4" } }),
      "src/cats/cats.controller.ts": controller,
      "src/cats/cats.service.ts": "export class CatsService {}",
      "src/cats/cats.module.ts": "export class CatsModule {}",
      "src/cats/cat.entity.ts": "export class Cat {}",
      "src/main.ts": "async function bootstrap() {}",
    });

    const map = await parseRepository({ rootPath: root });

    assert.equal(map.framework, "nestjs");
    assert.equal(roleOf(map, "src/cats/cats.controller.ts"), "Controllers");
    assert.equal(roleOf(map, "src/cats/cats.service.ts"), "Services");
    assert.equal(roleOf(map, "src/cats/cats.module.ts"), "Modules");
    assert.equal(roleOf(map, "src/cats/cat.entity.ts"), "Entities");
    assert.equal(roleOf(map, "src/main.ts"), "Bootstrap");

    assert.deepEqual(
      map.routes.map((route) => `${route.method} ${route.pattern}`),
      ["GET /cats", "GET /cats/:id", "POST /cats/new", "GET /dogs"],
    );
  });

  it("applies a literal global prefix and drops every route when it cannot be read", async () => {
    const files = {
      "package.json": JSON.stringify({ dependencies: { "@nestjs/common": "10" } }),
      "src/cats.controller.ts": controller,
    };

    const prefixed = await parseRepository({
      rootPath: await repo({ ...files, "src/main.ts": "app.setGlobalPrefix('api');" }),
    });

    assert.ok(prefixed.routes.length > 0);
    assert.ok(prefixed.routes.every((route) => route.pattern.startsWith("/api/")));

    const unreadable = await parseRepository({
      rootPath: await repo({ ...files, "src/main.ts": "app.setGlobalPrefix(prefix);" }),
    });

    assert.deepEqual(unreadable.routes, []);

    const versioned = await parseRepository({
      rootPath: await repo({ ...files, "src/main.ts": "app.enableVersioning({ type: 0 });" }),
    });

    assert.deepEqual(versioned.routes, []);
  });
});

describe("React, Express and generic", () => {
  it("detects React and uses its roles with an empty route table", async () => {
    const map = await parseRepository({
      rootPath: await repo({
        "package.json": JSON.stringify({ dependencies: { react: "19" } }),
        "src/components/Card.tsx": "export const Card = () => null",
        "src/hooks/useThing.ts": "export const useThing = () => 1",
        "src/context/ThemeContext.tsx": "export const T = 1",
      }),
    });

    assert.equal(map.framework, "react");
    assert.equal(roleOf(map, "src/components/Card.tsx"), "Components");
    assert.equal(roleOf(map, "src/hooks/useThing.ts"), "Hooks");
    assert.equal(roleOf(map, "src/context/ThemeContext.tsx"), "Contexts");
    assert.deepEqual(map.routes, []);
  });

  it("detects Express, accepts singular and plural folders, and extracts no routes", async () => {
    const map = await parseRepository({
      rootPath: await repo({
        "package.json": JSON.stringify({ dependencies: { express: "4" } }),
        "src/app.js": "const express = require('express');\nconst routes = require('./routes/v1');\nmodule.exports = express();",
        "src/routes/v1/index.js": "const c = require('../../controller/user');\nmodule.exports = {};",
        "src/controller/user.js": "exports.get = () => 1;",
        "src/middlewares/auth.js": "module.exports = () => 1;",
        "src/model/user.js": "module.exports = {};",
        "src/validations/user.js": "module.exports = {};",
        "src/config/config.js": "module.exports = {};",
        "src/utils/ApiError.js": "module.exports = class {};",
      }),
    });

    assert.equal(map.framework, "express");
    assert.equal(roleOf(map, "src/app.js"), "App setup");
    assert.equal(roleOf(map, "src/routes/v1/index.js"), "Routes");
    assert.equal(roleOf(map, "src/controller/user.js"), "Controllers");
    assert.equal(roleOf(map, "src/middlewares/auth.js"), "Middleware");
    assert.equal(roleOf(map, "src/model/user.js"), "Models");
    assert.equal(roleOf(map, "src/validations/user.js"), "Validations");
    assert.equal(roleOf(map, "src/utils/ApiError.js"), "Utilities");
    assert.deepEqual(map.routes, []);

    // require() draws real edges, and coverage has a real denominator.
    assert.ok(map.edges.some((edge) => edge.sourceFile === "src/app.js" && edge.targetFile === "src/routes/v1/index.js"));
    assert.ok(map.edges.some((edge) => edge.sourceFile === "src/routes/v1/index.js" && edge.targetFile === "src/controller/user.js"));
    assert.ok(map.coverage.total >= 3);
    assert.equal(map.statistics.requireImports, map.coverage.total);
  });

  it("still renders a repository that matches no adapter, with generic roles", async () => {
    const map = await parseRepository({
      rootPath: await repo({
        "src/a.ts": "import './b';",
        "src/b.ts": "export {}",
        "README.md": "# hi",
      }),
    });

    assert.equal(map.framework, "generic");
    assert.equal(roleOf(map, "src/a.ts"), "Source");
    assert.equal(roleOf(map, "README.md"), "Documentation");
    assert.deepEqual(map.routes, []);
  });

  it("runs detection in a fixed order: Next.js before React, NestJS before Express", async () => {
    const next = await parseRepository({
      rootPath: await repo({ "package.json": JSON.stringify({ dependencies: { next: "1", react: "1" } }), "a.ts": "export {}" }),
    });
    const nest = await parseRepository({
      rootPath: await repo({ "package.json": JSON.stringify({ dependencies: { "@nestjs/core": "1", express: "1" } }), "a.ts": "export {}" }),
    });

    assert.equal(next.framework, "nextjs");
    assert.equal(nest.framework, "nestjs");
  });
});

describe("require() extraction", () => {
  it("collects literal require calls and reports mixed files without duplicates", () => {
    const result = extractImports(
      "a.js",
      `import x from "./x";\nconst y = require("./y");\nconst z = require(name);\nconst w = require("./y");\nexports.foo = 1;\nmodule.exports.bar = 2;\nmodule.exports = { baz, qux: 1 };`,
    );

    assert.deepEqual(
      result.imports.map((entry) => `${entry.kind}:${entry.specifier}`),
      ["static:./x", "require:./y", "require:./y"],
    );

    assert.equal(new Set(result.imports.map((entry) => entry.id)).size, result.imports.length);
    assert.deepEqual(result.commonJsExports, ["bar", "baz", "foo", "qux"]);
  });
});

describe("taxonomy", () => {
  it("is plain data that a browser can import", async () => {
    const { readFile } = await import("node:fs/promises");
const source = await readFile(new URL("../taxonomy/categories.ts", import.meta.url), "utf8");
    assert.equal(/^\s*import\s/m.test(source), false);
    assert.deepEqual(taxonomyFor("nextjs").categories.slice(0, 3), ["Page routes", "API endpoints", "Server actions"]);
    assert.deepEqual(taxonomyFor("nestjs").categories.filter((name) => ["Controllers", "Services", "Modules", "Entities"].includes(name)), ["Controllers", "Services", "Modules", "Entities"]);
    assert.equal(taxonomyFor("nope").id, "generic");
    assert.ok(Object.keys(TAXONOMIES).length >= 5);
  });
});