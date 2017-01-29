
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extend = require('../../../util/extend');

var _extend2 = _interopRequireDefault(_extend);

var _proxy = require('./proxy');

var _proxy2 = _interopRequireDefault(_proxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __root = fozy.__root;
var config = require(_path2.default.join(__root, 'fozy.config'));


var proxyConf = config.mock.proxy;
// using proxy api
var mock = (0, _proxy2.default)({
    target: proxyConf.target,
    headers: {
        test: 'test',
        host: proxyConf.host
    }
});

module.exports = mock;