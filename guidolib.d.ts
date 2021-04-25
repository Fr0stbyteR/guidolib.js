/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./libGUIDOEngine.d.ts"/>
/// <reference path="./guidoengine.ts"/>
/// <reference types="@types/emscripten"/>
/// <reference path="./embind.d.ts"/>

interface GuidoModule extends EmscriptenModule {
    BindingError: new (...args: ConstructorParameters<typeof Error>) => BindingError;
    GUIDOFactoryAdapter: new () => GUIDOFactoryAdapter;
    GUIDOPianoRollAdapter: new () => GUIDOPianoRollAdapter;
    GUIDOReducedProportionalAdapter: new () => GUIDOReducedProportionalAdapter;
    GUIDOScoreMap: new () => GUIDOScoreMap;
    GuidoElementSelector: EnumToObject<typeof GuidoElementSelector>;
    GuidoEngineAdapter: new () => GuidoEngineAdapter;
    GuidoErrCode: EnumToObject<typeof GuidoErrCode>;
    GuidoParser: new () => GuidoParser;
    GuidoStream: new () => GuidoStream;
    InternalError: new (...args: ConstructorParameters<typeof Error>) => InternalError;
    NodeAR: new () => ARHandler;
    NodeGR: new () => GRHandler;
    PianoRoll: new () => PianoRoll;
    PianoRollType: EnumToObject<typeof PianoRollType>;
    RProportional: new () => ReducedProportional;
    UnboundTypeError: new (...args: ConstructorParameters<typeof Error>) => UnboundTypeError;
    ar2MIDIFile(): number;
    flushPendingDeletes(): void;
    getInheritedInstanceCount(): number;
    getLiveInheritedInstances(): any[];
}
declare const GuidoModule: {
    (options?: Partial<EmscriptenModule & { ENVIRONMENT: Emscripten.EnvironmentType }>): Promise<GuidoModule>;
    new (options?: Partial<EmscriptenModule & { ENVIRONMENT: Emscripten.EnvironmentType }>): Promise<GuidoModule>;
};

export = GuidoModule;
