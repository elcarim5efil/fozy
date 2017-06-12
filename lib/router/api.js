
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extend = require('../util/extend');

var _extend2 = _interopRequireDefault(_extend);

var _async_mock = require('../modules/async_mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __root = fozy.__root;
var config = fozy.__config;
var proxyConf = config.mock._proxy;

var Api = function () {
    function Api() {
        _classCallCheck(this, Api);

        if (proxyConf) {
            console.log('[KS] using proxy api: ' + proxyConf.target);
            this.mock = new _async_mock.Proxy().getMocker();
        } else {
            console.log('[KS] using local api');
            this.mock = new _async_mock.Local().getMocker();
        }
    }

    _createClass(Api, [{
        key: 'getRouter',
        value: function getRouter() {
            return this.mock;
        }
    }]);

    return Api;
}();

exports.default = Api;