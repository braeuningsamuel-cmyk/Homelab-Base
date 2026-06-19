import { resolve, normalize, relative } from "node:path";

const ALLOWED_BASES = ["/home", "/tmp", "/var/lib/docker"];

export function validatePath(userPath: string): string {
  const normalized = normalize(resolve(userPath));
  const allowed = ALLOWED_BASES.some((base) =>
    normalized.startsWith(base),
  );
  if (!allowed) {
    throw new Error(
      `Path ${userPath} is outside allowed directories`,
    );
  }
  if (normalized.includes("..")) {
    throw new Error("Path traversal detected");
  }
  return normalized;
}
