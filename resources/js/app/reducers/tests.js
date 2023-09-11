const { TESTS_TYPES } = require('app/actions/tests');
const { findIndex, filter } = require('lodash');

const INITIAL_STATE = {
	tests: [],
	running: 0,
	failed: 0,
	activeTest: null
}

module.exports = (state = INITIAL_STATE, action) => {
	let i = null;
	if (action.test) {
		i = findIndex(state.tests, { id: action.test.id });
	}

	switch(action.type) {
		case TESTS_TYPES.TEST_QUEUED:
		case TESTS_TYPES.TEST_STARTED:
		case TESTS_TYPES.TEST_COMPLETE:
		case TESTS_TYPES.TEST_FAILED:

			if (i !== null && i !== -1) {
				state.tests[i] = action.test;
			} else if (i !== null) {
				state.tests.push(action.test);
				state.activeTest = action.test.id;
			}

			state = {
				...state,
				running: filter(state.tests, { running: true }).length,
				failed: filter(state.tests, { failed: true }).length
			}
		break;
		case TESTS_TYPES.SET_ACTIVE_TEST:
			state.activeTest = action.id;
		break;
	}

	return state;
}
