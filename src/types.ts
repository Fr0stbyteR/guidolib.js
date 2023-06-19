import { GuidoElementSelector, GuidoElementType, GuidoErrCode, PianoRollType } from "./enums";

export interface EmbindClassHandlePointerInfo {
    count: { value: number };
    deleteScheduled: boolean;
    preservePointerOnDelete: boolean;
    ptr: number;
    ptrType: any;
}

export interface EmbindClassHandle {
    readonly $$: EmbindClassHandlePointerInfo;
    clone(): this;
    delete(): void;
    deleteLater(): void;
    isAliasOf(that: this): boolean;
    isDeleted(): boolean;
}

export interface ARHandler extends EmbindClassHandle {}
export declare const ARHandler: {
    new (): ARHandler;
}
export interface GRHandler extends EmbindClassHandle {}
export declare const GRHandler: {
    new (): GRHandler;
}
export interface GuidoParser extends EmbindClassHandle {}
export declare const GuidoParser: {
    new (): GuidoParser;
}
export interface GuidoStream extends EmbindClassHandle {}
export declare const GuidoStream: {
    new (): GuidoStream;
}
export interface VGDevice extends EmbindClassHandle {}
export declare const VGDevice: {
    new (): VGDevice;
}

type EnumToObject<T extends Record<string, any>> = {
    [key in keyof Omit<T, number>]: { value: T[key]; };
} & {
    values: { [key: number]: { value: number } }
};

export interface BindingError extends Error {}
export declare const BindingError: {
    new (...args: ConstructorParameters<typeof Error>): BindingError;
}
export interface InternalError extends Error {}
export declare const InternalError: {
    new (...args: ConstructorParameters<typeof Error>): InternalError;
}
export interface UnboundTypeError extends Error {}
export declare const UnboundTypeError: {
    new (...args: ConstructorParameters<typeof Error>): UnboundTypeError;
}

export interface GuidoInitDesc {
    graphicDevice: VGDevice;
    reserved: void;
    musicFont: string;
    textFont: string;
}

export interface GuidoDate {
    num: number;
    denom: number;
}

export interface GuidoPageFormat {
    width: number;
    height: number;
    marginleft: number;
    margintop: number;
    marginright: number;
    marginbottom: number;
}

export interface GuidoLayoutSettings {
    systemsDistance: number;
    systemsDistribution: number;
    systemsDistribLimit: number;
    force: number;
    spring: number;
    neighborhoodSpacing: number;
    optimalPageFill: number;
    resizePage2Music: number;
    proportionalRenderingForceMultiplicator: number;
    checkLyricsCollisions: number;
}

export interface GuidoOnDrawDesc {
    handle: GRHandler;
    hdc: VGDevice;
    page: number;
    updateRegion: GPaintStruct;
    scrollx: number;
    scrolly: number;
    reserved: number;
    sizex: number;
    sizey: number;
    isprint: number;
}

export interface GuidoVersion {
    major: number;
    minor: number;
    sub: number;
    str: string;
}

export interface ParserError {
    line: number;
    col: number;
    msg: string;
}

export interface GPaintStruct {
    erase: boolean;
    left: number;
    top: number;
    right: number;
    bottom: number;
}

export interface GuidoEngineAdapter {
    init(desc?: GuidoInitDesc): GuidoErrCode;
    shutdown(): void;

    ar2gr(ar: ARHandler): GRHandler;
    ar2grSettings(ar: ARHandler, settings: GuidoLayoutSettings): GRHandler;
    updateGR(gr: GRHandler): GuidoErrCode;
    updateGRSettings(gr: GRHandler, settings: GuidoLayoutSettings): GuidoErrCode;
    showElement(gr: GRHandler, elt: number, status: boolean): GuidoErrCode;

    freeAR(ar: ARHandler): void;
    freeGR(gr: GRHandler): void;

    getParsingTime(ar: ARHandler): number;
    getAR2GRTime(gr: GRHandler): number;
    getOnDrawTime(gr: GRHandler): number;

    getErrorString(errCode: GuidoErrCode): string;
    getDefaultLayoutSettings(): GuidoLayoutSettings;

    countVoices(inHandleAR: ARHandler): number;

    getPageCount(inHandleGR: GRHandler): number;
    getSystemCount(inHandleGR: GRHandler, page: number): number;

    duration(inHandleGR: GRHandler): GuidoDate;

    findEventPage(inHandleGR: GRHandler, date: GuidoDate): number;
    findPageAt(inHandleGR: GRHandler, date: GuidoDate): number;

    getPageDate(inHandleGR: GRHandler, pageNum: number): GuidoDate;

    onDraw(desc: GuidoOnDrawDesc): GuidoErrCode;

    gr2SVG(handle: GRHandler, page: number, embedFont: boolean, mappingMode: number): string;
    gr2SVGColored(gr: GRHandler, page: number, r: number, g: number, b: number, embedFont: boolean): string

    abstractExport(handle: GRHandler, page: number): string;
    binaryExport(handle: GRHandler, page: number): string;
    javascriptExport(handle: GRHandler, page: number): GuidoErrCode;

