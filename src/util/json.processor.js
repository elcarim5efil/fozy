import requireNew from './require_from_new';
import fs from '../promise/fs';

class JSONProcessor {
  constructor(option) {
    this.module = option.module;
    this.preStringify = option.preStringify || false;
    try {
      this.processor = fs.existsSync(option.module) ? requireNew(option.module) : undefined;
    } catch (err) {
      this.processor = undefined;
    }
  }

  process(json, ...args) {
    const proc = this.processor;
    let res = Object.assign({}, json);

    if (typeof proc === 'function') {
      res = proc(json, ...args);
    }
    res = this.stringify(res);
    return res;
  }

  // stringify property in json according to json.__json
  stringify(json) {
    const res = Object.assign({}, json);
    if (!this.preStringify
    /*eslint-disable*/
            || !json || !json.__json || json.__json.length === 0) {
    /*eslint-enable*/
      return res;
    }

    /*eslint-disable*/
    json.__json.forEach((item) => {
      const key = Object.keys(item)[0];
      if (typeof json[key] === 'object') {
        res[item[key]] = JSON.stringify(json[key]);
      }
    });
    /*eslint-enable*/

    return res;
  }
}

module.exports = JSONProcessor;
