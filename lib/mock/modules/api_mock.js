
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extend = require('../../util/extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __root = fozy.__root;
var config = fozy.__config;
var proxyConf = config.mock.proxy;
var mock = void 0;

if (config.mock.proxy) {
    console.log('[KS] using proxy api: ' + proxyConf.target);
    mock = require('./proxy_mock');
} else {
    console.log('[KS] using local api');
    mock = require('./local_mock');
}

module.exports = mock;