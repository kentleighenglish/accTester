<!DOCTYPE html>
<html>
	<head>
		<title>Acceptance Tester</title>
		<link href="/css/app.css" rel="stylesheet" />
	</head>
	<body ng-controller="AppController as app" ng-cloak>
		<div class="container">
			@yield ('content')
		</div>
	</body>
	<script type="text/javascript">
		window.__INITIAL_STATE__ = @json($viewState)
	</script>
	<script src="/js/app.js" type="text/javascript"></script>
</html>
