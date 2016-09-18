
# Introduction

A front-end development koa2 server, embedded with mock server, ftl compile and live-reload(using `browser-sync`);

# Install & run

Install with `-g`

`npm install fozy -g`

At project root directory, and run:

`fozy`

# Configuration

`fozy.config.js` sample:

```js
var config = {
  port: 9000,
  maxRetry: 10,
  logMode: 0, // 0: simple mode, 1: complete mode
  mock: { // mock api data
    proxy: 'http://proxy.com', // if not empty, use api proxy
    api: './mock/api',
  },     
  template: { // template
    root: './templates', // template file
    page: '',    // page template files
    mock: './mock/ftl',  // template mock data
  },
  resource: [
    './src'
  ],
  watch: [  // live reload path, template files are automatically watched
    './src/css',
    './src/js',
  ]
};
module.exports = config;
```

# cli

```
-v, --version, print version
-h, --help, print help
-w, --watch, start live-reload with browser-sync
```