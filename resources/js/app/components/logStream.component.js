const ansi = require('ansicolor');
const { first } = require('lodash');
const { openStream, closeStream, updateStream } = require('app/actions/stream');

ansi.rgb = {
	black:        [ 43,  49,  53],
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

		$ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this)
	}

	mapStateToThis({ stream, tests: { tests, activeTest } }) {
		return {
			stream: stream[activeTest] ? stream[activeTest] : null,
			test: first(tests, { activeTest }),
			content: stream[activeTest] && stream[activeTest]['content'] ? ansi.parse(stream[activeTest]['content']) : null,
			activeTest
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
		this.initStream();

		this.$scope.$watch(() => this.activeTest, () => {
			this.initStream();
		});
	}

	nl2br (str) {
		if (typeof str === 'undefined' || str === null) {
		return '';
		}
		var breakTag = '<br>';
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${breakTag}$2`);
	}

	initStream() {
		if (this.activeTest) {
			if (this.updateWatch) {
				this.updateWatch();
			}

			if (!this.stream) {
				this.openStream(this.activeTest);
			}

			this.$scope.$watch(() => this.test.running, () => {
				if (!this.test.running) {
					this.updateStream(this.activeTest);
					this.closeStream(this.activeTest);
				}
			}, true);

			this.updateWatch = this.$scope.$watch(() => this.stream['updating'], () => {
				if (!this.stream.updating && this.stream.open && !this.timeout) {
					this.timeout = setTimeout(
						() => {
							this.updateStream(this.activeTest);
							if (!this.test.running) {
								this.timeout = null;
							}
						},
						100
					);
				}
			}, true);
		}
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
