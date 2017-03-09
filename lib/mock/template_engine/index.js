
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extend = require('../../../util/extend');

var _extend2 = _interopRequireDefault(_extend);

var _data = require('../data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __root = fozy.__root;
var config = fozy.__config;
var templateRoot = _path2.default.join(__root, config.template.root || '');

var Engine = function () {
    function Engine(option) {
        _classCallCheck(this, Engine);

        this.pages = config.pages;
        if (option.engine === 'ftl') {
            this.createEngine(option);
            this.fileType = '.ftl';
        }
    }

    _createClass(Engine, [{
        key: 'createEngine',
        value: function createEngine(option) {
            this.engine = require('../../../engine/freemarker')({
                viewRoot: templateRoot,
                options: {
                    // sourceEncoding: 'UTF-8',
                }
            });

            return this.engine;
        }
    }, {
        key: 'getEngine',
        value: function getEngine(option) {
            var _this = this;

            return function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
                    var tplPath, json;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    tplPath = _this.getPathByUrl(_extend2.default.removeQueryString(ctx.url));

                                    if (_this.isTplFileExist(tplPath)) {
                                        _context.next = 3;
                                        break;
                                    }

                                    return _context.abrupt('return', next());

                                case 3:
                                    json = _this.getSyncData(ctx, tplPath);
                                    _context.next = 6;
                                    return _this.respondHtml(ctx, json, tplPath);

                                case 6:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }();
        }
    }, {
        key: 'getPathByUrl',
        value: function getPathByUrl(url) {
            var res = -1;
            _extend2.default.which(config.pages, function (item) {
                if (item.url === url) {
                    res = item.path;
                    return true;
                }
            });
            return res;
        }
    }, {
        key: 'isTplFileExist',
        value: function isTplFileExist(tplPath) {
            return tplPath !== -1 && _extend2.default.isFileExist(_path2.default.join(templateRoot, tplPath));
        }
    }, {
        key: 'getSyncData',
        value: function getSyncData(ctx, tplPath) {
            return new _data.SyncData({
                ctx: ctx,
                fileType: this.fileType,
                path: _extend2.default.removePostfix(tplPath)
            }).getData();
        }
    }, {
        key: 'respondHtml',
        value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, json, tplPath) {
                var html;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                html = '';
                                _context2.prev = 1;
                                _context2.next = 4;
                                return this.engine.render(tplPath, json || {});

                            case 4:
                                html = _context2.sent;
                                _context2.next = 11;
                                break;

                            case 7:
                                _context2.prev = 7;
                                _context2.t0 = _context2['catch'](1);

                                html = '[KS] render error, please check your template files and json files';
                                console.error('[KS] render error, please check your template files and json files');

                            case 11:
                                ctx.body = html;

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[1, 7]]);
            }));

            function respondHtml(_x3, _x4, _x5) {
                return _ref2.apply(this, arguments);
            }

            return respondHtml;
        }()
    }]);

    return Engine;
}();

exports.default = Engine;