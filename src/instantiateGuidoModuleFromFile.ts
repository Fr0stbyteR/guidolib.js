import type { GuidoModuleFactory } from "./types";

/**
 * Load libGUIDOEngine files, than instantiate libGUIDOEngine
 * @param jsFile path to `libGuido-wasm.js`
 * @param wasmFile path to `libGuido-wasm.wasm`
 */
const instantiateGuidoModuleFromFile = async (jsFile: string, wasmFile = jsFile.replace(/c?js$/, "wasm")) => {
    let GuidoModule: GuidoModuleFactory;
    let wasmBinary: Uint8Array | ArrayBuffer;
    const jsCodeHead = /var (.+) = \(/;
    if (typeof globalThis.fetch === "function") {
        let jsCode = await (await fetch(jsFile)).text();
        jsCode = `${jsCode}
export default ${jsCode.match(jsCodeHead)?.[1]};
`;
        const jsFileMod = URL.createObjectURL(new Blob([jsCode], { type: "text/javascript" }));
        GuidoModule = (await import(/* webpackIgnore: true */jsFileMod)).default;
        wasmBinary = new Uint8Array(await (await fetch(wasmFile)).arrayBuffer());
    } else {
        const { promises: fs } = await import("fs");
        const { pathToFileURL } = await import("url");
        let jsCode = (await fs.readFile(jsFile, { encoding: "utf-8" }));
        jsCode = `
import process from "process";
import * as path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);
const require = createRequire(import.meta.url);

${jsCode}

export default ${jsCode.match(jsCodeHead)?.[1]};
`;
        const jsFileMod = jsFile.replace(/c?js$/, "mjs");
        await fs.writeFile(jsFileMod, jsCode);
        GuidoModule = (await import(/* webpackIgnore: true */pathToFileURL(jsFileMod).href)).default;
        await fs.unlink(jsFileMod);
        wasmBinary = (await fs.readFile(wasmFile)).buffer;
    }
    const guidoModule = await GuidoModule({ wasmBinary });
    return guidoModule;
};

export default instantiateGuidoModuleFromFile;
