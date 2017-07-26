const fs = require('fs');

const _ = {
  /**
    * remove postfix from the path, '/mock/demo.ftl' => '/mock/demo'
    * @param  {string} path path string
    * @return {string}      path without postfix
    */
  removeQueryString(path) {
    if (typeof path === 'string') {
      return path.split('?')[0];
    }
    return null;
  },

  /**
    * remove postfix(.***) from the path, '/mock/demo.ftl' => '/mock/demo'
    * @param  {string} path path string
    * @return {string}      path without postfix
    */
  removePostfix(path) {
    if (typeof path !== 'string') {
      return null;
    }
    const parts = path.split('.');
    if (parts.length > 1) {
      parts.splice(parts.length - 1, 1);
    }
    return parts.join('.');
  },

  which(arr, func) {
    let res;
    if (typeof func !== 'function') {
      return null;
    }
    arr.some((item) => {
      if (func.call(null, item)) {
        res = item;
        return true;
      }
      return false;
    });
    return res;
  },

  isFileExist(path) {
    try {
      return fs.existsSync(path);
    } catch (e) {
      return false;
    }
  },
};

module.exports = _;
