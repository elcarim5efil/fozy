import fs from 'fs';
import path from 'path';
import { log } from '../util';

const root = fozy.root;

const copyFile = function copyFile(src, tar) {
  fs.createReadStream(src).pipe(fs.createWriteStream(tar));
};

const init = {
  run() {
    this.makeConf();
  },
  makeConf() {
    const confSrc = path.join(__dirname, '../../sample/fozy.config.js');
    const confTar = path.join(root, 'fozy.config.js');
    fs.exists(confTar, (data, err) => {
      if (!err && !data) {
        copyFile(confSrc, confTar);
        log.info('fozy.config.js created');
      } else {
        log.warn('fozy.config.js already exists');
      }
    });
  },
};

module.exports = init;