    setDrawBoundingBoxes(bbMap: number): void;
    getDrawBoundingBoxes(): number;

    getPageFormat(gr: GRHandler, pageNum: number): GuidoPageFormat;
    setDefaultPageFormat(format: GuidoPageFormat): void;
    getDefaultPageFormat(): GuidoPageFormat;

    unit2CM(val: number): number;
    cm2Unit(val: number): number;
    unit2Inches(val: number): number;
    inches2Unit(val: number): number;

    resizePageToMusic(inHandleGR: GRHandler): GuidoErrCode;

    getVersion(): GuidoVersion;
    getVersionStr(): string;
    checkVersionNums(major: number, minor: number, sub: number): GuidoErrCode;

    getLineSpace(): number;

    markVoice(inHandleAR: ARHandler, voicenum: number,
        date: GuidoDate, duration: GuidoDate,
        red: number, green: number, blue: number): GuidoErrCode;

    setSymbolPath(inHandleAR: ARHandler, inPaths: Array<string>): GuidoErrCode;
    getSymbolPath(inHandleAR: ARHandler): Array<string>;

    getParsingTime(ar: ARHandler): number;
    getAR2GRTime(gr: GRHandler): number;
    getOnDrawTime(gr: GRHandler): number;

    openParser(): GuidoParser;
    closeParser(p: GuidoParser): GuidoErrCode;

    file2AR(parser: GuidoParser, file: string): ARHandler;
    string2AR(parser: GuidoParser, gmnCode: string): ARHandler;

    getStream(gStream: GuidoStream): string;
    stream2AR(p: GuidoParser, stream: GuidoStream): ARHandler;

    parserGetErrorCode(p: GuidoParser): ParserError;

    openStream(): GuidoStream;
    closeStream(s: GuidoStream): GuidoErrCode;
    writeStream(s: GuidoStream, str: string): GuidoErrCode;
    resetStream(s: GuidoStream): GuidoErrCode;
}
export declare const GuidoEngineAdapter: {
    new (): GuidoEngineAdapter;
}

// GUIDOMap

export interface TimeSegment {
    start: string;
    end: string;
}

export interface Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

export interface Time2GraphicElt {
    graph: Rect;
    time: TimeSegment;
}
export type Time2GraphicMap = Array<Time2GraphicElt>;

export interface MapCollector {
    Graph2TimeMap(box: Rect, dates: TimeSegment, infos: GuidoElementInfos): void;
}

export interface RectInfos {
    ftime: TimeSegment;
    fInfos: GuidoElementInfos;
    time(): TimeSegment;
    infos(): GuidoElementInfos;
}

export interface TimeMapCollector {
    Time2TimeMap(from: TimeSegment, to: TimeSegment): void;
}

export interface GuidoElementInfos {
    type: GuidoElementType;
    staffNum: number;
    voiceNum: number;
    midiPitch: number;
}

export interface GuidoScoreMap extends EmbindClassHandle {
    getPageMap(gr: GRHandler, pagenum: number, w: number, h: number): string;
    getStaffMap(gr: GRHandler, pagenum: number, w: number, h: number, staff: number): string;
    getVoiceMap(gr: GRHandler, pagenum: number, w: number, h: number, voice: number): string;
    getSystemMap(gr: GRHandler, pagenum: number, w: number, h: number): string;
    getTime(date: GuidoDate, map: string): string;
    getPoint(x: number, y: number, map: string): string;
    getTimeMap(ar: ARHandler): string;
    getPianoRollMap(pr: PianoRoll, width: number, height: number): string;
}
export declare const GuidoScoreMap: {
    new (): GuidoScoreMap;
}

export interface TimeSegment extends EmbindClassHandle {
    empty(): boolean;
    intersect(ts: TimeSegment): boolean;
    include(date: GuidoDate): boolean;
    include(ts: TimeSegment): boolean;
}

// GUIDOFactory
export interface ARFactoryHandler extends EmbindClassHandle {}

export interface GuidoFactoryAdapter {
    openMusic(): GuidoErrCode;
    closeMusic(): ARHandler;

    openVoice(): GuidoErrCode;
    closeVoice(): GuidoErrCode;

    openChord(): GuidoErrCode;
    closeChord(): GuidoErrCode;

    insertCommata(): GuidoErrCode;

    openEvent(inEventName: string): GuidoErrCode;
    closeEvent(): GuidoErrCode;

    addSharp(): GuidoErrCode;
    addFlat(): GuidoErrCode;

    setEventDots(dots: number): GuidoErrCode;
    setEventAccidentals(accident: number): GuidoErrCode;

    setOctave(octave: number): GuidoErrCode;
    setDuration(numerator: number, denominator: number): GuidoErrCode;

    openTag(name: string, tagID: number): GuidoErrCode;
    openRangeTag(name: string, tagID: number): GuidoErrCode;
    endTag(): GuidoErrCode;
    closeTag(): GuidoErrCode;
    addTagParameterString(val: string): GuidoErrCode;
    addTagParameterInt(val: number): GuidoErrCode;
    addTagParameterFloat(val: number): GuidoErrCode;

