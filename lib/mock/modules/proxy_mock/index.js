
'use strict';

var _proxy = require('./proxy');

var _proxy2 = _interopRequireDefault(_proxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var proxyConf = fozy.__config.mock.proxy;

// using proxy api
var mock = (0, _proxy2.default)({
    target: proxyConf.target,
    changeOrigin: true,
    autoRewrite: true,
    // cookieDomainRewrite: '',
    headers: {
        // test: 'test',
        host: proxyConf.host
    }
});

module.exports = mock;