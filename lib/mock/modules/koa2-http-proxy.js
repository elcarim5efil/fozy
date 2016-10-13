'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var proxy = require('http-proxy');

module.exports = function (option, type) {
    if (typeof option === 'string') {
        option = {
            target: option
        };
    }
    var _proxy = proxy.createProxyServer({});
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

    if (type === 'generator') {
        return regeneratorRuntime.mark(function _callee() {
            var ctx;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            ctx = this;
                            _context.next = 3;
                            return doProxy(ctx);

                        case 3:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        });
    } else {
        return function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx) {
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

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }();
    }
};