const axios = require('axios');
const { reduce, keys } = require('lodash');

const urlPrefix = '/api/';

const ep = {
	tests: 'tests'
};

var defaults = {
	headers: {
		'X-CSRF-TOKEN': window.__CSRF_TOKEN__,
		'Content-Type': 'application/json'
	},
	dataType: 'json'
}

const post = (url, data) => {
	return _handle(call({
		method: 'POST',
		url,
		data
	}));
}

const multipartPost = (url, data) => {
	return _handle(call({
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		url,
		data
	}));
}

const _handle = (promise) => {
	return new Promise((resolve, reject) => {
		promise.then(
			response => _processResponse(resolve, reject, response),
			response => _processResponse(resolve, reject, response)
		);
	});
}

const call = ({ prefix = urlPrefix, ...options }) => {
	return axios({
		...defaults,
		...options,
		url: `${prefix}${options.url}`,
		headers: {
			...defaults.headers,
			...options.header
		}
	});
}

const _processResponse = (resolve, reject, response) => {
	const { data: { success = false, redirect = null, data = null, errors= [], messages = [] }, status, statusText } = response.status ? response : response.response;

	if (errors && keys(errors).length) {
		EventEmitter.dispatch('mergeErrors', errors);
	}

	if (messages && keys(messages).length) {
		EventEmitter.dispatch('mergeMessages', messages);
	}

	if (status == 200 && success) {
		if (redirect) {
			window.location.href = redirect;
		}
		resolve(data);
	} else if(status == 422 || errors) {
		// Validation Issue
		reject(errors);
	} else {
		//@global error using statusText
		// eslint-disable-next-line
		console.error(status, statusText);
		reject(statusText);
	}
};

const makeQuery = (url, data) => {
	var query = reduce(data, (str, prop, key) => {
		if (prop) {
			str = str == '' ? `?${key}=${prop}` : `${str}&${key}=${prop}`;
		}

		return str;
	}, '');

	return url+query;
}

module.exports = {
	ep,
	call,
	post,
	multipartPost,
	makeQuery
}
