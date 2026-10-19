// Starts the Express server and the Vite client together for local development.
// Each folder gets its own package.json in Session 2 and Session 3.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const isWindows = process.platform === "win32";
const npm = isWindows
  ? path.join(path.dirname(process.execPath), "npm.cmd")
  : "npm";

const targets = [
  { name: "server", dir: path.join(root, "server") },
  { name: "client", dir: path.join(root, "client") },
];

const missing = targets.filter((t) => !existsSync(path.join(t.dir, "package.json")));
if (missing.length > 0) {
  console.error(
    "Missing package.json in: " +
      missing.map((t) => t.name).join(", ") +
      ". Run the matching session first."
  );
  process.exit(1);
}

const children = [];
let shuttingDown = false;

function stopAll(code) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (!child.killed) child.kill("SIGTERM");
  }
  setTimeout(() => process.exit(code), 300);
}

for (const target of targets) {
  const child = spawn(npm, ["run", "dev"], {
    cwd: target.dir,
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });
  const prefix = "[" + target.name + "] ";
  const forward = (stream, out) => {
    let buffer = "";
    stream.on("data", (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop();
      for (const line of lines) out.write(prefix + line + "\n");
    });
  };
  forward(child.stdout, process.stdout);
  forward(child.stderr, process.stderr);
  child.on("exit", (code) => {
    if (!shuttingDown) {
      console.error(prefix + "exited with code " + code);
      stopAll(code === 0 ? 1 : code);
    }
  });
  children.push(child);
}

process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));
