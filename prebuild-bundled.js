//@ts-check
import { cpSync } from "./fileutils.js"
import * as path from "path";
import { fileURLToPath } from "url";

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);

cpSync(path.join(__dirname, "./libguido-wasm/libGUIDOEngine.js"), path.join(__dirname, "./libguido-wasm/libGUIDOEngine.cjs"));
