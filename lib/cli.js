
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cli = function () {
    function Cli() {
        _classCallCheck(this, Cli);

        this.handlers = [];
        this.maps = {};
        this.default = '-h';
        this.normal = function () {};
    }

    _createClass(Cli, [{
        key: 'on',
        value: function on(argvs, handler) {
            var _this = this;

            argvs.forEach(function (item) {
                _this.maps[item] = handler;
            }.bind(this));
        }
    }, {
        key: 'run',
        value: function run(argvs) {
            if (argvs.length === 0) {
                this.normal();
                return;
            };

            for (var i = 0, len = argvs.length; i < len;) {
                var arg = void 0,
                    handler = this.maps[argvs[i]];
                if (handler !== undefined) {
                    if (!/^\-{1,2}/.test(argvs[i + 1])) {
                        arg = argvs[++i];
                    }
                    handler.call(null, arg);
                    ++i;
                } else {
                    console.log(argvs[i] + ' is invalid, please use -h or --help for help');
                    this.run(['-h']);
                    return;
                }
            }
        }
    }]);

    return Cli;
}();

module.exports = Cli;