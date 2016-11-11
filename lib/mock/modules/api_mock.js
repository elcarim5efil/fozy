
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
                var url, method, r, fileName, p, pjs, process, data, json, body, query;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                // url whithout tail
                                url = removePostfix(ctx.url.split('?')[0]);
                                method = ctx.method.toLocaleLowerCase();
                                r = path.join(__root, config.mock.api.root, method && config.mock.api[method]);
                                fileName = config.mock.fileName;
                                p = void 0, pjs = void 0;

                                if (!fileName) {
                                    // data.json path
                                    p = path.join(r, url + '.json');
                                    // data.js path, for processing data.json
                                    pjs = path.join(r, url + '.js');
                                } else {
                                    // data.json path
                                    p = path.join(r, url, fileName + '.json');
                                    // data.js path, for processing data.json
                                    pjs = path.join(r, url, fileName + '.js');
                                }

                                // console.log(p, pjs);

                                // get process function
                                process = undefined;
                                _context.prev = 7;
                                _context.next = 10;
                                return fs.readFileAsync(pjs);

                            case 10:
                                process = requireNew(pjs);
                                _context.next = 15;
                                break;

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context['catch'](7);

                            case 15:
                                _context.prev = 15;
                                _context.next = 18;
                                return fs.readFileAsync(p);

                            case 18:
                                data = _context.sent;
                                json = JSON.parse(data), body = ctx.request.body, query = qs.parse(ctx.url.split('?')[1]);

                                ctx.body = typeof process === 'function' ? process(json, body, query) : json;
                                ctx.type = 'json';
                                _context.next = 27;
                                break;

                            case 24:
                                _context.prev = 24;
                                _context.t1 = _context['catch'](15);
                                return _context.abrupt('return', next());

                            case 27:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined, [[7, 13], [15, 24]]);
            }));

            return function mock(_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }();
    })();
}

/**
 * remove postfix from the path, '/mock/demo.ftl' => '/mock/demo'
 * @param  {string} path path string
 * @return {string}      path without postfix
 */
function removePostfix(path) {
    if (typeof path !== 'string') {
        return;
    }
    var p = path.split('.');
    if (p.length > 1) {
        p.splice(p.length - 1, 1);
    }
    return p.join('.');
}

module.exports = mock;