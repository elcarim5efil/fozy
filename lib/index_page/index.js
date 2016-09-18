
'use strict';

/**
 * Access the page list, if config.pages is configed, then it will be returned
 * @return {Promise} [description]
 */
var getPageList = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var p, files, temp, pages;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!(config.pages && config.pages.length > 0)) {
                            _context2.next = 2;
                            break;
                        }

                        return _context2.abrupt('return', config.pages);

                    case 2:
                        p = void 0, files = [], temp = void 0;
                        // templates

                        p = path.join(__root, config.template.root, config.template.page);
                        _context2.next = 6;
                        return fs.readdirAsync(p);

                    case 6:
                        temp = _context2.sent;

                        files = files.concat(temp);
                        // views
                        p = path.join(__root, config.view);
                        _context2.next = 11;
                        return fs.readdirAsync(p);

                    case 11:
                        temp = _context2.sent;

                        files = files.concat(temp);

                        pages = files.map(function (item) {
                            var parts = item.split('.');
                            parts.splice(parts.length - 1, 1);
                            var name = parts.join('.');
                            return { name: name, url: '/' + name };
                        });
                        return _context2.abrupt('return', pages);

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getPageList() {
        return _ref2.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Promise = require('bluebird');
var Freemarker = require('freemarker.js');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var __root = fozy.__root;
var config = require(path.join(__root, 'fozy.config'));
var fm = Promise.promisifyAll(new Freemarker({
    viewRoot: path.join(__dirname, '../../templates'),
    options: {}
}));

var indexPage = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var pages, html;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getPageList();

                    case 2:
                        pages = _context.sent;
                        _context.next = 5;
                        return fm.renderAsync('index.ftl', {
                            title: 'Pages Index',
                            pages: pages
                        });

                    case 5:
                        html = _context.sent;

                        ctx.body = html;

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function indexPage(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = indexPage;