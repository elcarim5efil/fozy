const Proxy = require('http-proxy');
const { log } = require('../../util');

const proxyConf = fozy.config.mock.proxy;

module.exports = (_option) => {
  let option;
  if (typeof option === 'string') {
    option = {
      target: _option,
    };
  } else {
    option = _option;
  }
  const proxy = Proxy.createProxyServer(option);

  proxy.on('proxyReq', (proxyReq) => {
    if (proxyConf.host) {
      proxyReq.setHeader('Host', proxyConf.host);
    }
  });

  return (ctx) => {
    const req = ctx.req;
    const res = ctx.res;
    ctx.response = false;
    try {
      proxy.web(req, res);
    } catch (err) {
      log.error('proxy error ', err);
    }
  };
};
