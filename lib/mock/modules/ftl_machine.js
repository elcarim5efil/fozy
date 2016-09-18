
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var __root = fozy.__root;
var path = require('path');
var config = require(path.join(__root, 'fozy.config'));
var Freemarker = require('freemarker.js');
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
                        tpl = path.join(config.template.page || '', ctx.url + '.ftl');
                        data = void 0, gData = void 0, json = void 0, html = void 0;

                        // page ftl mock data

                        _context.prev = 3;
                        _context.next = 6;
                        return fs.readFileAsync(p);

                    case 6:
                        data = _context.sent;
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](3);
                        return _context.abrupt('return', next());

                    case 12:
                        _context.prev = 12;
                        _context.next = 15;
                        return fs.readFileAsync(gp);

                    case 15:
                        gData = _context.sent;
                        _context.next = 20;
                        break;

                    case 18:
                        _context.prev = 18;
                        _context.t1 = _context['catch'](12);

                    case 20:

                        // make json
                        json = JSON.parse(data);
                        if (gData) {
                            json = Object.assign(json, JSON.parse(gData));
                        }

                        // render template
                        _context.prev = 22;
                        _context.next = 25;
                        return fm.renderAsync(tpl, json);

                    case 25:
                        html = _context.sent;

                        ctx.body = html;
                        _context.next = 33;
                        break;

                    case 29:
                        _context.prev = 29;
                        _context.t2 = _context['catch'](22);

                        console.error('[KS] render error');
                        return _context.abrupt('return', next());

                    case 33:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[3, 9], [12, 18], [22, 29]]);
    }));

    return function ftlMachine(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = ftlMachine;