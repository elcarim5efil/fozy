import Promise from 'bluebird';

module.exports = Promise.promisifyAll(require('fs'));

