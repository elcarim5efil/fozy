
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var __root = fozy.__root;
var path = require('path');
var config = require(path.join(__root, 'fozy.config'));
var Freemarker = require('freemarker.js');
var fm = Promise.promisifyAll(new Freemarker({
    viewRoot: path.join(__root, config.template.path),
    options: {
        // outputRoot: path.join(__root, config.template.path, 'TEMP'),
    }
}));
var fm2 = new Freemarker({
    viewRoot: path.join(__root, config.template.path),
    options: {
        // outputRoot: path.join(__root, config.template.path, 'TEMP'),
    }
});

var gp = path.join(__root, config.template.mock, 'global/data.json');
var ftlMachine = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var p, data, gData, json, html;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        p = path.join(__root, config.template.mock, ctx.url + '.json');
                        _context.prev = 1;
                        _context.next = 4;
                        return fs.readFileAsync(p);

                    case 4:
                        data = _context.sent;
                        _context.next = 7;
                        return fs.readFileAsync(gp);

                    case 7:
                        gData = _context.sent;

                        // make json
                        json = JSON.parse(data);

                        json = Object.assign(json, JSON.parse(gData));
                        // render template
                        _context.next = 12;
                        return fm.renderAsync('/pages' + ctx.url + '.ftl', json);

                    case 12:
                        html = _context.sent;

                        ctx.body = html;
                        _context.next = 19;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context['catch'](1);
                        return _context.abrupt('return', next());

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 16]]);
    }));

    return function ftlMachine(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = ftlMachine;