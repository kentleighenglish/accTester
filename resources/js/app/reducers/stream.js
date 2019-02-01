const { STREAM_TYPES } = require('app/actions/stream');
// const { first } = require('lodash');

const INITIAL_STATE = {}

module.exports = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case STREAM_TYPES.UPDATE_STREAM:
			state[action.id] = {
				...state[action.id],
				content: action.content
			}

			if (state[action.id].update) {
				setTimeout(
					state[action.id].update,
					2000
				);
			}
		break;
		case STREAM_TYPES.OPEN_STREAM:
			state[action.id] = {
				content: null
			}


			if (action.once && action.update) {
				action.update();
			} else {
				state[action.id].update = () => {
					action.update();
				}
			}
		break;
		case STREAM_TYPES.CLOSE_STREAM:
			state[action.id] = {
				...state[action.id],
				update: null
			}
		break;
	}

	return state;
}
