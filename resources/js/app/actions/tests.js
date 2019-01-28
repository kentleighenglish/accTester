const { post, ep } = require('app/api');

const TESTS_TYPES = {
	'TEST_STARTED': 'TESTS@TEST_STARTED'
}

const addTest = (test) => (dispatch) => {

	post(ep['tests'], { test }).then(
		() => {
			dispatch({
				type: TESTS_TYPES.TEST_STARTED,
				test
			});
		}
	)
}

module.exports = {
	addTest,
	TESTS_TYPES
}
