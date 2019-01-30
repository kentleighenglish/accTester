const { STREAM_TYPES } = require('app/actions/stream');

const INITIAL_STATE = {}

module.exports = (state = INITIAL_STATE, action) => {

	switch(action.type) {
		case STREAM_TYPES.OPEN_STREAM:
			state[action.id] = {
				content: null,
				updating: false,
				open: true
			}
		break;
		case STREAM_TYPES.CLOSE_STREAM:
			state[action.id] = {
				...state[action.id],
				open: false
			}
		break;
		case STREAM_TYPES.UPDATE_STREAM:
			state[action.id] = {
				...state[action.id],
				updating: true
			}
		break;
		case STREAM_TYPES.UPDATE_STREAM_COMPLETE:
			state[action.id] = {
				...state[action.id],
				content: action.content,
				updating: false
			}
		break;
	}

	return state;
}
