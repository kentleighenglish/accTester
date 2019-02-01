const { get, ep } = require('app/api');

const STREAM_TYPES = {
	'OPEN_STREAM': 'STREAM@OPEN_STREAM',
	'UPDATE_STREAM': 'STREAM@UPDATE_STREAM',
	'CLOSE_STREAM': 'STREAM@CLOSE_STREAM',
}

const openStream = (id, once = true) => (dispatch) => {
	const updateStream = () => {
		get(ep['log']+id).then(response => {
			dispatch({
				type: STREAM_TYPES.UPDATE_STREAM,
				id,
				content: response.data
			});
		});
	}

	dispatch({
		type: STREAM_TYPES.OPEN_STREAM,
		id,
		once,
		update: updateStream
	});
}

const closeStream = id => ({
	type: STREAM_TYPES.CLOSE_STREAM,
	id
});

module.exports = {
	openStream,
	closeStream,
	STREAM_TYPES
}
