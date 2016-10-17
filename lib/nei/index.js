
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');

var handlebars = require('handlebars');
var loader = require('./loader.js');
var fs = require('../../lib/promise/fs.js');
var path = require('path');
var __root = fozy.__root;

module.exports = {
    build: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(key) {
            var data, pages, confTpl, file, template, output;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:

                            // load nei configuration from server
                            console.log('Loading NEI configuration...');
                            _context.next = 3;
                            return loader(key);

                        case 3:
                            data = _context.sent;


                            console.log('NEI configuration loaded, building fozy.config.js...');
                            // constuct pages setting
                            pages = data.pages.map(function (item, i) {
                                return {
                                    name: item.name,
                                    url: item.path,
                                    path: item.templates[0].path
                                };
                            });

                            // read config template file

                            confTpl = path.join(__dirname, '../../templates/config.hbs');
                            file = void 0;
                            _context.prev = 8;
                            _context.next = 11;
                            return fs.readFileAsync(confTpl, 'utf-8');

                        case 11:
                            file = _context.sent;
                            _context.next = 18;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context['catch'](8);

                            console.log('constuct error', _context.t0);
                            return _context.abrupt('return');

                        case 18:

                            // render config template
                            template = handlebars.compile(file);
                            output = template({
                                pages: pages
                            });

                            // output fozy.config.js on current directory

                            _context.prev = 20;
                            _context.next = 23;
                            return fs.writeFileAsync('./fozy.config.js', output);

                        case 23:
                            _context.next = 28;
                            break;

                        case 25:
                            _context.prev = 25;
                            _context.t1 = _context['catch'](20);

                            console.log(_context.t1);

                        case 28:
                            console.log('fozy.config.js build success, path: ' + path.join(__root, './fozy.config.js'));

                        case 29:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[8, 14], [20, 25]]);
        }));

        return function build(_x) {
            return _ref.apply(this, arguments);
        };
    }()
};