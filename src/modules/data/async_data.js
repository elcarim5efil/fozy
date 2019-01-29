const path = require('path');
const qs = require('querystring');
const _ = require('../../util/extend');
const LocalData = require('./local_data');
const { log, JSONProcessor } = require('../../util');

const rootPath = fozy.root;
const config = fozy.config;

const getFilePath = function getFilePath(ctx) {
  const url = _.removePostfix(ctx.url.split('?')[0]);
  const method = ctx.method.toLocaleLowerCase();
  const root = path.join(rootPath, config.mock.api.root, method && config.mock.api[method]);
  const fileName = config.mock.fileName || '';
  return path.join(root, url, fileName);
};

const processData = (filePath, data, ctx) => {
  const proc = new JSONProcessor({
    module: `${filePath}.js`,
    preStringify: false,
  });

  return proc.process(
    Object.assign({}, data || {}),
    ctx.request.body,
    qs.parse(ctx.url.split('?')[1]),
    ctx,
  );
};

module.exports = {
  async get(ctx) {
    const filePath = getFilePath(ctx) || '';
    let data;
    try {
      data = await LocalData.get(filePath);
      data = processData(filePath, data, ctx);
    } catch (e) {
      log.error(`Async Mock data parse error, check your template .json files, url: ${ctx.url}`, e);
    }
    return data;
  },
};
