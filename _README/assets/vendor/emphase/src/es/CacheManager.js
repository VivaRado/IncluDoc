import {Utils} from "./Utils.js";

class CacheManager {
	constructor() {
		this.special = '~';
		return this
	}
	cacheSetArea(em, reg, clet) {
		var rep = [reg], mlt = false;
		if (Array.isArray(reg) ) rep = reg, mlt = true;
		var get_type = Utils.getClass(clet, em.classTypes);
		this.cacheProcess(em, rep, get_type, clet, mlt)
	}
	cacheTenant(em, reg, clet){
		var mt = em.result.match(new RegExp(reg, 'g'));
		if (em._cached[clet] == undefined) em._cached[clet] = {};
		if (mt != null) {
			var rep_arr = Utils.genRepArr(mt.length, clet, this.special);
			for (var x = 0; x < rep_arr.length; x++) {
				em._cached[clet][rep_arr[x]] = mt[x];
				em.result = Utils.splice(em.result, em.result.indexOf(mt[x]), mt[x].length, rep_arr[x]);
			}
		}
	}
	cacheReplace(em, cache) { 
		for (var v in em._cached[cache]) {
			var repl = Array.isArray(em._cached[cache][v]) ? em._cached[cache][v].join('\n') : em._cached[cache][v];
			em.result = em.result.replace(v, repl)
		} 
	}
	cacheProcess(em, reparr, nam, clet, multiline) {
		var self = this, add_pre = '', _prep = '';
		if (em._cached[clet] == undefined) em._cached[clet] = {};
		for (var x = 0; x < reparr.length; x++) {
			var reg_res = reparr[x];
			if (multiline) {
				if (reparr[x].pre) add_pre = reparr[x].pre;
				reg_res = `${add_pre}${Utils.multilineRegex(reparr[x])}`;
			}
			var tkey = `${clet}:${x}`;
			self.cacheTenant(em, reg_res, tkey);
			for (const [key, chunk] of Object.entries(em._cached[tkey])) {
				var t_mid = chunk, t_init = '', t_term = '', cmul = '', dcv_val = '', dcv_str = '', add_w = '', add_n = '';
				if (multiline) {
					cmul = 'mul';
					var spl_cmt = chunk.split(em._string.newLine), mlt_arr = [];
					for (var z = 0; z < spl_cmt.length; z++) {
						var _ps = Utils.encMarkup(spl_cmt[z]);
						if (spl_cmt[z].length == 0) _ps = '<br>';
						if (add_pre.length > 0){
							if (_ps.match(new RegExp(add_pre, 'g'))){
								_prep = _ps.match(new RegExp(add_pre, 'g'))[0].split(reparr[x].init)[0];
							}
							_ps = _ps.replace(new RegExp(add_pre, 'g'), '')
						}
						mlt_arr.push(`${_prep}<em data-em="${nam}_${cmul}">${_ps}</em>`);
						_prep = '';
					}
					em._cached[clet][key] = mlt_arr;
				} else {
					if (em.ln.mkup !== undefined && em.ln.mkup) {
						var tagname = chunk.replace(/[<|!|>]/g, '').split(em._string.space)[0];
						if (tagname.startsWith('/')) { tagname = tagname.substring(1) }
						var tag_wrap = chunk.split(tagname);
						t_init = Utils.encMarkup(tag_wrap[0]), t_term = Utils.encMarkup(tag_wrap[1]);
						if (clet != 'CB') t_mid = tagname;
					}
					if (clet == 'D') {
						var mt = Array.from(chunk.matchAll(reparr[x]))[0];
						if (mt != null) {
							t_mid = mt[1];
							if (mt[2] !== undefined) {
								dcv_val = Utils.encMarkup(mt[2]);
								if (em.ln.dcvs.includes(mt[1])) {
									add_w = ' ';
									dcv_str = `<em data-em="${nam}_str">${dcv_val}</em>`;
								} else {
									add_w = ' ';
									dcv_str = dcv_val;
								}
								if (dcv_val.length == 0 || mt[0].includes('\n')) {
									add_n = '\n', add_w = '';
								}
							}
						}
					}
					em._cached[clet][key] = `${t_init}<em data-em="${nam}">${t_mid}</em>${t_term}${add_n}${add_w}${dcv_str}`;
				}
			}
		}
	}
}
export {CacheManager}