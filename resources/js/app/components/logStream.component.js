const { parse } = require('ansicolor');
const { openStream, closeStream } = require('app/actions/stream');
const { first } = require('lodash');

class LogStreamController {

	constructor($scope, $ngRedux) {
		this.$scope = $scope;

		$ngRedux.connect(state => this.mapStateToThis(state, this), this.mapDispatchToThis)(this);
	}

	mapStateToThis({ stream, tests: { tests } }, { id }) {
		return {
			stream: stream[id] ? stream[id]['content'] : null,
			test: first(tests, { id })
		}
	}

	mapDispatchToThis(dispatch) {
		return {
			openStream: (id, once) => dispatch(openStream(id, once)),
			closeStream: id => dispatch(closeStream(id))
		}
	}

	$onInit() {
		if (this.id) {
			if (this.test.running) {
				this.openStream(this.id, false);
			} else {
				this.openStream(this.id, true);
			}

			this.$scope.$watch(() => this.test.running, () => {
				if (!this.test.running) {
					this.closeStream(this.id);
				}
			}, true);
		}
	}

	parseStream(stream) {
		if (stream) {
			return parse(stream);
		}

		return [];
	}
}


module.exports = {
	bindings: {
		id: "<"
	},
	controller: [ '$scope', '$ngRedux', LogStreamController ],
	controllerAs: 'vm',
	template: [
		'<div class="logStream">',
			'<span ng-repeat="line in vm.parseStream(vm.stream) track by $index" class="logStream__line" ng-style="line.css">{{ line.text }}</span>',
		'</div>'
	].join('')
}
