

const fs = require('../../lib/promise/fs.js');
const handlebars = require('handlebars');
const path = require('path');

const root = fozy.root;

module.exports = {
  makeConfig: async (config) => {
    // read config template file
    const confTpl = path.join(__dirname, '../../templates/config.hbs');
    let file;
    try {
      file = await fs.readFileAsync(confTpl, 'utf-8');
    } catch (err) {
      console.log('constuct error', err);
      return;
    }

    // render config template
    const template = handlebars.compile(file);
    const output = template(config);

    // output fozy.config.js on current directory
    try {
      await fs.writeFileAsync('./fozy.config.js', output);
    } catch (err) {
      console.log(err);
    }
  },
};
