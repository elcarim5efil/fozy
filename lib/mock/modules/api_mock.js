
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var path = require('path');
var __root = fozy.__root;
var config = require(path.join(__root, 'fozy.config'));
var mock = void 0;

if (config.mock.proxy) {
    console.log('[KS] using proxy api: ' + config.mock.proxy);
    var $proxy = require('koa2-http-proxy');
    mock = $proxy(config.mock.proxy);
} else {
    (function () {
        console.log('[KS] using local api');
        var Promise = require('bluebird');
        var fs = Promise.promisifyAll(require('fs'));
        var qs = require('querystring');
        var requireNew = require('../requireNew.js');
        mock = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
                var url, p, pjs, process, body, query, data, json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                url = ctx.url.split('?')[0];
                                p = path.join(__root, config.mock.api, ctx.method.toLowerCase(), url, 'data.json');
                                pjs = path.join(__root, config.mock.api, ctx.method.toLowerCase(), url, 'data.js');
                                process = undefined;
                                body = ctx.request.body, query = qs.parse(ctx.url.split('?')[1]);
                                _context.prev = 5;
                                _context.next = 8;
                                return fs.readFileAsync(pjs);

                            case 8:
                                process = requireNew(pjs);
                                _context.next = 13;
                                break;

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context['catch'](5);

                            case 13:
                                _context.prev = 13;
                                _context.next = 16;
                                return fs.readFileAsync(p);

                            case 16:
                                data = _context.sent;
                                json = JSON.parse(data);

                                ctx.body = typeof process === 'function' ? process(json, body, query) : json;
                                ctx.type = 'json';
                                _context.next = 25;
                                break;

                            case 22:
                                _context.prev = 22;
                                _context.t1 = _context['catch'](13);
                                return _context.abrupt('return', next());

                            case 25:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined, [[5, 11], [13, 22]]);
            }));

            return function mock(_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }();
    })();
}

module.exports = mock;