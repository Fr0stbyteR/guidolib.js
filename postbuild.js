//@ts-check
import { cpSync, rmSync } from "./fileutils.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);

const guidoWasmDistPath = path.join(__dirname, "./dist/cjs");
const guidoWasmDistEsmPath = path.join(__dirname, "./dist/esm");
const guidoWasmDistBundlePath = path.join(__dirname, "./dist/cjs-bundle");
const guidoWasmDistEsmBundlePath = path.join(__dirname, "./dist/esm-bundle");

fs.copyFileSync(path.join(guidoWasmDistPath, "index.d.ts"), path.join(guidoWasmDistEsmPath, "index.d.ts"));
fs.copyFileSync(path.join(guidoWasmDistBundlePath, "index.d.ts"), path.join(guidoWasmDistEsmBundlePath, "index.d.ts"));

console.log("GuidoWasm files copied.")
