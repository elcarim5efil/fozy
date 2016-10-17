
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');

var loader = require('./loader.js');
var output = require('./output.js');
var config = require('./config.js');
var path = require('path');
var __root = fozy.__root;

module.exports = {
    build: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(key) {
            var data;
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


                            // output fozy.config.js
                            console.log('NEI configuration loaded, building fozy.config.js...');
                            _context.next = 7;
                            return output.makeConfig(config.format(data));

                        case 7:
                            console.log('fozy.config.js build success, path: ' + path.join(__root, './fozy.config.js'));

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function build(_x) {
            return _ref.apply(this, arguments);
        };
    }()
};