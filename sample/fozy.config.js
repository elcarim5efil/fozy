var config = {
    port: 9000,
    maxRetry: 10,
    logMode: 0,
    view: './views',
    mock: {
        api: './mock/api/',
        // proxy: 'http://localhost:9000',
    },
    template: {
        engine: 'ftl',
        root: './templates',
        page: 'pages',
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
        {name: '示例1', url: '/demo', path: './demo.ftl'},
        {name: '示例2', url: '/demo2', path: './demo2.ftl'},
        {name: '示例3', url: '/demo3', path: './demo3.html'},
    ]

};

module.exports = config;