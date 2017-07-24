const fs = require('fs');
const path = require('path');

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
        console.info('[fozy] fozy.config.js created');
      } else {
        console.info('[fozy] fozy.config.js already exists');
      }
    });
  },
};

module.exports = init;
