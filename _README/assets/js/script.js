/* IncluDoc / scripts ∞ 1.0.0 */
var lang = doc_languages;
var is_multilang = doc_languages.length > 0 ? true : false;
var active_lang = doc_languages[0];
var cl_active_lang = "active_lang";
var elem = '.markdown-body';
var body_elem = '.markdown-body strong';
function setClasses(al){
	document.body.dataset.activeLang = al;
	var data_lang = document.querySelectorAll(".markdown-body [data-language]");
	var data_lang_set = document.querySelector(`.markdown-body [data-language="${al}"]`);
	var data_lang_btn = document.querySelectorAll("[data-language-button]");
	var data_lang_btn_set = document.querySelector(`[data-language-button="${al}"]`);
	classOps(data_lang, ["active_lang_content"], ['hidden']);
	classOps(data_lang_set, ['hidden'], ["active_lang_content"]);
	classOps(data_lang_btn, [cl_active_lang] );
	data_lang_btn_set.classList.add(cl_active_lang);
}
function setLangSidebar(get_active, _lang){
	var sidebar = document.querySelector('.fix_sidebar');
	var is_lang = document.querySelector('.fix_sidebar .sidebar');
	is_lang && is_lang.remove();
	var make_lang = document.querySelector(`[data-language="${_lang}"] .sidebar`);
	var langsbr = make_lang.cloneNode(true);
	sidebar.append(langsbr)
}
function urlize(st, reverse){
	if (reverse) {
		str = st.replace(/\//g, ' / ');
		str_b = str.replace(/-/g, ' ');
	} else {
		str = st.replace(/ \/ /g, '/');
		str_b = str.replace(/ /g, '-');
	}
	return str_b.toLowerCase();
}
function run_scroll(elem){
	var sc = document.querySelector("html");
	var ao = 20;
	if (elem != null ) {
		var elemTop = elem.getBoundingClientRect().top + window.scrollY;
		sc.scrollTo({
		  top: elemTop - ao,
		  behavior: "instant"
		});
	}
}
function location_check(_t){
	if ( getParents(_t, ["h2", "h3", "h4", "h5", "h6"]).length > 0) {
		return !_t.closest(".sidebar") ? true : false;
	} else {
		return false;
	}
}
function get_chain(targ){
	var ptcp = [];
	var parents = getParents(targ, ["li"]);
	var chain = '';
	var divid = ' / ';
	for (var i = 0; i < parents.length; i++) {
		var stext = parents[i].querySelector('strong').textContent.trim();
		ptcp.push( stext );
		chain = stext + divid + chain;
	}
	var schain = chain.slice(0,-divid.length).toLowerCase();
	return [schain,ptcp];
}
function get_candidate(targ, chain, allow_all){
	var cand = null;
	if ( chain ) {
		sanitized_chain = chain.toLowerCase();
	}else{	
		if (targ) {
			sanitized_chain = get_chain(targ)[0];
		} else {
			return null
		}
	}
	if (lang.length > 0) {
		select_target = document.querySelector('.markdown-body'+' '+'.active_lang_content')
	} else {
		select_target = document.querySelector('.markdown-body')
	}
	if (select_target) {
		select_target.querySelectorAll('strong').forEach((p)=>{
			if (location_check(p)) {
				var in_t = p.textContent.toLowerCase().trim();
				if (sanitized_chain == in_t) {
					cand = p;
				}
			}
		})
	}
	return [cand, sanitized_chain];
}
function retarget_sidebar(){
	var sidebar = document.querySelector('.fix_sidebar');
	var strongs = sidebar.querySelectorAll('li strong');
	strongs.forEach((p)=>{
		p.addEventListener('click',(e)=>{
			e.stopPropagation();
			get_c = get_candidate(e.target,null);
			cand = get_c[0];
			if (cand != null) {
				var sbrsel = document.querySelector(".sidebar .selected");
				var sbrcur = document.querySelector(".sidebar .current");
				sbrsel && classOps(sbrsel,['selected']);
				sbrcur && classOps(sbrcur,['current']);
				e.target.classList.add("selected");
				cand && run_scroll(cand);
				window.location.hash = urlize(get_c[1]);
			}
		});
	})
}
function toggle_lang(_lang){
	setClasses(_lang);
	var get_active = document.querySelector("[data-active-lang]").dataset.activeLang;
	var is_lang = document.querySelectorAll('.fix_sidebar .sidebar');
	for (var i = 0; i < is_lang.length; i++) { is_lang[i].remove() };
	setLangSidebar(get_active, _lang);
	retarget_sidebar();
	set_nav_toggle();
	var loc_hash = window.location.hash;
	var get_c = get_candidate(null, urlize(loc_hash.substring(1, loc_hash.length),true));
	var fsbr = document.querySelector('.fix_sidebar');
	if (get_c != null) {
		reveal_sidebar_depth(fsbr, get_c, null, null);
	}
}
function check_width(){
	if (window.innerWidth > 800 ) {
		document.body.classList.remove("mobile");
	} else {
		document.body.classList.add("mobile");
	}
}
function toggle_menu(){
	if (document.body.classList.contains("mobile")) {
		document.body.classList.toggle('sidebar_open');
	} else {
		return false
	}
}
function isScrolledIntoView(elem){
	var docViewTop = window.scrollY;
	var docViewBottom = docViewTop + window.innerHeight;
	var elemTop = 0;
	if (elem.getBoundingClientRect().top > 0) {
		elemTop = elem.getBoundingClientRect().top + window.scrollY;
	}
	var elemBottom = elemTop + elem.getBoundingClientRect().height;
	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
function scroll_function(){
	var bea = Array.from(document.querySelectorAll(body_elem));
	for (var i = 0; i < bea.length; i++) {
		var p = bea[i];
		if ( location_check( p ) ) {
			if( isScrolledIntoView( p ) ){
				var in_t = p.textContent.trim();
				var csel = document.querySelector("#body .selected");
				var ccur = document.querySelector("#body .current");
				var fsbr = document.querySelector('.fix_sidebar');
				csel && classOps(csel,['selected']);
				ccur && classOps(ccur,['current']);
				p.classList.add("current");
				p.classList.add("selected");
				window.location.hash = urlize(in_t);
				loc_hash = urlize(in_t)
				get_c = get_candidate(null, urlize(loc_hash,true));
				reveal_sidebar_depth( fsbr, get_c, null, null)
				break;
			}
		}
	}
}
function activate_scroll(){
	window.addEventListener( "scroll", () => {
		scroll_function();
	});
}
function reveal_sidebar_depth(fix_sidebar,_c, correlative, is_change){
	var str = _c[1];
	var n = str.split(' / ');
	if (is_change != "change" ) {
		var fsel = fix_sidebar.querySelector('.selected');
		fsel && fsel.classList.remove('selected');
	}
	for (var i = 0; i < n.length; i++) {
		var ftext = Array.from(document.querySelectorAll('.fix_sidebar ol strong')).filter((el) => {
			return (el.textContent.toLowerCase().indexOf(n[i].toLowerCase()) >= 0) && n[i];
		});
		if (correlative == null) {
			for (var x = 0; x < ftext.length; x++) {
				if (i == n.length - 1) {
					if (n[i-1] != undefined) {
						var parent_t = getParents( ftext[x].parentNode.parentNode, ["li"])[0].childNodes[0].textContent.toLowerCase().trim();
						var current = n[i-1].toLowerCase().trim();
						if (current == parent_t) {
							ftext[x].classList.add('selected');
							break;
						}
					} else {
						ftext[x].classList.add('selected');
						break;
					}
				}
			}
			if ( ftext != null && ftext.length > 0) {
				var cnav = ftext[0].closest("nav");
				if (cnav && !cnav.classList.contains('active')) {
					ftext[0].closest("nav").click();
				}
			}
		}
	}
}
function set_nav_toggle(){
	var fix_sidebar = document.querySelector('.fix_sidebar');
	fix_sidebar.querySelectorAll("ol").forEach(function(p){
		var ol_ = getParents(p.parentNode, ['ol']).length;
		var nv_ = p.parentNode.classList.contains('.toggle');
		if (ol_ >= 1 && !nv_) {
			var wtgl = createEl('nav', {'class':'toggle'});
			p.parentNode.insertBefore(wtgl, p);
			wtgl.appendChild(p);
		}
	});
	var navli = document.querySelectorAll('nav.toggle li');
	navli.forEach((p)=>{
		p.addEventListener('click', e => { e.stopPropagation() });	
	});
	var nav = document.querySelectorAll('nav.toggle');
	nav.forEach((p)=>{
		p.addEventListener('click', e => {
			e.stopPropagation();
			e.target.classList.toggle("active");
		});
	});
}
(function() {
	var dcvs = createEl('div', {'class':'doc_version' });
	var mbtn = createEl('div', {'class':'mobile_button'});
	var mbnv = createEl('nav', {'class':'mobile_menu'});
	var fsas = createEl('aside', {'class':'fix_sidebar show_sidebar'});
	fsas.append(mbtn);
	dcvs.textContent = `${project_name} ∞${doc_version}`;
	fsas.append(dcvs);
	document.body.prepend(fsas);
	document.body.prepend(mbnv);
	if (is_multilang) {
		var lnct = createEl('div', {'class':'lang_controls'});
		fsas.append(lnct);
		for (var i = 0; i < lang.length; i++) {
			var lnbt = createEl('div', {'class':'btn lang_btn', 'data-language-button': lang[i] });
			lnbt.textContent = lang[i];
			lnct.append(lnbt);
			lnbt.addEventListener('click', (e) => {
				toggle_lang(e.target.dataset.languageButton);
			});
		}
	}
	set_nav_toggle();
	check_width();
	var loc_hash = window.location.hash;
	var get_c = get_candidate(null, urlize(loc_hash.substring(1, loc_hash.length),true));
	if (get_c != null) {
		run_scroll(get_c[0]);
		reveal_sidebar_depth(fsas, get_c, null, null);
		activate_scroll();
	}
	mbtn.addEventListener('click', (e)=>toggle_menu());
	window.addEventListener('resize', (e)=>check_width());

	setTimeout(()=>{
		setClasses(active_lang);
		is_multilang && toggle_lang(active_lang);
		document.querySelector('.markdown').classList.add('reveal');
	},100)

})();