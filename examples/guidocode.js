
(async () => {
	/**
	 * @param {import("../dist/esm-bundle/index.js").GuidoEngineAdapter} engine
	 * @param {HTMLDivElement} div
	 * @param {import("../dist/esm-bundle/index.js").GuidoParser} parser
	 */
	function processGMNDiv(engine, div, parser) {
		const content = div.innerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
		const ar = engine.string2AR(parser, content);
		// var gr = guidoEngine.ar2gr(ar);
		// div.innerHTML = guidoEngine.gr2SVG(gr, 1, true, 0);
		guidoEngine.freeAR(ar);
		// guidoEngine.freeGR(gr);
	}
	
	/**
	 * @param {import("../dist/esm-bundle/index.js").GuidoEngineAdapter} engine
	 */
	function processGMNCode(engine) {
		/** @type {NodeListOf<HTMLDivElement>} */
		const divs = document.querySelectorAll(".guido-code");
		const p = engine.openParser();
		divs.forEach(div => processGMNDiv(engine, div, p));
		guidoEngine.closeParser(p);
	}
	
	const { instantiateGuidoModule } = await import("../dist/esm-bundle/index.js");
	const module = await instantiateGuidoModule();
	guidoModule = module;
	guidoEngine = new module.GuidoEngineAdapter();
	var version = guidoEngine.getVersion();
	console.log( "Guido Engine version " + version.str);
	guidoEngine.init();
	processGMNCode(guidoEngine);
})();
