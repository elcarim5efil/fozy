
'use strict';

// import proxy from 'http-proxy';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var proxy = _bluebird2.default.promisifyAll(require('http-proxy'));

console.log(proxy);
module.exports = function (option, type) {
    if (typeof option === 'string') {
        option = {
            target: option
        };
    }
    var _proxy = proxy.createProxyServer({});
    _proxy.on('proxyReq', function (proxyReq, req, res, option) {
        // console.log('req..........', proxyReq);
        proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
        // console.log('req..........', proxyReq);
    });
    _proxy.on('proxyRes', function (proxyRes, req, res) {
        // console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
        proxyRes.setHeader('host', '192.168.0.78:9001');
        // console.log('res.....', proxyRes);
    });
    var doProxy = function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx) {
            var req, res, r;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            req = ctx.req, res = ctx.res;

                            ctx.response = false;
                            r = void 0;
                            _context.prev = 3;
                            _context.next = 6;
                            return _proxy.webAsync(req, res, option);

                        case 6:
                            r = _context.sent;

                            console.log(r);
                            _context.next = 13;
                            break;

                        case 10:
                            _context.prev = 10;
                            _context.t0 = _context['catch'](3);

                            console.log('proxy error ', _context.t0);

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[3, 10]]);
        }));

        return function doProxy(_x) {
            return _ref.apply(this, arguments);
        };
    }();
    return function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            doProxy(ctx);

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x2) {
            return _ref2.apply(this, arguments);
        };
    }();
};