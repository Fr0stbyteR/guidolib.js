// src/instantiateGuidoModuleFromFile.ts
var instantiateGuidoModuleFromFile = async (jsFile, wasmFile = jsFile.replace(/c?js$/, "wasm")) => {
  var _a, _b;
  let GuidoModule;
  let wasmBinary;
  const jsCodeHead = /var (.+) = \(/;
  if (typeof globalThis.fetch === "function") {
    let jsCode = await (await fetch(jsFile)).text();
    jsCode = `${jsCode}
export default ${(_a = jsCode.match(jsCodeHead)) == null ? void 0 : _a[1]};
`;
    const jsFileMod = URL.createObjectURL(new Blob([jsCode], { type: "text/javascript" }));
    GuidoModule = (await import(
      /* webpackIgnore: true */
      jsFileMod
    )).default;
    wasmBinary = new Uint8Array(await (await fetch(wasmFile)).arrayBuffer());
  } else {
    const { promises: fs } = await import("fs");
    const { pathToFileURL } = await import("url");
    let jsCode = await fs.readFile(jsFile, { encoding: "utf-8" });
    jsCode = `
import process from "process";
import * as path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);
const require = createRequire(import.meta.url);

${jsCode}

export default ${(_b = jsCode.match(jsCodeHead)) == null ? void 0 : _b[1]};
`;
    const jsFileMod = jsFile.replace(/c?js$/, "mjs");
    await fs.writeFile(jsFileMod, jsCode);
    GuidoModule = (await import(
      /* webpackIgnore: true */
      pathToFileURL(jsFileMod).href
    )).default;
    await fs.unlink(jsFileMod);
    wasmBinary = (await fs.readFile(wasmFile)).buffer;
  }
  const guidoModule = await GuidoModule({ wasmBinary });
  return guidoModule;
};
var instantiateGuidoModuleFromFile_default = instantiateGuidoModuleFromFile;

// src/GuidoEngine.ts
var GuidoEngine = class {
  constructor(module) {
    this.fEngine = new module.GuidoEngineAdapter();
    this.fScoreMap = new module.GUIDOScoreMap();
    this.fPianoRoll = new module.GUIDOPianoRollAdapter();
    this.fFactory = new module.GUIDOFactoryAdapter();
    this.fSPR = new module.GUIDOReducedProportionalAdapter();
    this.fEngine.init();
  }
  start() {
    this.fEngine.init();
  }
  shutdown() {
    this.fEngine.shutdown();
  }
  ar2gr(ar) {
    return this.fEngine.ar2gr(ar);
  }
  ar2grSettings(ar, settings) {
    return this.fEngine.ar2grSettings(ar, settings);
  }
  updateGR(gr) {
    return this.fEngine.updateGR(gr);
  }
  updateGRSettings(gr, settings) {
    return this.fEngine.updateGRSettings(gr, settings);
  }
  freeAR(ar) {
    this.fEngine.freeAR(ar);
  }
  freeGR(gr) {
    this.fEngine.freeGR(gr);
  }
  getDefaultLayoutSettings() {
    return this.fEngine.getDefaultLayoutSettings();
  }
  resizePageToMusic(gr) {
    return this.fEngine.resizePageToMusic(gr);
  }
  getErrorString(errCode) {
    return this.fEngine.getErrorString(errCode);
  }
  showElement(gr, elt, status) {
    return this.fEngine.showElement(gr, elt, status);
  }
  countVoices(ar) {
    return this.fEngine.countVoices(ar);
  }
  getPageCount(gr) {
    return this.fEngine.getPageCount(gr);
  }
  getSystemCount(gr, page) {
    return this.fEngine.getSystemCount(gr, page);
  }
  duration(gr) {
    return this.fEngine.duration(gr);
  }
  findEventPage(gr, date) {
    return this.fEngine.findEventPage(gr, date);
  }
  findPageAt(gr, date) {
    return this.fEngine.findPageAt(gr, date);
  }
  getPageDate(gr, pageNum) {
    return this.fEngine.getPageDate(gr, pageNum);
  }
  gr2SVG(gr, page, embedFont, mappingMode) {
    return this.fEngine.gr2SVG(gr, page, embedFont, mappingMode);
  }
  gr2SVGColored(gr, page, r, g, b, embedFont) {
    return this.fEngine.gr2SVGColored(gr, page, r, g, b, embedFont);
  }
  abstractExport(gr, page) {
    return this.fEngine.abstractExport(gr, page);
  }
  binaryExport(gr, page) {
    return this.fEngine.binaryExport(gr, page);
  }
  jsExport(gr, page) {
    return this.fEngine.javascriptExport(gr, page);
  }
  setDefaultPageFormat(format) {
    this.fEngine.setDefaultPageFormat(format);
  }
  getDefaultPageFormat() {
    return this.fEngine.getDefaultPageFormat();
  }
  setDrawBoundingBoxes(bmap) {
    this.fEngine.setDrawBoundingBoxes(bmap);
  }
  getDrawBoundingBoxes() {
    return this.fEngine.getDrawBoundingBoxes();
  }
  getPageFormat(gr, page) {
    return this.fEngine.getPageFormat(gr, page);
  }
  unit2CM(val) {
    return this.fEngine.unit2CM(val);
  }
  cm2Unit(val) {
    return this.fEngine.cm2Unit(val);
  }
  unit2Inches(val) {
    return this.fEngine.unit2Inches(val);
  }
  inches2Unit(val) {
    return this.fEngine.inches2Unit(val);
  }
  getLineSpace() {
    return this.fEngine.getLineSpace();
  }
  getVersion() {
    return this.fEngine.getVersion();
  }
  getFloatVersion() {
    let v = this.fEngine.getVersion();
    return parseFloat(v.major + "." + v.minor + v.sub);
  }
  getVersionStr() {
    return this.fEngine.getVersionStr();
  }
  checkVersionNums(major, minor, sub) {
    return this.fEngine.checkVersionNums(major, minor, sub);
  }
  markVoice(ar, voicenum, date, duration, r, g, b) {
    return this.fEngine.markVoice(ar, voicenum, date, duration, r, g, b);
  }
  openParser() {
    return this.fEngine.openParser();
  }
  closeParser(p) {
    return this.fEngine.closeParser(p);
  }
  file2AR(p, file) {
    return this.fEngine.file2AR(p, file);
  }
  string2AR(p, gmn) {
    return this.fEngine.string2AR(p, gmn);
  }
  parserGetErrorCode(p) {
    return this.fEngine.parserGetErrorCode(p);
  }
  openStream() {
    return this.fEngine.openStream();
  }
  closeStream(s) {
    return this.fEngine.closeStream(s);
  }
  getStream(s) {
    return this.fEngine.getStream(s);
  }
  stream2AR(p, stream) {
    return this.fEngine.stream2AR(p, stream);
  }
  writeStream(s, str) {
    return this.fEngine.writeStream(s, str);
  }
  resetStream(s) {
    return this.fEngine.resetStream(s);
  }
  getParsingTime(ar) {
    return this.fEngine.getParsingTime(ar);
  }
  getAR2GRTime(gr) {
    return this.fEngine.getAR2GRTime(gr);
  }
  getOnDrawTime(gr) {
    return this.fEngine.getOnDrawTime(gr);
  }
  getPageMap(gr, page, w, h) {
    return this.fScoreMap.getPageMap(gr, page, w, h);
  }
  getStaffMap(gr, page, w, h, staff) {
    return this.fScoreMap.getStaffMap(gr, page, w, h, staff);
  }
  getVoiceMap(gr, page, w, h, voice) {
    return this.fScoreMap.getVoiceMap(gr, page, w, h, voice);
  }
  getSystemMap(gr, page, w, h) {
    return this.fScoreMap.getSystemMap(gr, page, w, h);
  }
  getTime(date, map) {
    return this.fScoreMap.getTime(date, map);
  }
  getPoint(x, y, map) {
    return this.fScoreMap.getPoint(x, y, map);
  }
  getTimeMap(ar) {
    return this.fScoreMap.getTimeMap(ar);
  }
  getPianoRollMap(pr, width, height) {
    return this.fScoreMap.getPianoRollMap(pr, width, height);
  }
  pianoRoll() {
    return this.fPianoRoll;
  }
  ar2PianoRoll(type, ar) {
    return this.fPianoRoll.ar2PianoRoll(type, ar);
  }
  destroyPianoRoll(pr) {
    return this.fPianoRoll.destroyPianoRoll(pr);
  }
  prSetLimits(pr, limits) {
    return this.fPianoRoll.setLimits(pr, limits);
  }
  prEnableKeyboard(pr, status) {
    return this.fPianoRoll.enableKeyboard(pr, status);
  }
  prGetKeyboardWidth(pr, height) {
    return this.fPianoRoll.getKeyboardWidth(pr, height);
  }
  prEnableAutoVoicesColoration(pr, status) {
    return this.fPianoRoll.enableAutoVoicesColoration(pr, status);
  }
  prSetVoiceColor(pr, voice, r, g, b, a) {
    return this.fPianoRoll.setRGBColorToVoice(pr, voice, r, g, b, a);
  }
  prSetVoiceNamedColor(pr, voice, c) {
    return this.fPianoRoll.setColorToVoice(pr, voice, c);
  }
  prRemoveVoiceColor(pr, voice) {
    return this.fPianoRoll.removeColorToVoice(pr, voice);
  }
  prEnableMeasureBars(pr, status) {
    return this.fPianoRoll.enableMeasureBars(pr, status);
  }
  prSetPitchLinesDisplayMode(pr, mode) {
    return this.fPianoRoll.setPitchLinesDisplayMode(pr, mode);
  }
  proll2svg(pr, w, h) {
    return this.fPianoRoll.svgExport(pr, w, h);
  }
  prGetMap(pr, width, height) {
    return this.fPianoRoll.getMap(pr, width, height);
  }
  prSvgExport(pr, width, height) {
    return this.fPianoRoll.svgExport(pr, width, height);
  }
  prJsExport(pr, width, height) {
    return this.fPianoRoll.javascriptExport(pr, width, height);
  }
  reducedProp() {
    return this.fSPR;
  }
  openMusic() {
    return this.fFactory.openMusic();
  }
  closeMusic() {
    return this.fFactory.closeMusic();
  }
  openVoice() {
    return this.fFactory.openVoice();
  }
  closeVoice() {
    return this.fFactory.closeVoice();
  }
  openChord() {
    return this.fFactory.openChord();
  }
  closeChord() {
    return this.fFactory.closeChord();
  }
  insertCommata() {
    return this.fFactory.insertCommata();
  }
  openEvent(name) {
    return this.fFactory.openEvent(name);
  }
  closeEvent() {
    return this.fFactory.closeEvent();
  }
  addSharp() {
    return this.fFactory.addSharp();
  }
  addFlat() {
    return this.fFactory.addFlat();
  }
  setEventDots(dots) {
    return this.fFactory.setEventDots(dots);
  }
  setEventAccidentals(acc) {
    return this.fFactory.setEventAccidentals(acc);
  }
  setOctave(oct) {
    return this.fFactory.setOctave(oct);
  }
  setDuration(numerator, denominator) {
    return this.fFactory.setDuration(numerator, denominator);
  }
  openTag(name, tagID) {
    return this.fFactory.openTag(name, tagID);
  }
  openRangeTag(name, tagID) {
    return this.fFactory.openRangeTag(name, tagID);
  }
  endTag() {
    return this.fFactory.endTag();
  }
  closeTag() {
    return this.fFactory.closeTag();
  }
  addTagParameterString(val) {
    return this.fFactory.addTagParameterString(val);
  }
  addTagParameterInt(val) {
    return this.fFactory.addTagParameterInt(val);
  }
  addTagParameterFloat(val) {
    return this.fFactory.addTagParameterFloat(val);
  }
  setParameterName(name) {
    return this.fFactory.setParameterName(name);
  }
  setParameterUnit(unit) {
    return this.fFactory.setParameterUnit(unit);
  }
};
var GuidoEngine_default = GuidoEngine;
export {
  GuidoEngine_default as GuidoEngine,
  instantiateGuidoModuleFromFile_default as instantiateGuidoModuleFromFile
};
//# sourceMappingURL=index.js.map
