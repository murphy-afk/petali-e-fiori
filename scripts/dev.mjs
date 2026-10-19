// Starts the Express server and the Vite client together for local development.
// A folder without its own package.json is skipped with a warning, so the API
// alone can already run before the client lands in Session 3.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const isWindows = process.platform === "win32";
const npm = isWindows
  ? path.join(path.dirname(process.execPath), "npm.cmd")
  : "npm";
// Recent Node versions refuse to spawn .cmd files directly (EINVAL), and the
// default Windows install path contains a space, so on Windows the npm cli
// script is run with our own node binary instead of going through npm.cmd.
const npmCli = path.join(
  path.dirname(process.execPath),
  "node_modules",
  "npm",
  "bin",
  "npm-cli.js"
);

function npmRun() {
  if (isWindows) {
    if (existsSync(npmCli)) return { command: process.execPath, args: [npmCli, "run", "dev"] };
    return { command: '"' + npm + '"', args: ["run", "dev"], shell: true };
  }
  return { command: npm, args: ["run", "dev"] };
}

const targets = [
  { name: "server", dir: path.join(root, "server") },
  { name: "client", dir: path.join(root, "client") },
];

const runnable = targets.filter((target) =>
  existsSync(path.join(target.dir, "package.json"))
);
for (const target of targets) {
  if (!runnable.includes(target)) {
    console.warn(
      "[dev] skipping " + target.name + ": no package.json yet, run the matching session first."
    );
  }
}
if (runnable.length === 0) {
  console.error("No package.json found in server or client, nothing to start.");
  process.exit(1);
}

const children = [];
let shuttingDown = false;

function stopAll(code) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) killTree(child);
  setTimeout(() => process.exit(code), 300);
}

// On Windows a plain SIGTERM only reaches the npm wrapper and would leave the
// real dev server holding its port, so the whole child tree is removed.
function killTree(child) {
  if (!child.pid || child.exitCode !== null) return;
  if (isWindows) {
    spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    child.kill("SIGTERM");
  }
}

for (const target of runnable) {
  const { command, args, shell } = npmRun();
  const child = spawn(command, args, {
    cwd: target.dir,
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
    ...(shell ? { shell: true } : {}),
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
