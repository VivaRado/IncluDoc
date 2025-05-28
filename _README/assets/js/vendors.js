/* IncluDoc / vendoes ∞ 1.0.0 */
(function() {
	function draw_flowcharts() {
		document.querySelectorAll(".lang-flowchart").forEach((p)=>{
			var diagram = flowchart.parse(p.textContent);
			p.innerHTML = '';
			diagram.drawSVG(p);
		});
	}
	draw_flowcharts();
	mermaid.initialize({
		theme: 'neutral',
		logLevel: 3,
		flowchart: { curve: 'linear' },
		gantt: { axisFormat: '%m/%d/%Y' },
		sequence: { actorMargin: 50 }
	});
	function process_codeblocks(em, codeblocks){
		for (var i = 0; i < codeblocks.length; i++) {
			var pnode = codeblocks[i].parentNode;
			if (pnode.tagName == 'PRE') {
				var prefx = 'lang-';
				var lang = Array.from(codeblocks[i].classList).map( (s) => s.startsWith(prefx) && s.split(prefx)[1] )[0];
				if (lang == 'mermaid') {
					pnode.childNodes[0].classList.add('mermaid')
				} else if (lang == 'flowchart') {
				} else {
					lang && em.emphasize(codeblocks[i], lang)
				}
			}
		}
	}
	var codeblocks = document.querySelectorAll("code");
	var em = new Emphase({
		hl_dcv: true, // directives
		hl_cmt: true, // comments
		hl_str: true, // strings
		hl_val: true, // values
		hl_kwd: true, // keywords
		showNumbersTab: true,
		showCopyButton: true,
		copyButtonText: 'Copy',
		headless: false
	});
	process_codeblocks(em, codeblocks);
})();