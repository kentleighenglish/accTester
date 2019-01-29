<!DOCTYPE html>
<html>
	<head>
		<title>Acceptance Tester</title>
		<link href="/css/app.css" rel="stylesheet" />
		<link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" type="text/css">
	</head>
	<body ng-controller="AppController as app">
		@yield ('content')
	</body>
	<script type="text/javascript">
		window.__INITIAL_STATE__ = @json($viewState)
	</script>
	<script src="/js/app.js" type="text/javascript"></script>
</html>
