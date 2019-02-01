const { module } = require('angular');

const LogStreamComponent = require('./components/logStream.component');

module('ComponentsModule', [])
.component('logStream', LogStreamComponent);
