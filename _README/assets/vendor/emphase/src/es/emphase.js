import {LanguageLoader} from "./LanguageLoader.js";
import {CacheManager} from "./CacheManager.js";
import {ElementMaker} from "./ElementMaker.js";
import {Utils} from "./Utils.js";

class Emphase {
	constructor(cfg) {
		var em = this;
		em.classTypes = { 'str' : ['SB', 'S'], 'cmt' : ['CB', 'C'], 'dcv' : ['D'], 'kwd' : ['HK', 'K'], 'val' : ['VL'] };
		em._def = {
			hl_dcv: true, // directives
			hl_cmt: true, // comments
			hl_cmb: true, // comment blocks
			hl_str: true, // strings
			hl_stb: true, // string blocks
			hl_val: true, // values
			hl_kwd: true, // keywords
			showNumbersTab: true,
			showCopyButton: true,
			copyButtonText: 'Copy',
			headless: false
		};
		if (cfg == undefined) cfg = {}; em._cfg = {...em._def, ...cfg};
		if (typeof document == "undefined" && typeof window == "undefined" ) em._cfg.headless = true;
		if (typeof window != "undefined") var _em_la_ = {};
		em._syntax = null;
		em._elements = {};
		em.ln = null;
		em._string = { empty: "", space: " ", newLine: "\n" };
		em._cached = {};
		em.lalo = new LanguageLoader();
		em.cama = new CacheManager();
	}
	generateSyntax(){
		var em = this;
		if (em.ln !== em._lang_unknown) {
			// cache_key, replacement_order, config_setting, validation
			var regs  = [
				['SB', 7, em._cfg.hl_stb,                         em.ln.strb ],
				['CB', 5, em._cfg.hl_cmb,                         em.ln.cmtb ],
				['D' , 2, (em._cfg.hl_dcv && em.dcvt.length),    `(${em.dcvt.join('|')})\\s([^\\n\\r]*)` ],
				['S' , 6, em._cfg.hl_str,                        `([${em.ln.strl.join('|')}])(?:(?!\\1|\\\\).|\\\\.)*\\1` ],
				['C' , 4, em._cfg.hl_cmt,                        `${em.ln.cmts}.*` ],
				['HK', 0, !em.nmkp,                              `(<([^>]+)>)` ],
				['K' , 1,  em.nmkp,                              `\\b(${em.ln.kwds.join('|')})\\b` ],
				['VL', 3, (em._cfg.hl_val && em.ln.lval.length), `\\b(${em.ln.lval.join('|')})\\b` ]
			];
			for (var i = 0; i < regs.length; i++) regs[i][2] && em.cama.cacheSetArea(em, regs[i][3], regs[i][0]);
			regs.sort((a, b) => a[1] - b[1]);
			for (var i = 0; i < regs.length; i++) regs[i][2] && em.cama.cacheReplace(em, regs[i][0])
		} else {
			em.result = Utils.encMarkup(em.result);
		}		
	}
	emphasize(input, lang) {
		var em = this, _input = '', guid = Utils.makeGUID();
		em.lalo.assignLanguages(lang);
		if ( typeof input === 'string' ){
			em._elements[guid] = {text:input};
			_input = input;
		} else {
			em._element = input;
			_input = em._element.childNodes[0].nodeValue;
			if (!em._cfg.headless) {
				if (typeof em._element.id !== undefined) em._element.id = guid;
				em._elements[em._element.id] = {text:input.textContent};
			} else {
				em._elements[guid] = {text:input.textContent};
			}
		}
		em.ln = em.lalo.getLanguage();
		if (em.ln) {
			em.dcvt = [].concat(em.ln.dcvn, em.ln.dcvs);
			em.nmkp = (!em.ln.mkup || em.ln.mkup == undefined);
		}
		em.result = _input;
		em.generateSyntax();
		if (!em._cfg.headless) {
			ElementMaker.createElements(em);
			ElementMaker.createLines(em);
			em._elements[em._element.id].html = em.result;
		}
		return em;
	}
}
export {Emphase}