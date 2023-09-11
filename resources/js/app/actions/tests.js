const { post, ep } = require('app/api');

const TESTS_TYPES = {
	'TEST_ADDED': 'TESTS@TEST_ADDED',
	'TEST_QUEUED': 'TESTS@TEST_QUEUED',
	'TEST_STARTED': 'TESTS@TEST_STARTED',
	'TEST_COMPLETE': 'TESTS@TEST_COMPLETE',
	'TEST_FAILED': 'TESTS@TEST_FAILED',
	'SET_ACTIVE_TEST': 'TESTS@SET_ACTIVE_TEST',
}

const addTest = (test) => (dispatch) => {

	post(ep['tests'], { test }).then(
		() => {
			dispatch({
				type: TESTS_TYPES.TEST_ADDED,
				test
			});
		}
	)
}

const eventTestQueued = test => ({
	type: TESTS_TYPES.TEST_QUEUED,
	test
});

const eventTestStarted = test => ({
	type: TESTS_TYPES.TEST_STARTED,
	test
});

const eventTestComplete = test => ({
	type: TESTS_TYPES.TEST_COMPLETE,
	test
});

const eventTestFailed = test => ({
	type: TESTS_TYPES.TEST_FAILED,
	test
});

const setActiveTest = id => ({
	type: TESTS_TYPES.SET_ACTIVE_TEST,
	id
});

module.exports = {
	addTest,
	setActiveTest,
	eventTestQueued,
	eventTestStarted,
	eventTestComplete,
	eventTestFailed,
	TESTS_TYPES
}
