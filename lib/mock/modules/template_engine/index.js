
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('../../../promise/fs');

var _fs2 = _interopRequireDefault(_fs);

var _extend = require('../../../util/extend');

var _extend2 = _interopRequireDefault(_extend);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _jsonProcessor = require('../../../util/json.processor.js');

var _jsonProcessor2 = _interopRequireDefault(_jsonProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var __root = fozy.__root;
var config = require(_path2.default.join(__root, 'fozy.config'));

var globalJsonPath = _path2.default.join(__root, config.template.mock, '__global/data.json');

var engine = void 0;

var tplEngine = function tplEngine(option) {
    var fileType = '';
    if (option.engine == 'ftl') {
        engine = require('../../../engine/freemarker')({
            viewRoot: _path2.default.join(__root, config.template.root || ''),
            options: {
                // sourceEncoding: 'UTF-8',
            }
        });
        fileType = '.ftl';
    }
    return function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
            var files, data, gData, json, isSyncDataExist, proc, html;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            files = getFiles(ctx, fileType);

                            if (files.isTplExist) {
                                _context.next = 3;
                                break;
                            }

                            return _context.abrupt('return', next());

                        case 3:

                            // template mock data
                            data = void 0, gData = void 0, json = void 0, isSyncDataExist = void 0;
                            _context.prev = 4;
                            _context.next = 7;
                            return _fs2.default.readFileAsync(files.json, 'utf-8');

                        case 7:
                            data = _context.sent;

                            if (isSyncDataExist = _fs2.default.existsSync(files.json)) {}
                            // string -> json
                            json = JSON.parse(data);
                            // global template mock data

                            if (!(isSyncDataExist = _fs2.default.existsSync(globalJsonPath))) {
                                _context.next = 14;
                                break;
                            }

                            _context.next = 13;
                            return _fs2.default.readFileAsync(globalJsonPath, 'utf-8');

                        case 13:
                            gData = _context.sent;

                        case 14:
                            // combine with global data
                            json = Object.assign(JSON.parse(gData), json);
                            _context.next = 20;
                            break;

                        case 17:
                            _context.prev = 17;
                            _context.t0 = _context['catch'](4);

                            if (isSyncDataExist) {
                                console.info('[KS] mock data parse error, check your template .json files, url: ' + ctx.url);
                            }

                        case 20:

                            // process mock data with external js or stringify the specific object
                            proc = new _jsonProcessor2.default({
                                module: files.js,
                                preStringify: true
                            });


                            json = proc.process(json || {}, ctx.request.body, _querystring2.default.parse(ctx.url.split('?')[1]), ctx);

                            // render template end return html
                            _context.prev = 22;
                            _context.next = 25;
                            return engine.render(files.tpl, json || {});

                        case 25:
                            html = _context.sent;

                            ctx.body = html;
                            _context.next = 32;
                            break;

                        case 29:
                            _context.prev = 29;
                            _context.t1 = _context['catch'](22);

                            console.error('[KS] render error, please check your template files and json files');

                        case 32:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[4, 17], [22, 29]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};

// get the template mock data file path according to the config.pages
function getFiles(ctx, fileType) {
    var files = {
        isTplExist: false
    };

    if (config.pages && config.pages.length > 0) {
        files.tpl = getPathByUrl(_extend2.default.removeQueryString(ctx.url));
        files.path = _extend2.default.removePostfix(files.tpl);
        if (files.tpl === -1) {
            return files;
        }
    } else {
        files.tpl = ctx.url + fileType;
    }

    files.json = _path2.default.join(__root, config.template.mock || '', (files.path || ctx.url) + '.json');
    files.js = _path2.default.join(__root, config.template.mock || '', (files.path || ctx.url) + '.js');
    files.tpl = _path2.default.join(config.template.page || '', files.tpl);
    files.isTplExist = _fs2.default.existsSync(_path2.default.join(__root, config.template.root || '', files.tpl));
    return files;
}

/**
 * get path by url in the config.pages
 * @param  {string} url matching url
 * @return {string/number}     path, -1: not found
 */
function getPathByUrl(url) {
    var res = -1;
    _extend2.default.which(config.pages, function (item) {
        if (item.url === url) {
            res = item.path;
            return true;
        }
    });
    return res;
}

module.exports = tplEngine;