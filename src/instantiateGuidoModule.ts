import factoryFn from "../libguido-wasm/libGUIDOEngine.cjs";
import wasmBinary from "../libguido-wasm/libGUIDOEngine.wasm";

export const GuidoModuleFactoryFn = factoryFn;
export const GuidoModuleFactoryWasm = wasmBinary;

/**
 * Instantiate `GuidoModule` using bundled binaries. Module constructor and files can be overriden.
 */
const instantiateGuidoModule = async (GuidoModuleFactoryIn = factoryFn, wasmBinaryIn = wasmBinary) => {
    const g = globalThis as any;
    if (g.AudioWorkletGlobalScope) {
        g.importScripts = () => {};
        g.self = { location: { href: "" } };
    }
    const guidoModule = await GuidoModuleFactoryIn({ wasmBinary: wasmBinaryIn });
    if (g.AudioWorkletGlobalScope) {
        delete g.importScripts;
        delete g.self;
    }
    return guidoModule;
};

export default instantiateGuidoModule;
