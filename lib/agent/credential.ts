import { createHmac, timingSafeEqual } from "node:crypto";

export const CREDENTIAL_TTL_SECONDS = 600;

export type Credential = { analysisId: string; organizationId: string; expiresAt: number };

function secret(): string {
  const value = process.env.AGENT_TOOL_SECRET?.trim();
  if (!value || value.length < 32) {
    throw new Error("AGENT_TOOL_SECRET must be set to a random string of at least 32 characters.");
  }
  return value;
}

const encode = (value: string | Buffer) => Buffer.from(value).toString("base64url");
const sign = (body: string) => createHmac("sha256", secret()).update(body).digest();

export function mintCredential(analysisId: string, organizationId: string, now: number = Date.now()): string {
  const body = encode(JSON.stringify({ a: analysisId, o: organizationId, e: Math.floor(now / 1000) + CREDENTIAL_TTL_SECONDS }));
  return `v1.${body}.${encode(sign(`v1.${body}`))}`;
}

export function verifyCredential(token: string | null | undefined, now: number = Date.now()): Credential | null {
  const [version, body, signature] = (token ?? "").split(".");
  if (version !== "v1" || !body || !signature) return null;

  const expected = sign(`v1.${body}`);
  const given = Buffer.from(signature, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;

  try {
    const claims = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as { a?: unknown; o?: unknown; e?: unknown };
    if (typeof claims.a !== "string" || typeof claims.o !== "string" || typeof claims.e !== "number") return null;
    if (claims.e * 1000 < now) return null;
    return { analysisId: claims.a, organizationId: claims.o, expiresAt: claims.e * 1000 };
  } catch {
    return null;
  }
}