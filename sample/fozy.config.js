var config = {
    port: 9000,
    maxRetry: 10,
    logMode: 0,
    mock: {
        api: './mock/',
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
    ]

};

module.exports = config;