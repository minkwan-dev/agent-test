/**
 * 반드시 `main.ts`에서 다른 모듈보다 먼저 import 하세요.
 * `AppModule` 로드 시점에 `process.env`에 JWT 등이 있어야 합니다.
 */
import { config as loadEnv } from "dotenv";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const cwd = process.cwd();
/** 컴파일 후 `dist/` 기준 → 상위가 `apps/api` */
const distDir = __dirname;

const candidatePaths = [
  join(cwd, ".env"),
  join(cwd, "apps", "api", ".env"),
  join(distDir, "..", ".env"),
  join(distDir, "..", "..", "..", ".env"),
];

const loaded = new Set<string>();
for (const file of candidatePaths) {
  if (!existsSync(file)) continue;
  const key = resolve(file);
  if (loaded.has(key)) continue;
  loaded.add(key);
  loadEnv({ path: file, override: true });
}

const jwt = process.env.JWT_SECRET?.trim();
if (!jwt && process.env.NODE_ENV !== "production") {
  const lines = candidatePaths.map(
    (p) => `  ${resolve(p)}  ${existsSync(p) ? "exists" : "missing"}`,
  );
  console.warn(
    `[novitas-api] JWT_SECRET is not set. Copy apps/api/.env.example to apps/api/.env (or use repo root .env) and set JWT_SECRET.\nChecked:\n${lines.join("\n")}`,
  );
}
