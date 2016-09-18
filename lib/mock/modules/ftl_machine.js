
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Promise = require('bluebird');
var __root = fozy.__root;
var path = require('path');
var Freemarker = require('freemarker.js');

var config = require(path.join(__root, 'fozy.config'));
var fs = Promise.promisifyAll(require('fs'));
var fm = Promise.promisifyAll(new Freemarker({
    viewRoot: path.join(__root, config.template.root || ''),
    options: {}
}));

var gp = path.join(__root, config.template.mock, 'global/data.json');

var ftlMachine = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var p, tpl, data, gData, json, html;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        p = path.join(__root, config.template.mock || '', ctx.url + '.json');
                        tpl = void 0;

                        if (!(config.pages && config.pages.length > 0)) {
                            _context.next = 8;
                            break;
                        }

                        tpl = getPathByUrl(ctx.url);

                        if (!(tpl === -1)) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 6:
                        _context.next = 9;
                        break;

                    case 8:
                        tpl = ctx.url + '.ftl';

                    case 9:

                        tpl = path.join(config.template.page || '', tpl);

                        data = void 0, gData = void 0, json = void 0, html = void 0;
                        // page ftl mock data

                        _context.prev = 11;
                        _context.next = 14;
                        return fs.readFileAsync(p);

                    case 14:
                        data = _context.sent;
                        _context.next = 20;
                        break;

                    case 17:
                        _context.prev = 17;
                        _context.t0 = _context['catch'](11);
                        return _context.abrupt('return', next());

                    case 20:
                        _context.prev = 20;
                        _context.next = 23;
                        return fs.readFileAsync(gp);

                    case 23:
                        gData = _context.sent;
                        _context.next = 28;
                        break;

                    case 26:
                        _context.prev = 26;
                        _context.t1 = _context['catch'](20);

                    case 28:

                        // make json
                        json = JSON.parse(data);
                        if (gData) {
                            json = Object.assign(json, JSON.parse(gData));
                        }

                        // render template
                        _context.prev = 30;
                        _context.next = 33;
                        return fm.renderAsync(tpl, json);

                    case 33:
                        html = _context.sent;

                        ctx.body = html;
                        _context.next = 41;
                        break;

                    case 37:
                        _context.prev = 37;
                        _context.t2 = _context['catch'](30);

                        console.error('[KS] render error');
                        return _context.abrupt('return', next());

                    case 41:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[11, 17], [20, 26], [30, 37]]);
    }));

    return function ftlMachine(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

function getPathByUrl(url) {
    var p = config.pages;
    for (var i = 0, len = p.length; i < len; ++i) {
        if (p[i].url === url) {
            return p[i].path;
        }
    }
    return -1;
}

module.exports = ftlMachine;