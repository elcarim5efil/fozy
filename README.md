
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
  logMode: 0,  // 0: simple mode, 1: complete mode
  autoOpen: false,  // false: disable auto open browser when watching
  view: './views',  // .html files
  mock: {  // mock api data
    proxy: 'http://proxy.com', // if not empty, use api proxy
    api: './mock/api',
  },     
  template: {  // template
    engine: 'ftl',  // template engine
    root: './templates',  // template file
    page: '',  // page template files
    mock: './mock/ftl',  // template mock data, global mock data should be under this directory, etc: ./mock/ftl/global/data.json
  },
  resource: [  // static files path
    './src'
  ],
  watch: [  // live reload path, template files are automatically watched
    './src/css',
    './src/js',
  ],
  pages: [  // page configuration
        {name: 'demo page 1', url: '/demo'},
        {name: 'demo page 2', url: '/demo2'},
        {name: 'demo page 3', url: '/demo3'},
    ]
};
module.exports = config;
```

# cli

```
-v, --version, print version
-h, --help, print help
-w, --watch, start live-reload with browser-sync
--init, initialize the project, so far, create fozy.config.js
```