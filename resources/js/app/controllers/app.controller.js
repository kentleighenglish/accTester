const { addTest, eventTestQueued, eventTestStarted, eventTestComplete, eventTestFailed } = require('app/actions/tests');
const { findIndex } = require('lodash');

class AppController {

	constructor($scope, $ngRedux, $pusher)
	{
		this.$pusher = $pusher;
		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);

		this.disabled = false;
	}

	$onInit()
	{
		this.bindEvents();
	}

	bindEvents()
	{
		const testsChannel = this.$pusher.subscribe('tests');
		testsChannel.bind('App\\Events\\TestQueuedEvent', ({ test }) => {
			this.disabled = false;
			this.eventTestQueued(test);
		});
		testsChannel.bind('App\\Events\\TestStartedEvent', ({ test }) => {
			this.eventTestStarted(test);
		});
		testsChannel.bind('App\\Events\\TestCompleteEvent', ({ test }) => {
			this.eventTestComplete(test);
		});
		testsChannel.bind('App\\Events\\TestFailedEvent', ({ test }) => {
			this.eventTestFailed(test);
		});
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
			addTest: test => dispatch(addTest(test)),
			eventTestQueued: test => dispatch(eventTestQueued(test)),
			eventTestStarted: test => dispatch(eventTestStarted(test)),
			eventTestComplete: test => dispatch(eventTestComplete(test)),
			eventTestFailed: test => dispatch(eventTestFailed(test)),
		}
	}

	runTest(domain)
	{
		this.disabled = true;
		this.addTest({ domain });
	}

	alreadyRunning(domain)
	{
		return findIndex(this.tests.tests, { domain, run: false }) !== -1;
	}

}

module.exports = ['$scope', '$ngRedux', '$pusher', AppController];
