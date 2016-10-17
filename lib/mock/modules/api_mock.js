
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var path = require('path');
var __root = fozy.__root;
var config = require(path.join(__root, 'fozy.config'));
var mock = void 0;

if (config.mock.proxy) {
    // using proxy api
    console.log('[KS] using proxy api: ' + config.mock.proxy);
    var $proxy = require('koa2-http-proxy');
    mock = $proxy(config.mock.proxy);
} else {
    (function () {

        // using local api
        console.log('[KS] using local api');

        var fs = require('../../promise/fs');
        var qs = require('querystring');
        var requireNew = require('../../util/require_from_new.js');

        mock = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
                var url, p, pjs, process, data, json, body, query;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                // url whithout tail
                                url = ctx.url.split('?')[0];

                                // data.json path

                                p = path.join(__root, config.mock.api, ctx.method.toLowerCase(), url, 'data.json');

                                // data.js path, for processing data.json

                                pjs = path.join(__root, config.mock.api, ctx.method.toLowerCase(), url, 'data.js');

                                // get process function

                                process = undefined;
                                _context.prev = 4;
                                _context.next = 7;
                                return fs.readFileAsync(pjs);

                            case 7:
                                process = requireNew(pjs);
                                _context.next = 12;
                                break;

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context['catch'](4);

                            case 12:
                                _context.prev = 12;
                                _context.next = 15;
                                return fs.readFileAsync(p);

                            case 15:
                                data = _context.sent;
                                json = JSON.parse(data), body = ctx.request.body, query = qs.parse(ctx.url.split('?')[1]);

                                ctx.body = typeof process === 'function' ? process(json, body, query) : json;
                                ctx.type = 'json';
                                _context.next = 24;
                                break;

                            case 21:
                                _context.prev = 21;
                                _context.t1 = _context['catch'](12);
                                return _context.abrupt('return', next());

                            case 24:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined, [[4, 10], [12, 21]]);
            }));

            return function mock(_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }();
    })();
}

module.exports = mock;