    setParameterName(name: string): GuidoErrCode;
    setParameterUnit(unit: string): GuidoErrCode;
}
export declare const GuidoFactoryAdapter: {
    new (): GuidoFactoryAdapter;
}

// GUIDOPianoRoll

export interface LimitParams {
    startDate: GuidoDate;
    endDate: GuidoDate;
    lowPitch: number;
    highPitch: number;
}

export interface PianoRoll extends EmbindClassHandle {}
export declare const PianoRoll: {
    new (): PianoRoll;
};

export interface GuidoPianoRollAdapter extends EmbindClassHandle {
    ar2PianoRoll(type: PianoRollType, arh: ARHandler): PianoRoll;
    //midi2PianoRoll  (type: PianoRollType, midiFileName: string): PianoRoll;

    destroyPianoRoll(pr: PianoRoll): GuidoErrCode;

    setLimits(pr: PianoRoll, limitParams: LimitParams): GuidoErrCode;
    enableKeyboard(pr: PianoRoll, enabled: boolean): GuidoErrCode;
    getKeyboardWidth(pr: PianoRoll, height: number): number;

    enableAutoVoicesColoration(pr: PianoRoll, enabled: boolean): GuidoErrCode;
    setRGBColorToVoice(pr: PianoRoll, voiceNum: number, r: number, g: number, b: number, a: number): GuidoErrCode;
    setColorToVoice(pr: PianoRoll, voiceNum: number, color: string): GuidoErrCode;
    removeColorToVoice(pr: PianoRoll, voiceNum: number): GuidoErrCode;
    enableMeasureBars(pr: PianoRoll, enabled: boolean): GuidoErrCode;

    setPitchLinesDisplayMode(pr: PianoRoll, mode: number): GuidoErrCode;
    getMap(pr: PianoRoll, width: number, height: number): string;

    onDraw(pr: PianoRoll, width: number, height: number, dev: VGDevice): GuidoErrCode;
    svgExport(pr: PianoRoll, width: number, height: number): string;
    javascriptExport(pr: PianoRoll, width: number, height: number): GuidoErrCode;
}
export declare const GuidoPianoRollAdapter: {
    new (): GuidoPianoRollAdapter;
};

export interface ReducedProportional extends EmbindClassHandle {}
export declare const ReducedProportional: {
    new (): ReducedProportional;
};

export interface GuidoReducedProportionalAdapter extends EmbindClassHandle {
    ar2RProportional(arh: ARHandler): ReducedProportional;
    destroyRProportional(rp: ReducedProportional): GuidoErrCode;

    drawDurationLines(rp: ReducedProportional, status: boolean): GuidoErrCode;
    enableAutoVoicesColoration(rp: ReducedProportional, enabled: boolean): GuidoErrCode;
    setRGBColorToVoice(rp: ReducedProportional, voiceNum: number, r: number, g: number, b: number, a: number): GuidoErrCode;
    setHtmlColorToVoice(rp: ReducedProportional, voiceNum: number, color: string): GuidoErrCode;
    removeColorToVoice(rp: ReducedProportional, voiceNum: number): GuidoErrCode;
    enableMeasureBars(rp: ReducedProportional, enabled: boolean): GuidoErrCode;
    setLimits(rp: ReducedProportional, start: GuidoDate, end: GuidoDate, lowpitch: number, highpitch: number): GuidoErrCode;

    svgExport(rp: ReducedProportional, width: number, height: number): string;
    javascriptExport(rp: ReducedProportional, width: number, height: number): GuidoErrCode;
}
export declare const GuidoReducedProportionalAdapter: {
    new (): GuidoReducedProportionalAdapter;
}

export type GuidoModuleFactory = EmscriptenModuleFactory<GuidoModule>;

export interface GuidoModule extends EmscriptenModule {
    BindingError: typeof BindingError;
    GUIDOFactoryAdapter: typeof GuidoFactoryAdapter;
    GUIDOPianoRollAdapter: typeof GuidoPianoRollAdapter;
    GUIDOReducedProportionalAdapter: typeof GuidoReducedProportionalAdapter;
    GUIDOScoreMap: typeof GuidoScoreMap;
    GuidoElementSelector: EnumToObject<typeof GuidoElementSelector>;
    GuidoEngineAdapter: typeof GuidoEngineAdapter;
    GuidoErrCode: EnumToObject<typeof GuidoErrCode>;
    GuidoParser: typeof GuidoParser;
    GuidoStream: typeof GuidoStream;
    InternalError: typeof InternalError;
    NodeAR: typeof ARHandler;
    NodeGR: typeof GRHandler;
    PianoRoll: typeof PianoRoll;
    PianoRollType: EnumToObject<typeof PianoRollType>;
    RProportional: typeof ReducedProportional;
    UnboundTypeError: typeof UnboundTypeError;
    ar2MIDIFile(): number;
    flushPendingDeletes(): void;
    getInheritedInstanceCount(): number;
    getLiveInheritedInstances(): any[];
}
