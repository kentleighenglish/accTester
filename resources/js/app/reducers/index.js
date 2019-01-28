const { combineReducers } = require('redux');

const tests = require('./tests');
// const filter = require('./filter');
// const issues = require('./issues');

module.exports = combineReducers({
	domains: (state = {}) => state,
	tests
});
