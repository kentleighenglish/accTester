const ansi = require('ansicolor');
const { first } = require('lodash');
const { openStream, closeStream, updateStream } = require('app/actions/stream');

ansi.rgb = {
	black:        [ 39,  43,  45],
	darkGray:     [100, 100, 100],
    lightGray:    [200, 200, 200],
    white:        [255, 255, 255],
    red:          [204,   0,   0],
    lightRed:     [255,  51,   0],
    green:        [0,   204,   0],
    lightGreen:   [51,  204,  51],
    yellow:       [204, 102,   0],
    lightYellow:  [255, 153,  51],
    blue:         [0,     0, 255],
    lightBlue:    [26,  140, 255],
    magenta:      [204,   0, 204],
    lightMagenta: [255,   0, 255],
    cyan:         [0,   153, 255],
    lightCyan:    [0,   204, 255],
};

class LogStreamController {

	constructor($scope, $ngRedux) {
		this.$scope = $scope;

		$ngRedux.connect((state) => this.mapStateToThis(state, this), this.mapDispatchToThis)(this)
	}

	mapStateToThis({ stream, tests: { tests } }, { id }) {
		return {
			stream: stream[id] ? stream[id] : null,
			test: first(tests, { id }),
			content: stream[id] && stream[id]['content'] ? ansi.parse(stream[id]['content']) : null
		}
	}

	mapDispatchToThis(dispatch) {
		return {
			openStream: id => dispatch(openStream(id)),
			closeStream: id => dispatch(closeStream(id)),
			updateStream: id => dispatch(updateStream(id))
		}
	}

	$onInit() {
		if (this.id) {
			if (!this.stream) {
				this.openStream(this.id);
			}

			this.$scope.$watch(() => this.test.running, () => {
				if (!this.test.running) {
					this.closeStream(this.id);
				}
			}, true);

			this.$scope.$watch(() => this.stream['updating'], () => {
				if (!this.stream.updating && this.stream.open && !this.timeout) {
					this.timeout = setTimeout(
						() => { this.updateStream(this.id); this.timeout = null },
						2000
					);
				}
			}, true);
		}
	}

	nl2br (str) {
		if (typeof str === 'undefined' || str === null) {
		return '';
		}
		var breakTag = '<br>';
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${breakTag}$2`);
	}

}

module.exports = {
	bindings: {
		id: '<'
	},
	controller: [ '$scope', '$ngRedux', LogStreamController ],
	controllerAs: 'vm',
	template: [
		'<div class="logStream" ng-if="vm.content">',
			'<span class="logStream__line" ng-repeat="line in vm.content.spans track by $index" style="{{ line.css }}"ng-bind-html="vm.nl2br(line.text)"></span>',
		'</div>'
	].join('')
}
