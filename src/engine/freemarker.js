const Freemarker = require('./freemarker/index.js');

module.exports = (option) => {
  const fm = new Freemarker(option);
  return {
    engine: fm,
    render: async (tpl, json) => new Promise(((resolve, reject) => {
      fm.render(tpl, json, (err, html, output) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            html,
            output,
          });
        }
      });
    })),
  };
};
