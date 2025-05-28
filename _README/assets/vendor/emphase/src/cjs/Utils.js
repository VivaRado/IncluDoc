function genRepArr(len, type, special) { 
	return [...Array(len)].map((x, i) => `${special}\{${type}:${i}\}`);
}
function splice(string, start, length, replacement) { 
	return string.substr(0, start) + replacement + string.substr(start + length);
}
function makeGUID() { 
	var w = () => { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }; 
	return `${w()}${w()}`; 
}
function encMarkup(data) {
	if (data!==undefined) data = ( data=data.replace(/</g,"&lt;"), data=data.replace(/>/g,"&gt;") );
	return data;
}
function escapeRegex(string, esc) { 
	return string.replace(new RegExp(`[${esc}]`, 'g'), '\\$&'); 
}
function multilineRegex(mlc) {
	var _esc = "";
	mlc.esc && (_esc = mlc.esc);
	return `${escapeRegex(`${ mlc.init }`, _esc)}([\\s\\S]*?)${escapeRegex(`${ mlc.term }`, _esc)}`;
}
function toClipboard(elem){	
	navigator.clipboard.writeText(elem.text);
}
function getClass(seek, obj){
	var tkey = '';
	Object.entries(obj).filter( function( [key, value] ){	
		if (value.includes(seek)){
			tkey = key;
		}
	});
	return tkey;
}
const Utils = {
	splice: splice,
	makeGUID: makeGUID,
	getClass: getClass,
	genRepArr: genRepArr,
	encMarkup: encMarkup,
	toClipboard: toClipboard,
	escapeRegex: escapeRegex,
	multilineRegex: multilineRegex,
};
module.exports = Utils;