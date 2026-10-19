// Loads .env (or .env.example as a fallback), then applies db/schema.sql,
// db/seed.sql and db/seed_gallery.sql through the mysql client binary.
// Same result as running the files by hand in MySQL Workbench.
import { spawn } from "node:child_process";
import {
  createReadStream,
  existsSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseEnvFile(file) {
  const values = {};
  const raw = readFileSync(file, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

function readEnv() {
  const file = path.join(root, ".env");
  if (existsSync(file)) return parseEnvFile(file);
  const example = path.join(root, ".env.example");
  if (existsSync(example)) {
    console.log("No .env found, using defaults from .env.example");
    return parseEnvFile(example);
  }
  return {};
}

function findMysql(explicit) {
  if (explicit) return explicit;
  const candidates = [];
  if (process.platform === "win32") {
    const bases = [process.env["ProgramFiles"], process.env["ProgramFiles(x86)"]].filter(Boolean);
    for (const base of bases) {
      for (const version of ["8.4", "8.0", "8.3", "8.2", "8.1", "5.7"]) {
        candidates.push(path.join(base, "MySQL", "MySQL Server " + version, "bin", "mysql.exe"));
      }
    }
    candidates.push("C:\\xampp\\mysql\\bin\\mysql.exe");
    candidates.push("C:\\wamp64\\bin\\mysql\\bin\\mysql.exe");
  } else {
    candidates.push("/usr/bin/mysql", "/usr/local/bin/mysql", "/opt/homebrew/bin/mysql");
  }
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  return "mysql";
}

function run(mysql, args, inputFile) {
  return new Promise((resolve, reject) => {
    const child = spawn(mysql, args, { stdio: ["pipe", "inherit", "inherit"] });
    if (inputFile) {
      const stream = createReadStream(inputFile);
      stream.pipe(child.stdin);
      stream.on("error", reject);
    } else {
      child.stdin.end();
    }
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(path.basename(inputFile || "mysql") + " exited with code " + code));
    });
  });
}

const env = { ...readEnv(), ...process.env };
const dbName = env.DB_NAME || "petali_e_fiori";
const mysql = findMysql(env.MYSQL_BIN);

const tempDir = mkdtempSync(path.join(tmpdir(), "petali-seed-"));
const defaultsFile = path.join(tempDir, "my.cnf");
writeFileSync(
  defaultsFile,
  [
    "[client]",
    "user=" + (env.DB_USER || "root"),
    "password=" + (env.DB_PASSWORD || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"'),
    "host=" + (env.DB_HOST || "127.0.0.1"),
    "port=" + (env.DB_PORT || "3306"),
    "default-character-set=utf8mb4",
    "",
  ].join("\n")
);

const files = ["db/schema.sql", "db/seed.sql", "db/seed_gallery.sql"];

try {
  console.log("Using mysql client: " + mysql);
  for (const relative of files) {
    const file = path.join(root, relative);
    if (!existsSync(file)) {
      console.log("Skipping missing file: " + relative);
      continue;
    }
    console.log("Applying " + relative);
    await run(mysql, ["--defaults-extra-file=" + defaultsFile, "--default-character-set=utf8mb4"], file);
  }
  console.log("Database " + dbName + " is ready.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}
