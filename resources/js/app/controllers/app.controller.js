const { addTest } = require('app/actions/tests');

class AppController {

	constructor($scope, $ngRedux, $pusher)
	{
		this.$pusher = $pusher;
		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
	}

	$onInit()
	{
		const testsChannel = this.$pusher.subscribe('tests');

		testsChannel.bind('App\\Events\\TestStartedEvent', data => {
			console.log(data);
		});
	}

	bindEvents()
	{

	}

	mapStateToThis({ tests, domains })
	{
		return {
			tests,
			domains
		}
	}

	mapDispatchToThis(dispatch)
	{
		return {
			addTest: test => dispatch(addTest(test))
		}
	}

	runTest()
	{
		this.addTest({ domain: 'namcomarketing.com' });
	}

}

module.exports = ['$scope', '$ngRedux', '$pusher', AppController];
