template = '''<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
		<title>%%%TITLE%%%</title>
		<link rel="icon" href="assets/media/vrd_logo_fill.svg">
		<link rel="stylesheet" type="text/css" href="assets/css/fface.css">
		<link rel="stylesheet" type="text/css" href="assets/css/base.css">
		<link rel="stylesheet" type="text/css" href="assets/css/md.css">
		<link rel="stylesheet" type="text/css" href="assets/css/ui.css">
		<link href="assets/vendor/emphase/lib/em.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="assets/vendor/mermaid.js"></script>
		<script type="text/javascript" src="assets/vendor/raphael.min.js"></script>
		<script type="text/javascript" src="assets/vendor/underscore-min.js"></script>
		<script type="text/javascript" src="assets/vendor/sequence-diagram.js"></script>
		<script type="text/javascript" src="assets/vendor/flowchart.js"></script>
		<script type="text/javascript" src="assets/vendor/emphase/lib/em.js"></script>
		<script type="text/javascript">
			var doc_languages = %%%LANGS%%%;
			var doc_version = %%%VERS%%%;
			var project_name = %%%PNAM%%%;
		</script>
	</head>
	<body class="markdown">
		<article class="markdown-body" id="body">
		%%%CONTENT%%%
		</article>
		<script type="text/javascript" src="assets/vendor/emphase/src/languages/em_plaintext.js"></script>
		<script type="text/javascript" src="assets/vendor/emphase/src/languages/em_javascript.js"></script>
		<script type="text/javascript" src="assets/vendor/emphase/src/languages/em_html.js"></script>
		<script type="text/javascript" src="assets/js/utils.js"></script>
		<script type="text/javascript" src="assets/js/vendors.js"></script>
		<script type="text/javascript" src="assets/js/script.js"></script>
	</body>
</html>
'''