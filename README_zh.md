# fozy

## 简介

一个前端开发工具, 使用了koa2搭建一个基本服务器, 提供mock数据服务, ftl模版编译以及基于`browser-sync`的live-reload功能.

## 安装

利用npm全局安装, 需要`node 4.2`或以上(未验证).

`npm install fozy -g`

在web工程目录下建立`fozy.config.js`文件, 并执行命令启动工具

`fozy`

# 配置

`fozy.config.js` 样例:

```javascript
var config = {
  port: 9000,                   // 端口号
  maxRetry: 10,                 // 端口被占用后的重试次数, 端口被占用后会自动+1, 知道能够建立服务器为止
  logMode: 0,                   // 日志打印模式, 0: simple mode, 1: complete mode
  autoOpen: false,              // 启动后自动打开浏览器开关, 仅在watch模式下有效(fozy -w)
  htmlView: './views',          // 非模版html文件路径

  // 异步数据mock服务器配置
  mock: {                       
    // 本地mock
    api: {
      root: './mock/api',   // 本地mock数据根目录
      // 设置各个方法mock数据的路径, 为''时则放在根目录下
      get: 'get',           // get方法数据路径, ./mock/api/get
      post: 'fetch',        // post方法数据路径, ./mock/api/fetch
    },
    // 本地mock数据文件名(为了适用各个工程, 后期需要优化这个设置项)
    fileName: 'data',         // 'data.json', 'data.js'
                              // 设置为false时, 文件名会直接使用url的最后一级
                              // 例如: url =>GET /test/getData, 文件名为getData.json
    // 代理设置
    proxyMap: {             // proxy 配置表, 设置各个代理服务地址和域名
      online: {             // 配置名
        host: 'online.com',                 // 服务器域名, 非必须
        target: 'http://xxx.xxx.xxx.xxx',   // 服务器地址
      },
      local: {
        target: 'http://xxx.xxx.xxx.xxx',
      },
    }
  },     

  // 模版渲染配置
  template: {
    engine: 'ftl',              // 模版引擎, 当前只有ftl, 未来考虑加入handlebars等渲染引擎
    root: './templates',        // 模版文件根目录
    mock: './mock/ftl',         // 模版mock数据, 文件命令应该与模版文件名一致, 如:demo.ftl, demo.json. 全局mock数据文件应该是 ./mock/ftl/global/data.json
  },
  resource: [                   // 静态文件根目录地址
    './src'
  ],
  watch: [                      // live-reload监听地址, 默认会监听模版文件根目录下的所有文件
    './src/css',
    './src/js',
  ],
  pages: [                      // 页面文件与url配置
        {name: 'demo page 1', url: '/demo', path: './demo.ftl'},
        {name: 'demo page 2', url: '/demo2', path: './demo2.html'},
        {name: 'demo page 3', url: '/demo3', path: './demo3.ftl'},
    ]
};
module.exports = config;
```

# api mock data

mock数据是根据nei自动生成的文件结构定义的, 如下:

```
POST localhost:9000/test
/mock/api/post/test/data.json
/mock/api/post/test/data.js
```

在`data.js`中, 可以自定义一个处理函数, 即可以根据请求的参数自动生成mock数据.

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

目前, `post`请求的`content-type`限制为`application/json`, `application/x-www-form-urlencoded`.

`data.json`和`data.js`文件更新后, 不需要重新其他fozy, 只需要重新发送请求就可以看到效果.

通过 `mock.api.defaultData` 字段设置默认 mock 数据。

```javascript
{
    mock: {
        api: {
            defaultData: {
                code: 200,
                msg: 'success'
            }
        }
    }
}
```

# json5

Mock 数据文件可以为 `.json5` 或 `.json` file， 如果两种格式同时存在，`.json5` 会被优先解析，`.json` 则会被忽略。更推荐使用灵活的 `.json5` 格式.

```json5
{
    code: 200,
    msg: 'success',
    data: {
        x: 1
    }
}
```

# 将模版mock数据转换为JSON

使用ftl时候, 如果JS中需要用到来自服务器的同步数据, 则需要将数据转换为JSON并写在页面当中. 但是如果在mock 数据文件中管理一个JSON字符串是非常麻烦的事情, 因此fozy中加入了将mock数据中的object转换为JSON的功能. 只需要在mock数据中加入一个字段`__json`, 并在这个字段中写入一个数据, 指定需要转换为JSON的数据, 那么在渲染ftl模版前就会先进行转换再实现渲染.

```ftl
<script>
    var data = ${data!"{}"};
</script>
```

```json
{
    "__json": [
        {"data": "dataJson"}
    ],
    "data": {"a":1,"b":2}
}
```

这样的话, 在本地开发过程中, 就可以模拟来自服务器的同步JSON数据, 减少本地开发与联调之间带来的区别.

# nei配置

为了更方便接入有nei配置的工程, 可以使用命令:

`fozy --nei {key}`

执行命令后, fozy会从nei上获取工程配置数据, 并按照这些数据自动生成配置文件`fozy.config.js`.

执行前, 请确保是在web工程下面, 及需要与nei上的工程规范中定义的工程文件结构的根目录一致. 如果出现页面无反应的情况, 请检查一下配置文件中的路径与fozy执行路径是否相符.

# 命令行附加参数

```
-v, --version, print version
-h, --help, print help
-w, --watch, start live-reload with browser-sync
-p, --proxy {proxyName}, using proxy api, {proxyName} should be contained in de proxyMap
--init, initialize the project, so far, create fozy.config.js
--nei {key}, fetch nei configuration from nei server and construct a fozy.config.js
```

# 当前问题

当前无论是系统结构还是功能上还很不完善:

- mcss编译器没有集成进去;
- 报错提示需要完善, 否则当遇到页面无法加载时无法定位错误;
- 没有自动打包功能;
- ......
