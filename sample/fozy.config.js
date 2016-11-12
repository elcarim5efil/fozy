var config = {
    port: 9000,
    maxRetry: 10,
    logMode: 0,
    autoOpen: false,
    htmlView: './views',
    mock: {
        api: {
            root: './mock/api/',
            get: 'get',
            post: 'post',
        },
        // proxy: 'http://localhost:9000',
        fileName: 'data',
    },
    template: {
        engine: 'ftl',
        root: './templates',
        mock: './mock/ftl',
    },
    resource: [
        './src'
    ],
    watch: [
        './src/css',
        './src/js',
    ],
    pages: [
        {name: '示例1', url: '/demo', path: './pages/demo.ftl'},
        {name: '示例2', url: '/demo2', path: './pages/demo2.ftl'},
        {name: '示例3', url: '/demo3', path: './pages/demo3.html'},
    ]

};

module.exports = config;