
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var path = require('path');
var _ = require('../../util/extend');
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
        var JSONProcessor = require('./json.processor.js');
        var requireNew = require('../../util/require_from_new.js');

        mock = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
                var files, data, json, proc;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                files = {};
                                _context.prev = 1;

                                files = getFiles(ctx);
                                // response with mock data
                                _context.next = 5;
                                return fs.readFileAsync(files.json);

                            case 5:
                                data = _context.sent;
                                json = JSON.parse(data);
                                proc = new JSONProcessor({
                                    module: files.js,
                                    preStringify: false
                                });

                                json = proc.process(json, ctx.request.body, qs.parse(ctx.url.split('?')[1]), ctx);

                                ctx.body = json;
                                ctx.type = 'json';
                                _context.next = 20;
                                break;

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context['catch'](1);

                                if (!(files && files.json && fs.existsSync(files.json))) {
                                    _context.next = 19;
                                    break;
                                }

                                console.error('[KS] render error, there may be something wrong with your .json files');
                                _context.next = 20;
                                break;

                            case 19:
                                return _context.abrupt('return', next());

                            case 20:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined, [[1, 13]]);
            }));

            return function mock(_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }();
    })();
}

function getFiles(ctx) {
    var files = {};
    var url = _.removePostfix(ctx.url.split('?')[0]);
    var method = ctx.method.toLocaleLowerCase();
    var r = path.join(__root, config.mock.api.root, method && config.mock.api[method]);
    var fileName = config.mock.fileName;
    if (!fileName) {
        // data.json path
        files.json = path.join(r, url + '.json');
        // data.js path, for processing data.json
        files.js = path.join(r, url + '.js');
    } else {
        // data.json path
        files.json = path.join(r, url, fileName + '.json');
        // data.js path, for processing data.json
        files.js = path.join(r, url, fileName + '.js');
    }
    return files;
}

module.exports = mock;