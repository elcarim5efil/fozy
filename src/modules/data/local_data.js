import json5 from 'json5';
import _ from '../../util/extend';
import fs from '../../promise/fs';
import { log } from '../../util';

export default {
  async get(path, opt = {}) {
    if (!opt.postfixs) {
      opt.postfixs = [
        '.json5',
        '.json',
      ];
    }

    let json = null;
    let jsonPath = null;

    opt.postfixs.some((postfix) => {
      const filePath = path + postfix;
      if (_.isFileExist(filePath)) {
        jsonPath = filePath;
        return true;
      }
      return false;
    });


    if (jsonPath) {
      try {
        const file = await fs.readFileAsync(jsonPath, 'utf-8');
        json = json5.parse(file);
      } catch (err) {
        log.info(`Data parse error, check file: ${jsonPath}`);
        return false;
      }
    }

    return json;
  },
};
