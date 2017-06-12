
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

var _extend = require('../../util/extend');

var _extend2 = _interopRequireDefault(_extend);

var _jsonProcessor = require('../../util/json.processor.js');

var _jsonProcessor2 = _interopRequireDefault(_jsonProcessor);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _local_data = require('./local_data');

var _local_data2 = _interopRequireDefault(_local_data);

var _global_sync_data = require('./global_sync_data');

var _global_sync_data2 = _interopRequireDefault(_global_sync_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __root = fozy.__root;
var config = fozy.__config;

var MockData = function () {
    function MockData(option) {
        _classCallCheck(this, MockData);

        this.ctx = option.ctx || {};
        this.fileType = option.fileType || '.json';
        this.path = option.path || '';
        this.pageDataPath = _path3.default.join(__root, config.template.mock || '', this.path || this.ctx.url);
        this.data;
    }

    _createClass(MockData, [{
        key: 'getData',
        value: function getData() {
            return this.data || this.updateData();
        }
    }, {
        key: 'updateData',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var data, globalData, pageData;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                data = void 0;
                                _context.prev = 1;
                                _context.next = 4;
                                return new _global_sync_data2.default().getData();

                            case 4:
                                globalData = _context.sent;
                                _context.next = 7;
                                return new _local_data2.default({
                                    path: this.pageDataPath
                                }).getData();

                            case 7:
                                pageData = _context.sent;

                                data = Object.assign({}, globalData, pageData);
                                _context.next = 14;
                                break;

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context['catch'](1);

                                console.info('[KS] mock data parse error, check your template .json files, url: ' + this.ctx.url);

                            case 14:
                                return _context.abrupt('return', this.processData(data));

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 11]]);
            }));

            function updateData() {
                return _ref.apply(this, arguments);
            }

            return updateData;
        }()
    }, {
        key: 'processData',
        value: function processData(data) {
            var ctx = this.ctx;
            var proc = new _jsonProcessor2.default({
                module: this.path + '.js',
                preStringify: true
            });

            return proc.process(data, ctx.request.body, _querystring2.default.parse(ctx.url.split('?')[1]), ctx);
        }
    }]);

    return MockData;
}();

exports.default = MockData;