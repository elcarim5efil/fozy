
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
        var tpl, pageFile, data, gData, json, html, p;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        tpl = void 0, pageFile = void 0;

                        if (!(config.pages && config.pages.length > 0)) {
                            _context.next = 8;
                            break;
                        }

                        tpl = getPathByUrl(ctx.url);
                        // console.log(tpl);
                        pageFile = removePostfix(tpl);

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
                        p = path.join(__root, config.template.mock || '', (pageFile || ctx.url) + '.json');

                        console.log(p);
                        // page ftl mock data
                        _context.prev = 13;
                        _context.next = 16;
                        return fs.readFileAsync(p);

                    case 16:
                        data = _context.sent;
                        _context.next = 21;
                        break;

                    case 19:
                        _context.prev = 19;
                        _context.t0 = _context['catch'](13);

                    case 21:
                        _context.prev = 21;
                        _context.next = 24;
                        return fs.readFileAsync(gp);

                    case 24:
                        gData = _context.sent;
                        _context.next = 29;
                        break;

                    case 27:
                        _context.prev = 27;
                        _context.t1 = _context['catch'](21);

                    case 29:

                        // make json
                        json = JSON.parse(data);
                        if (gData) {
                            json = Object.assign(JSON.parse(gData), json);
                        }

                        // render template
                        _context.prev = 31;
                        _context.next = 34;
                        return fm.renderAsync(tpl, json);

                    case 34:
                        html = _context.sent;

                        ctx.body = html;
                        _context.next = 42;
                        break;

                    case 38:
                        _context.prev = 38;
                        _context.t2 = _context['catch'](31);

                        console.error('[KS] render error');
                        return _context.abrupt('return', next());

                    case 42:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[13, 19], [21, 27], [31, 38]]);
    }));

    return function ftlMachine(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * [removePostfix description]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
function removePostfix(path) {
    if (typeof path !== 'string') {
        return;
    }
    var pp = path.split('/');
    pp = pp[pp.length - 1];
    var p = pp.split('.');
    p.splice(p.length - 1, 1);
    return p.join('.');
}

/**
 * [getPathByUrl description]
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
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