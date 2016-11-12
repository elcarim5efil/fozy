
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var path = require('path');
var fs = require('../../promise/fs');
var _ = require('../../util/extend');
var __root = fozy.__root;
var config = require(path.join(__root, 'fozy.config'));

var qs = require('querystring');
var requireNew = require('../../util/require_from_new.js');
var JSONProcessor = require('./json.processor.js');

var globalJsonPath = path.join(__root, config.template.mock, '__global/data.json');

var engine = void 0;

var tplEngine = function tplEngine(option) {
    var fileType = '';
    if (option.engine == 'ftl') {
        engine = require('../../engine/freemarker')({
            viewRoot: path.join(__root, config.template.root || ''),
            options: {
                // sourceEncoding: 'UTF-8',
            }
        });
        fileType = '.ftl';
    }
    return function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
            var files, data, gData, json, proc, html;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            files = getFiles(ctx, fileType);

                            if (files.isTplExist) {
                                _context.next = 3;
                                break;
                            }

                            return _context.abrupt('return', next());

                        case 3:

                            // template mock data
                            data = void 0, gData = void 0, json = void 0;
                            _context.prev = 4;
                            _context.next = 7;
                            return fs.readFileAsync(files.json, 'utf-8');

                        case 7:
                            data = _context.sent;

                            // string -> json
                            json = JSON.parse(data);
                            // global template mock data

                            if (!fs.existsSync(globalJsonPath)) {
                                _context.next = 13;
                                break;
                            }

                            _context.next = 12;
                            return fs.readFileAsync(globalJsonPath, 'utf-8');

                        case 12:
                            gData = _context.sent;

                        case 13:
                            // combine with global data
                            json = Object.assign(JSON.parse(gData), json);
                            _context.next = 19;
                            break;

                        case 16:
                            _context.prev = 16;
                            _context.t0 = _context['catch'](4);

                            console.info('[KS] mock data parse error, there may be something wrong with your .json files');

                        case 19:

                            // process mock data with external js or stringify the specific object
                            proc = new JSONProcessor({
                                module: files.js,
                                preStringify: true
                            });


                            json = proc.process(json || {}, ctx.request.body, qs.parse(ctx.url.split('?')[1]), ctx);

                            // render template end return html
                            _context.prev = 21;
                            _context.next = 24;
                            return engine.render(files.tpl, json || {});

                        case 24:
                            html = _context.sent;

                            ctx.body = html;
                            _context.next = 31;
                            break;

                        case 28:
                            _context.prev = 28;
                            _context.t1 = _context['catch'](21);

                            console.error('[KS] render error, please check your template files and json files');

                        case 31:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[4, 16], [21, 28]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};

// get the template mock data file path according to the config.pages
function getFiles(ctx, fileType) {
    var files = {
        isTplExist: false
    };

    if (config.pages && config.pages.length > 0) {
        files.tpl = getPathByUrl(_.removeQueryString(ctx.url));
        files.path = _.removePostfix(files.tpl);
        if (files.tpl === -1) {
            return files;
        }
    } else {
        files.tpl = ctx.url + fileType;
    }

    files.json = path.join(__root, config.template.mock || '', (files.path || ctx.url) + '.json');
    files.js = path.join(__root, config.template.mock || '', (files.path || ctx.url) + '.js');
    files.tpl = path.join(config.template.page || '', files.tpl);
    files.isTplExist = fs.existsSync(path.join(__root, config.template.root || '', files.tpl));
    return files;
}

/**
 * get path by url in the config.pages
 * @param  {string} url matching url
 * @return {string/number}     path, -1: not found
 */
function getPathByUrl(url) {
    var res = -1;
    _.which(config.pages, function (item) {
        if (item.url === url) {
            res = item.path;
            return true;
        }
    });
    return res;
}

module.exports = tplEngine;