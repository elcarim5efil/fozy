
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var path = require('path');
var fs = require('../../promise/fs');

var __root = fozy.__root;
var config = require(path.join(__root, 'fozy.config'));

var gp = path.join(__root, config.template.mock, 'global/data.json');

var engine = void 0;

var tplEngine = function tplEngine(option) {
    var fileType = '';
    if (option.engine == 'ftl') {
        engine = require('../../engine/freemarker')({
            viewRoot: path.join(__root, config.template.root || ''),
            options: {}
        });
        fileType = '.ftl';
    }
    return function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
            var tpl, pageFile, p, data, gData, json, html;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            tpl = void 0, pageFile = void 0;

                            // get the template mock data file path according to the config.pages

                            if (!(config.pages && config.pages.length > 0)) {
                                _context.next = 8;
                                break;
                            }

                            tpl = getPathByUrl(ctx.url);
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
                            tpl = ctx.url + fileType;

                        case 9:

                            tpl = path.join(config.template.page || '', tpl);

                            p = path.join(__root, config.template.mock || '', (pageFile || ctx.url) + '.json');

                            // page template  mock data

                            data = void 0;
                            _context.prev = 12;
                            _context.next = 15;
                            return fs.readFileAsync(p);

                        case 15:
                            data = _context.sent;
                            _context.next = 20;
                            break;

                        case 18:
                            _context.prev = 18;
                            _context.t0 = _context['catch'](12);

                        case 20:

                            // global template mock data
                            gData = void 0;
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
                            json = JSON.parse(data);
                            // stringify property in json according to json.__json

                            if (json && json.__json && json.__json.length) {
                                json.__json.forEach(function (item, i) {
                                    if (json[item]) {
                                        json[item] = JSON.stringify(json[item]);
                                    }
                                });
                            }
                            // combine with global data
                            if (gData) {
                                json = Object.assign(JSON.parse(gData), json);
                            }

                            // stringify property in json according to json.__json
                            if (json && json.__json && json.__json.length) {
                                json.__json.foreach(function (item, i) {
                                    if (json[item]) {
                                        json[item] = json.stringify(json[item]);
                                    }
                                });
                            }

                            // render template end return html
                            _context.prev = 33;
                            _context.next = 36;
                            return engine.render(tpl, json || {});

                        case 36:
                            html = _context.sent;

                            ctx.body = html;
                            _context.next = 44;
                            break;

                        case 40:
                            _context.prev = 40;
                            _context.t2 = _context['catch'](33);

                            console.error('[KS] render error');
                            return _context.abrupt('return', next());

                        case 44:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[12, 18], [21, 27], [33, 40]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};

/**
 * remove postfix from the path, '/mock/demo.ftl' => '/mock/demo'
 * @param  {string} path path string
 * @return {string}      path without postfix
 */
function removePostfix(path) {
    if (typeof path !== 'string') {
        return;
    }
    var p = path.split('.');
    p.splice(p.length - 1, 1);
    return p.join('.');
}

/**
 * get path by url in the config.pages
 * @param  {string} url matching url
 * @return {string/number}     path, -1: not found
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

module.exports = tplEngine;