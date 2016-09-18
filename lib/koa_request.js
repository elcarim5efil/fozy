
'use strict';

var _request = require('request');
var Promise = require('bluebird');
var request = Promise.promisifyAll(_request);
module.exports = request;