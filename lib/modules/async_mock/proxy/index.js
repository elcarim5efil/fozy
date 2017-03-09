
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _proxy = require('./proxy');

var _proxy2 = _interopRequireDefault(_proxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.config = fozy.__config.mock.proxy;
        this.headers = {
            'accept-encoding': 'gzip;q=0,deflate,sdch,br'
        };
    }

    _createClass(_class, [{
        key: 'getMocker',
        value: function getMocker() {
            var config = this.config;

            var option = {
                target: config.target,
                headers: this.headers
            };

            if (config.host) {
                option.host = config.host;
            }
            return (0, _proxy2.default)(option);
        }
    }]);

    return _class;
}();

exports.default = _class;