const { combineReducers } = require('redux');

const tests = require('./tests');
const stream = require('./stream');
// const issues = require('./issues');

module.exports = combineReducers({
	domains: (state = {}) => state,
	tests,
	stream
});
