
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var req = require('../../lib//promise/req.js');

var neiHost = 'https://nei.netease.com';
var specType = 0;

var loader = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(key, cb) {
        var url, json, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        url = neiHost + '/api/projectres/?key=' + encodeURIComponent(key) + '&spectype=' + specType;

                        console.log(url);
                        _context.prev = 2;
                        _context.next = 5;
                        return req({
                            url: url
                        });

                    case 5:
                        json = _context.sent;
                        data = JSON.parse(json.toJSON().body);

                        console.log(data);

                        if (!(data.code !== 200)) {
                            _context.next = 12;
                            break;
                        }

                        throw data;

                    case 12:
                        return _context.abrupt('return', data.result);

                    case 13:
                        _context.next = 18;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](2);

                        console.log('NEI configuration download error: ', _context.t0);

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 15]]);
    }));

    return function loader(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = loader;