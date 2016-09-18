
'use strict';

const _request = require('request');
const Promise = require('bluebird');
let request = Promise.promisifyAll(_request);
module.exports = request;
