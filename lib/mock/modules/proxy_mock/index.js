
'use strict';

var _proxy = require('./proxy');

var _proxy2 = _interopRequireDefault(_proxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var proxyConf = fozy.__config.mock.proxy;

// using proxy api
var option = {
    target: proxyConf.target,
    // changeOrigin: true,
    // autoRewrite: true,
    // cookieDomainRewrite: 'localhost:9000',
    headers: {
        // test: 'test',
        // host: proxyConf.host,
        'accept-encoding': 'gzip;q=0,deflate,sdch,br'
    }
};

if (proxyConf.host) {
    option.host = proxyConf.host;
}
var mock = (0, _proxy2.default)(option);

module.exports = mock;