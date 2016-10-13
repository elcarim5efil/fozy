
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var __root = fozy.__root;
var path = require('path');
var config = require(path.join(__root, 'fozy.config'));
var $proxy = require('http-proxy').createProxyServer({});

var proxy = function proxy(opt) {
    return function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
            var req, res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            try {
                                req = ctx.req, res = ctx.res;

                                ctx.response = false;
                                $proxy.web(req, res, {
                                    target: config.mock.proxy
                                });
                            } catch (err) {
                                console.log(err);
                            }

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};
module.exports = proxy;