const Utils = require("./Utils.js");

function makeButtons(em) {
	var header = classElement("div", "header");
	var lbl_lang = classElement("div", "label");
	lbl_lang.innerHTML = em.ln.fnam;
	header.prepend(lbl_lang);
	em._code.parentNode.appendChild(header);
	if (em._cfg.showCopyButton) {
		var copyButton = classElement("div", "button");
		copyButton.innerHTML = em._cfg.copyButtonText;
		header.appendChild(copyButton);
		copyButton.addEventListener('click',function(e){
			var tid = e.currentTarget.parentNode.parentNode.id;
			var elem = em._elements[tid];
			Utils.toClipboard(elem);
		});
	}
}
function classElement(type, className) { 
	var result = document.createElement(type);
	className && (result.className = className);
	return result; 
}
function scrollSync(trg) { 
	trg.querySelector('.numbers').style.transform = `translateY(${ -parseInt(trg.scrollTop) }px)`; 
}
function makeNumberTab(em) {
	em._code.classList.add('show_numbers');
	em._numbtab = classElement("div", "number_tab");
	em._numblst = classElement("div", "numbers");
	em._code.prepend(em._numbtab)
	em._numbtab.appendChild(em._numblst);
	var esyntx = em._code.getElementsByClassName('syntax')[0];
	var nstyle = window.getComputedStyle(em._numblst);
	var numpad = ((parseInt(nstyle.paddingLeft) || 0) + parseInt(nstyle.paddingRight) || 0) / 2;
	esyntx.style.marginLeft = em._numbtab.style.width = `${em._numblst.offsetWidth + numpad}px`;
	em._code.addEventListener('scroll', function(e) {
		scrollSync(e.target);
	});
	em._code.addEventListener('resize', function(e) {
		scrollSync(e.target);
	});
}
function createElements(em) {
	em._element.classList.add("emphase");
	em._element.innerHTML = em._string.empty;
	em._code = classElement("div", "code");
	em._element.appendChild(em._code);
	em._syntax = classElement("div", "syntax");
	em._code.appendChild(em._syntax);
	makeButtons(em);
	if (em._cfg.showNumbersTab) makeNumberTab(em);
	return em
}
function createLines(em) {
	var lines = em.result.split(em._string.newLine),
		linesLength = lines.length,
		lineNumber = 1;
	for (var lineIndex = 0; lineIndex < linesLength; lineIndex++) {
		var line = lines[lineIndex];
		if ( em._numblst ) {
			var numberCode = ElementMaker.classElement("p");
			numberCode.innerHTML = lineNumber.toString();
			em._numblst.appendChild(numberCode);
			lineNumber++;
		}
		var syntaxCode = ElementMaker.classElement("p");
		syntaxCode.innerHTML = line.trim() === em._string.empty ? "<br>" : line;
		em._syntax.appendChild(syntaxCode);
	}
}
const ElementMaker = {
	scrollSync : scrollSync,
	makeButtons : makeButtons,
	createLines : createLines,
	classElement : classElement,
	makeNumberTab : makeNumberTab,
	createElements : createElements
};
module.exports = ElementMaker