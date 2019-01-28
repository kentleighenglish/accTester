const { TESTS_TYPES } = require('app/actions/tests');

const INITIAL_STATE = {
	tests: [],
	running: 0,
	failed: 0
}

module.exports = (state = INITIAL_STATE, action) => {

	switch(action.type) {
		case TESTS_TYPES.TEST_STARTED:
		break;
	}

	return state;
}
