/* IncluDoc / utils ∞ 1.0.0 */
function createEl(type, props) {
	var el = document.createElement(type);
	for (var prop in props) { el.setAttribute(prop, props[prop]) };
	return el;
}
function classOps(ndlst, rem_classes, add_classes, prefix = ''){
	var proc = function(el){
		var oper = function(op, arr) {
			if (Array.isArray(arr)) {
				if (arr) el.classList[op](...arr.map(i => prefix + i));
			} else {
				if (arr) el.classList[op]( prefix+arr);
			}
		}
		oper('add', add_classes);
		oper('remove', rem_classes);
	}
	if ((ndlst instanceof NodeList) || (ndlst instanceof HTMLCollection) || Array.isArray(ndlst) ) {
		Array.from(ndlst).filter( (el) => {
			proc(el);
		});
	} else {
		proc(ndlst);
	}
}
function getParents(elem, tags) {
	var parents = [];
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if (tags) {
			if ( tags.indexOf( elem.tagName.toLowerCase() ) != -1) {
				parents.push(elem);
			}
		} else {
			parents.push(elem);
		}
	}
	return parents;
};