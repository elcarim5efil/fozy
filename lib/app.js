
'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaJson = require('koa-json');

var _koaJson2 = _interopRequireDefault(_koaJson);

var _koaOnerror = require('koa-onerror');

var _koaOnerror2 = _interopRequireDefault(_koaOnerror);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var bodyparser = (0, _koaBodyparser2.default)();
var app = new _koa2.default();
var __root = fozy.__root;
var config = fozy.__config;

if (!config.mock.proxy) {
    app.use((0, _koaConvert2.default)(bodyparser));
}
app.use((0, _koaConvert2.default)((0, _koaJson2.default)()));
if (config.logMode) {
    app.use((0, _koaConvert2.default)((0, _koaLogger2.default)()));
}

// setup live reload
if (global.fozy.__dev.watch) {
    app.use(require('./live_reload'));
}

// static files
config.resource.forEach(function (item) {
    var staticFilePath = _path2.default.join(__root, item);
    var staticRoute = (0, _koaConvert2.default)(require('koa-static')(staticFilePath));
    app.use(staticRoute);
});

// logger
app.use(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var start, ms;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        start = new Date();
                        _context.next = 3;
                        return next();

                    case 3:
                        ms = new Date() - start;

                        console.log('[KS] ' + ctx.method + ' ' + ctx.url + ' - ' + ms + 'ms');

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

app.use(_router2.default.routes(), _router2.default.allowedMethods());

app.on('error', function (err, ctx) {
    console.log(err);
    _koaLogger2.default.error('[KS] Server error', err, ctx);
});

module.exports = app;