class LanguageLoader {
	constructor() {
		this._lang_unknown = "unknown";
		this.current_language = this._lang_unknown;
		this._cached_languages = {};
		this._supported_languages = [
			'bash',			'c',
			'cpp',			'cs',
			'fs',			'go',
			'html',			'java',
			'javascript',	'kotlin',
			'matlab',		'perl',
			'python',		'r',
			'ruby',			'rust',
			'scala',		'sql',
			'swift',		'typescript',
			'vb'
		];
		return this
	}
	assignLanguages(lang) {
		var self = this;
		var lang_isloaded = false;
		if (lang && lang != self._lang_unknown) {
			self.current_language = lang;
			var lang_nonexist = !self._cached_languages.hasOwnProperty(lang);
			var lang_supports = self._supported_languages.includes(lang);
			if (typeof window !== "undefined") {
				lang_isloaded = window._em_la_[lang];
			} else {
				lang_isloaded = require(`../languages/em_${lang}.js`);
			}
			if (lang_nonexist && lang_supports && lang_isloaded) {
				self._cached_languages[lang] = lang_isloaded
			}
		} else {
			self.current_language = self._lang_unknown;
		}
		return self
	}
	getLanguage(lang) {
		if ( lang == undefined) {
			lang = this.current_language
		}
		return this._cached_languages[lang]; 
	}
};
module.exports = LanguageLoader