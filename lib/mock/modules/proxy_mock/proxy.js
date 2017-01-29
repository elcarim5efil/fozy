
'use strict';

var _httpProxy = require('http-proxy');

var _httpProxy2 = _interopRequireDefault(_httpProxy);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (option, type) {
    if (typeof option === 'string') {
        option = {
            target: option
        };
    }
    var _proxy = _httpProxy2.default.createProxyServer({});

    _proxy.on('proxyReq', function (proxyReq, req, res, option) {
        // console.log('req..........', proxyReq);
        // proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
        // console.log('req..........', req);
    });
    _proxy.on('proxyRes', function (proxyRes, req, res) {
        // console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 3));
        // console.log('res.....', req, res);
        if (res.statusCode !== 302) {
            // console.log('not 302');
            // res.setHeader('host', req.headers.host);
        }
    });
    var doProxy = function doProxy(ctx) {
        var req = ctx.req,
            res = ctx.res;
        ctx.response = false;
        try {
            _proxy.web(req, res, option);
        } catch (err) {
            console.log('proxy error ', err);
        }
    };
    return function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            doProxy(ctx);

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
};