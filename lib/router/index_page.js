
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _fs = require('../../lib/promise/fs.js');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __root = fozy.__root;
var config = fozy.__config;

var IndexPage = function () {
    function IndexPage() {
        _classCallCheck(this, IndexPage);

        this.pageList = null;
        this.html = null;
        this.templatePath = _path2.default.join(__dirname, '../../templates/index.hbs');
    }

    _createClass(IndexPage, [{
        key: 'getRouter',
        value: function getRouter() {
            var _this = this;

            var indexPage = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return _this.respondHtml(ctx, next);

                                case 2:
                                    return _context.abrupt('return', _context.sent);

                                case 3:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function indexPage(_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }();
            return indexPage;
        }
    }, {
        key: 'respondHtml',
        value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.getHtml(ctx, next);

                            case 2:
                                ctx.body = _context2.sent;

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function respondHtml(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return respondHtml;
        }()
    }, {
        key: 'getPageList',
        value: function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!this.pageList) {
                                    if (config.pages && config.pages.length > 0) {
                                        this.pageList = config.pages;
                                    } else {
                                        this.pageList = this.createPageList();
                                    }
                                }
                                return _context3.abrupt('return', this.pageList);

                            case 2:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getPageList() {
                return _ref3.apply(this, arguments);
            }

            return getPageList;
        }()
    }, {
        key: 'getHtml',
        value: function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(ctx, next) {
                var pageList, file, template;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.getPageList();

                            case 2:
                                pageList = _context4.sent;

                                if (this.html) {
                                    _context4.next = 16;
                                    break;
                                }

                                file = void 0;
                                _context4.prev = 5;
                                _context4.next = 8;
                                return _fs2.default.readFileAsync(this.templatePath, 'utf-8');

                            case 8:
                                file = _context4.sent;
                                _context4.next = 14;
                                break;

                            case 11:
                                _context4.prev = 11;
                                _context4.t0 = _context4['catch'](5);
                                return _context4.abrupt('return', next());

                            case 14:
                                template = _handlebars2.default.compile(file);

                                this.html = template({
                                    title: 'Pages Index',
                                    pages: pageList
                                });

                            case 16:
                                return _context4.abrupt('return', this.html);

                            case 17:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[5, 11]]);
            }));

            function getHtml(_x5, _x6) {
                return _ref4.apply(this, arguments);
            }

            return getHtml;
        }()
    }, {
        key: 'createPageList',
        value: function () {
            var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                var p, files, temp, pages;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                p = void 0, files = [], temp = void 0;
                                // templates

                                p = _path2.default.join(__root, config.template.root, config.template.page);
                                _context5.next = 4;
                                return _fs2.default.readdirAsync(p);

                            case 4:
                                temp = _context5.sent;

                                files = files.concat(temp);
                                // views

                                if (!(config.view !== '')) {
                                    _context5.next = 12;
                                    break;
                                }

                                p = _path2.default.join(__root, config.view);
                                _context5.next = 10;
                                return _fs2.default.readdirAsync(p);

                            case 10:
                                temp = _context5.sent;

                                files = files.concat(temp);

                            case 12:
                                pages = files.map(function (item) {
                                    var parts = item.split('.');
                                    parts.splice(parts.length - 1, 1);
                                    var name = parts.join('.');
                                    return { name: name, url: '/' + name };
                                });
                                return _context5.abrupt('return', pages);

                            case 14:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function createPageList() {
                return _ref5.apply(this, arguments);
            }

            return createPageList;
        }()
    }]);

    return IndexPage;
}();

exports.default = IndexPage;