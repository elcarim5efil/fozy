
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _req = require('../promise/req');

var _req2 = _interopRequireDefault(_req);

var _fs = require('../promise/fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdir = require('../promise/mkdir');

var _mkdir2 = _interopRequireDefault(_mkdir);

var _util = require('./util');

var ut = _interopRequireWildcard(_util);

var _extend = require('../util/extend');

var _ = _interopRequireWildcard(_extend);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('babel-polyfill');

var __root = fozy.__root;

var Nei = function () {
    function Nei(key) {
        _classCallCheck(this, Nei);

        this.neiHost = 'https://nei.netease.com';
        this.specType = 0;
        this.key = key || '';
        this.url = this.neiHost + '/api/projectres/?key=' + encodeURIComponent(this.key) + '&spectype=' + this.specType;
        this.neiConfig = {};
        this.fozyConfig = {};
        this.asyncDataList = {};
        console.log(this.url);
    }

    _createClass(Nei, [{
        key: 'build',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.loadConfig();

                            case 2:
                                console.log('NEI configuration loaded, building fozy.config.js...');

                                this.getFozyConfig();
                                // await this.buildFozyConfigFile( this.fozyConfig );
                                // console.log('fozy.config.js build success, path: ' +  path.join(__root, './fozy.config.js'));

                                this.getAsyncDataList();
                                console.log(this.asyncDataList);
                                _context.next = 8;
                                return this.buildAsyncDataFiles(this.asyncDataList);

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function build() {
                return _ref.apply(this, arguments);
            }

            return build;
        }()
    }, {
        key: 'loadConfig',
        value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(cb) {
                var json;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;

                                console.log('Loading NEI configuration...');
                                _context2.next = 4;
                                return (0, _req2.default)({
                                    url: this.url
                                });

                            case 4:
                                json = _context2.sent;

                                this.processJson(json);
                                _context2.next = 11;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](0);

                                console.log('NEI configuration download error: ', _context2.t0);

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 8]]);
            }));

            function loadConfig(_x) {
                return _ref2.apply(this, arguments);
            }

            return loadConfig;
        }()
    }, {
        key: 'processJson',
        value: function processJson(json) {
            var data = {};
            data = JSON.parse(json.toJSON().body);
            if (data.code !== 200) {
                throw data;
            } else {
                this.neiConfig = data.result;
            }
        }
    }, {
        key: 'getFozyConfig',
        value: function getFozyConfig() {
            return this.fozyConfig = ut.getFozyConfig(this.neiConfig);
        }
    }, {
        key: 'getAsyncDataList',
        value: function getAsyncDataList() {
            return this.asyncDataList = ut.getAsyncDataList(this.neiConfig);
        }
    }, {
        key: 'buildFozyConfigFile',
        value: function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(config) {
                var confTpl, file, template, output;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                confTpl = _path2.default.join(__dirname, '../../templates/config.hbs');
                                file = void 0;
                                _context3.prev = 2;
                                _context3.next = 5;
                                return _fs2.default.readFileAsync(confTpl, 'utf-8');

                            case 5:
                                file = _context3.sent;
                                _context3.next = 12;
                                break;

                            case 8:
                                _context3.prev = 8;
                                _context3.t0 = _context3['catch'](2);

                                console.log('constuct error', _context3.t0);
                                return _context3.abrupt('return');

                            case 12:
                                template = _handlebars2.default.compile(file);
                                output = template(config);
                                _context3.prev = 14;
                                _context3.next = 17;
                                return _fs2.default.writeFileAsync('./fozy.config.js', output);

                            case 17:
                                _context3.next = 22;
                                break;

                            case 19:
                                _context3.prev = 19;
                                _context3.t1 = _context3['catch'](14);

                                console.log(_context3.t1);

                            case 22:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[2, 8], [14, 19]]);
            }));

            function buildFozyConfigFile(_x2) {
                return _ref3.apply(this, arguments);
            }

            return buildFozyConfigFile;
        }()
    }, {
        key: 'buildAsyncDataFiles',
        value: function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(asyncDataList) {
                var _this = this;

                var asyncMockRoot;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                asyncMockRoot = this.fozyConfig.asyncMockRoot;

                                asyncDataList.forEach(function () {
                                    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(asyncData, index) {
                                        var asyncDataPath;
                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        asyncDataPath = _path2.default.join(asyncMockRoot, asyncData.method, asyncData.path);
                                                        _context4.next = 3;
                                                        return _this.createAsyncDataFile(asyncDataPath, 'data');

                                                    case 3:
                                                    case 'end':
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee4, _this);
                                    }));

                                    return function (_x4, _x5) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }());

                            case 2:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function buildAsyncDataFiles(_x3) {
                return _ref4.apply(this, arguments);
            }

            return buildAsyncDataFiles;
        }()
    }, {
        key: 'createAsyncDataFile',
        value: function () {
            var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(filePath, fileName) {
                var parts;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (!fileName) {
                                    parts = filePath.split(_path2.default.sep);

                                    fileName = parts.unshift();
                                    filePath = parts.join(_path2.default.sep);
                                }

                                _context6.prev = 1;
                                _context6.next = 4;
                                return (0, _mkdir2.default)(filePath, fileName);

                            case 4:
                                _context6.next = 8;
                                break;

                            case 6:
                                _context6.prev = 6;
                                _context6.t0 = _context6['catch'](1);

                            case 8:
                                _context6.prev = 8;
                                _context6.next = 11;
                                return _fs2.default.writeFileAsync(_path2.default.join(filePath, fileName + '.json'), '{}');

                            case 11:
                                _context6.next = 15;
                                break;

                            case 13:
                                _context6.prev = 13;
                                _context6.t1 = _context6['catch'](8);

                            case 15:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[1, 6], [8, 13]]);
            }));

            function createAsyncDataFile(_x6, _x7) {
                return _ref6.apply(this, arguments);
            }

            return createAsyncDataFile;
        }()
    }]);

    return Nei;
}();

module.exports = Nei;