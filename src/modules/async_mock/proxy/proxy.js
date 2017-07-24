import Proxy from 'http-proxy';

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

  const doProxy = (ctx) => {
    const req = ctx.req;
    const res = ctx.res;
    ctx.response = false;
    try {
      proxy.web(req, res);
    } catch (err) {
      console.info('proxy error ', err);
    }
  };
  return async (ctx) => {
    doProxy(ctx);
  };
};
