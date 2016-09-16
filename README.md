
# Introduction

A front-end development koa2 server, embedded with mock server, ftl compile and live-reload(using `browser-sync`);

# Install & run

Install with `-g`

`npm install fozy -g`

At project root directory, and run:

`fozy`

# Configuration

`config.js` sample:

```js
var config = {
  mock: {                // mock api data
        api: './mock/api',
  },     
  template: {            // template
    path: './templates',    // template file
    mock: './mock/ftl',     // template mock data
  },
  resource: [
    './public'
  ],
  max_retry: 10,
  port: 9000,
};
module.exports = config;
```