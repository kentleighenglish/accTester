
@extends ('layouts.main')

@section ('content')
	<div>
		<h3>Domains</h3>
		<ul>
			<li ng-repeat="test in app.domains">
				<span>@{{ test.label }}</span> <button ng-click="app.runTest(test.domain)" ng-disabled="app.alreadyRunning(test.domain) || app.disabled">Run Test</button>
			</li>
		</ul>
	</div>
	<h4>Status</h4>
	<p>Running: @{{ app.tests.running }}</p>
	<p>Failed: @{{ app.tests.failed }}</p>
	<h4>Tests</h4>
	<div>
		<ul>
			<li ng-repeat="test in app.tests.tests">
				@{{ test.domain }} <span ng-if="test.running">( Running )</span><span ng-if="test.run">( Finished )</span>
			</li>
		</ul>
	</div>
@endsection
