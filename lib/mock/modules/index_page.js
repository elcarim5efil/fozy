
'use strict';

var Promise = require('bluebird');
var Freemarker = require('freemarker.js');
var fs = Promise.promisifyAll(require('fs'));

var __root = fozy.__root;
var config = require(path.join(__root, 'fozy.config'));
var fm = Promise.promisifyAll(new Freemarker({
    viewRoot: path.join(__dirname, '../templates'),
    options: {}
}));