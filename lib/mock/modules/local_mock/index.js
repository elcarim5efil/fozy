
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extend = require('../../../util/extend');

var _extend2 = _interopRequireDefault(_extend);

var _fs = require('../../../promise/fs');

var _fs2 = _interopRequireDefault(_fs);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _jsonProcessor = require('../../../util/json.processor.js');

var _jsonProcessor2 = _interopRequireDefault(_jsonProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var __root = fozy.__root;
var config = require(_path2.default.join(__root, 'fozy.config'));

// using local api

var mock = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var files, isJsFileExists, isJsonFileExists, data, json, proc;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        files = {};
                        isJsFileExists = void 0, isJsonFileExists = void 0;
                        _context.prev = 2;
                        data = void 0, json = void 0;

                        files = getFiles(ctx);
                        isJsFileExists = _fs2.default.existsSync(files.js);
                        isJsonFileExists = _fs2.default.existsSync(files.json);
                        // response with mock data

                        if (!(!isJsFileExists && !isJsonFileExists)) {
                            _context.next = 9;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 9:
                        if (!isJsonFileExists) {
                            _context.next = 13;
                            break;
                        }

                        _context.next = 12;
                        return _fs2.default.readFileAsync(files.json);

                    case 12:
                        data = _context.sent;

                    case 13:

                        json = JSON.parse(data || '{}');

                        proc = new _jsonProcessor2.default({
                            module: files.js,
                            preStringify: false
                        });

                        json = proc.process(json || {}, ctx.request.body, _querystring2.default.parse(ctx.url.split('?')[1]), ctx);

                        ctx.body = json;
                        ctx.type = 'json';
                        _context.next = 27;
                        break;

                    case 20:
                        _context.prev = 20;
                        _context.t0 = _context['catch'](2);

                        if (!(isJsFileExists || isJsonFileExists)) {
                            _context.next = 26;
                            break;
                        }

                        console.error('[KS] mock data error, there may be something wrong with your .json files, url: ' + ctx.url);
                        _context.next = 27;
                        break;

                    case 26:
                        return _context.abrupt('return', next());

                    case 27:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 20]]);
    }));

    return function mock(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

function getFiles(ctx) {
    var files = {};
    var url = _extend2.default.removePostfix(ctx.url.split('?')[0]);
    var method = ctx.method.toLocaleLowerCase();
    var r = _path2.default.join(__root, config.mock.api.root, method && config.mock.api[method]);
    var fileName = config.mock.fileName;
    if (!fileName) {
        // data.json path
        files.json = _path2.default.join(r, url + '.json');
        // data.js path, for processing data.json
        files.js = _path2.default.join(r, url + '.js');
    } else {
        // data.json path
        files.json = _path2.default.join(r, url, fileName + '.json');
        // data.js path, for processing data.json
        files.js = _path2.default.join(r, url, fileName + '.js');
    }
    return files;
}

module.exports = mock;