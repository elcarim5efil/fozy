
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fs = require('../../lib/promise/fs.js');
var handlebars = require('handlebars');
var path = require('path');
var __root = fozy.__root;

module.exports = {
    makeConfig: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(config) {
            var confTpl, file, template, output;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            // read config template file
                            confTpl = path.join(__dirname, '../../templates/config.hbs');
                            file = void 0;
                            _context.prev = 2;
                            _context.next = 5;
                            return fs.readFileAsync(confTpl, 'utf-8');

                        case 5:
                            file = _context.sent;
                            _context.next = 12;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context['catch'](2);

                            console.log('constuct error', _context.t0);
                            return _context.abrupt('return');

                        case 12:

                            // render config template
                            template = handlebars.compile(file);
                            output = template(config);

                            // output fozy.config.js on current directory

                            _context.prev = 14;
                            _context.next = 17;
                            return fs.writeFileAsync('./fozy.config.js', output);

                        case 17:
                            _context.next = 22;
                            break;

                        case 19:
                            _context.prev = 19;
                            _context.t1 = _context['catch'](14);

                            console.log(_context.t1);

                        case 22:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[2, 8], [14, 19]]);
        }));

        return function makeConfig(_x) {
            return _ref.apply(this, arguments);
        };
    }()
};