
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extend = require('../../../util/extend');

var _extend2 = _interopRequireDefault(_extend);

var _sync_data = require('./sync_data.js');

var _sync_data2 = _interopRequireDefault(_sync_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var __root = fozy.__root;
var config = require(_path2.default.join(__root, 'fozy.config'));
var templateRoot = _path2.default.join(__root, config.template.root || '');

var engine = void 0;

var tplEngine = function tplEngine(option) {
    var fileType = '';
    if (option.engine === 'ftl') {
        engine = require('../../../engine/freemarker')({
            viewRoot: templateRoot,
            options: {
                // sourceEncoding: 'UTF-8',
            }
        });
        fileType = '.ftl';
    }
    return function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
            var tplPath, isTplExist, json, html;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            tplPath = getPathByUrl(_extend2.default.removeQueryString(ctx.url));
                            isTplExist = tplPath !== -1 && _extend2.default.isFileExist(_path2.default.join(templateRoot, tplPath));

                            if (isTplExist) {
                                _context.next = 4;
                                break;
                            }

                            return _context.abrupt('return', next());

                        case 4:
                            json = new _sync_data2.default({
                                ctx: ctx,
                                fileType: fileType,
                                path: _extend2.default.removePostfix(tplPath)
                            }).getData();
                            _context.prev = 5;
                            _context.next = 8;
                            return engine.render(tplPath, json || {});

                        case 8:
                            html = _context.sent;

                            ctx.body = html;
                            _context.next = 15;
                            break;

                        case 12:
                            _context.prev = 12;
                            _context.t0 = _context['catch'](5);

                            console.error('[KS] render error, please check your template files and json files');

                        case 15:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[5, 12]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};

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

exports.default = tplEngine;