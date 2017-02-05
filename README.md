# fozy
[![NPM version][npm-image]][npm-url]
[![download][downloads-image]][downloads-url]

[![NPM][nodei-image]][nodei-url]


[npm-url]: https://www.npmjs.com/package/fozy
[npm-image]: https://img.shields.io/npm/v/fozy.svg
[downloads-image]: https://img.shields.io/npm/dm/fozy.svg
[downloads-url]: https://www.npmjs.com/package/fozy
[nodei-image]: https://nodei.co/npm/fozy.png?downloads=true&downloadRank=true&stars=true
[nodei-url]: https://www.npmjs.com/package/fozy


# Introduction

A front-end development koa2 server, embedded with mock server, ftl compile and live-reload(using `browser-sync`);

# Install & run

Install with `-g`

`npm install fozy -g`

At project root directory, and run:

`fozy`

Input `http://localhost:9000/fozy/index` in your browser to view your page list

Run `fozy -w` to enter watch mode.


# Configuration

`fozy.config.js` sample:

```javascript
var config = {
  port: 9000,
  maxRetry: 10,
  logMode: 0,  // 0: simple mode, 1: complete mode
  autoOpen: false,  // false: disable auto open browser when watching
  htmlView: './views',  // .html files
  mock: {  // mock api data
    api: {
      root: './mock/api',   // api root
      get: 'get',           // get method root, ./mock/api/get
      post: 'fetch',        // post method root, ./mock/api/fetch
    },
    proxyMap: {             // proxy configuration map
      online: {
        host: 'online.com',                 // not necessary
        target: 'http://xxx.xxx.xxx.xxx',   // proxy target location
      },
      local: {
        target: 'http://xxx.xxx.xxx.xxx',
      },
    }
    fileName: 'data',         // specific mock data file name, 'data.json'
                              // or you can just assign it to false, then the file name will be deault according to the url
                              // etc: url =>GET /test/getData, the mock data file name will be getData.json
                              // and the whole path will be ./mock/api/get/test/getData.json
  },     
  template: {  // template
    engine: 'ftl',  // template engine
    root: './templates',  // template file
    page: '',  // page template files
    mock: './mock/ftl',  // template mock data, global mock data should be under this directory, etc: ./mock/ftl/__global/data.json
  },
  resource: [  // static files path
    './src'
  ],
  watch: [  // live reload path, template files are automatically watched
    './src/css/**/*.css',
    './src/js/**/*.js',
  ],
  pages: [  // page configuration
        {name: 'demo page 1', url: '/demo', path: './demo.ftl'},
        {name: 'demo page 2', url: '/demo2', path: './demo2.html'},
        {name: 'demo page 3', url: '/demo3', path: './demo3.ftl'},
rl: '/demo3'},
    ]
};
module.exports = config;
```

# api mock data

You can assign a data generator to a specific api url, which means you can make your own dynamic mock data during development. What you have to to is place a .js file aside your json file.

```
/mock/api/post/test/data.json
/mock/api/post/test/data.js
```

In `data.js`, you should define a function and export it. Using `body` and `query` makes it possible to respond the specific request data.

```javascript
module.exports = function(json, body, query){
    // do something with json and finally return it
    // body is the pre-parsed body data
    // query is the query string in the url
    // just like:
    json.data = Math.random() + body.x + query.y;
    return json;
}
```

So far, the post content-type are limited to `application/json`, `application/x-www-form-urlencoded`.

# proxy api

`fozy -p {proxyName}`, choose the proxy configuration in the proxyMap and use it as the async data server, exp: `fozy -w -p online`, use online server while starting the live-reload mode.

# pre-stringify template mock data

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
        {"data": "dataJson"}
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
-p, --proxy {proxyName}, using proxy api, {proxyName} should be contained in de proxyMap
--init, initialize the project, so far, create fozy.config.js
```
