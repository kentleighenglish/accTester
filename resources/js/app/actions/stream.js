const { get } = require('axios');

const STREAM_TYPES = {
	'OPEN_STREAM': 'STREAM@OPEN_STREAM',
	'CLOSE_STREAM': 'STREAM@CLOSE_STREAM',
	'UPDATE_STREAM': 'STREAM@UPDATE_STREAM',
	'UPDATE_STREAM_COMPLETE': 'STREAM@UPDATE_STREAM_COMPLETE',
}

const openStream = (id) => (dispatch) => {
	dispatch({
		type: STREAM_TYPES.OPEN_STREAM,
		id
	});

	dispatch(updateStream(id));
}

const closeStream = id => ({
	type: STREAM_TYPES.CLOSE_STREAM,
	id
});

const updateStream = (id) => dispatch => {
	dispatch({
		type: STREAM_TYPES.UPDATE_STREAM,
		id
	});

	get(`/api/logs/${id}`).then((response) => {
		const { data } = response;

		dispatch({
			type: STREAM_TYPES.UPDATE_STREAM_COMPLETE,
			id,
			content: data
		});
	})
	// eslint-disable-next-line
	.catch((e) => console.error(e));
}

module.exports = {
	openStream,
	closeStream,
	updateStream,
	STREAM_TYPES
}
