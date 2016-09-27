
# Introduction

A front-end development koa2 server, embedded with mock server, ftl compile and live-reload(using `browser-sync`);

# Install & run

Install with `-g`

`npm install fozy -g`

At project root directory, and run:

`fozy`

# Configuration

`fozy.config.js` sample:

```javascript
var config = {
  port: 9000,
  maxRetry: 10,
  logMode: 0,  // 0: simple mode, 1: complete mode
  autoOpen: false,
  view: './views',  // .html files
  mock: {  // mock api data
    proxy: 'http://proxy.com', // if not empty, use api proxy
    api: './mock/api',
  },     
  template: {  // template
    engine: 'ftl',  // template engine
    root: './templates',  // template file
    page: '',  // page template files
    mock: './mock/ftl',  // template mock data
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

# pre-stringify template data to json

When you need to use json-string in template mock data in order to passing some data to javascript (just like what we usually do when passing data from freemarker to javascript)

```ftl
<script>
    var data = ${data!"{}"};
</script>
```

So, what you need to do here is that, when you wanna passing some mock data to javascript, you can define an `__json` array in your mock data file, like this:

```json
{
    "__json": [
        "data"
    ],
    "data": {"a":1,"b":2}
}
```

In this way, the server will stringify the specific mock data defined in `__json` before rendering the template files, so that you don't have to managing JSON-string in you mock data in a very lousy way.

# cli

```
-v, --version, print version
-h, --help, print help
-w, --watch, start live-reload with browser-sync
--init, initialize the project, so far, create fozy.config.js
```