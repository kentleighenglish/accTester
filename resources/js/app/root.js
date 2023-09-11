const { module, bootstrap } = require('angular');
const { createStore, applyMiddleware } = require('redux');
const { createLogger } = require('redux-logger');
const thunk = require('redux-thunk').default;

require('ng-redux');
require('angular-sanitize');
const Pusher = require('pusher-js');

// External Libraries
const axios = require('axios');
const _ = require('lodash');

require('./app.module');

const initialState = window.__INITIAL_STATE__;

var middleware = [
	thunk
];

if (process.env.NODE_ENV === 'development') {
	middleware = [
		...middleware,
		createLogger()
	];
}

const rootReducer = require('./reducers');
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

module('AccTester', [
	'AppModule',
	'ngRedux',
	'ngSanitize'
])
.factory('$pusher', () => {
	return new Pusher(process.env.MIX_PUSHER_APP_KEY, {
		cluster: process.env.MIX_PUSHER_APP_CLUSTER
	});
})
.factory('axios', () => axios)
.factory('_', () => _)
.config(['$ngReduxProvider', ($ngReduxProvider) => {
	$ngReduxProvider.provideStore(store);
}]);

bootstrap(document, [ 'AccTester' ]);
