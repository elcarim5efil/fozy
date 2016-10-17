var config = {
    port: 9000,
    maxRetry: 10,
    logMode: 0,
    view: '',
    mock: {
        api: 'src/main/webapp/src/mock',
        proxy: null,
    },
    template: {
        engine: 'ftl',
        root: 'src/main/webapp/WEB-INF/views',
        mock: 'src/main/webapp/WEB-INF/views/mock',
    },
    resource: [
        'src/main/webapp'
    ],
    watch: [
        'src/main/webapp/src/css',
        'src/main/webapp/src/stykesheet',
        'src/main/webapp/src/js',
        'src/main/webapp/src/javascript',
    ],
    pages: [
            {name: '核心指标全景', url: '/businessAnalysis/kpiOverview', path: './businessAnalysis/kpiOverview.ftl'},
            {name: '核心KPI指标完成度', url: '/businessAnalysis/kpiStatistic', path: './businessAnalysis/kpiStatistic.ftl'},
            {name: '异常分析', url: '/categoryAdviser/goodAnalysis/exceptionAnalysis', path: './categoryAdviser/goodAnalysis/exceptionAnalysis.ftl'},
            {name: 'Demo页面', url: '/demo', path: './demo/index.ftl'},
            {name: '类目概况', url: '/categoryAdviser/categoryOverview', path: './categoryAdviser/categoryOverview.ftl'},
            {name: '类目参谋-流量分析-来源路径', url: '/categoryAdviser/trafficAnalysis/sourcePath', path: './categoryAdviser/trafficAnalysis/sourcePath.ftl'},
            {name: '类目参谋-流量分析-流量概况', url: '/categoryAdviser/trafficAnalysis/trafficOverview', path: './categoryAdviser/flowAnalysis/flowOverview.ftl'},
            {name: '类目参谋-交易分析-交易构成', url: '/categoryAdviser/dealAnalysis/dealConstitute', path: './categoryAdviser/tradeAnalysis/tradeComposition.ftl'},
            {name: '类目参谋-商品分析-商品概况', url: '/categoryAdviser/goodsAnalysis/goodsOverview', path: './categoryAdviser/goodsAnalysis/goodsOverview.ftl'},
            {name: '实时直播-实时概况', url: '/realTimeBroadcast/realTimeOverview/', path: './realTimeBroadcast/realTimeOverview.ftl'},
            {name: '实时直播-实时商品分析', url: '/liveGoodsAnalysis/liveAnomalyAnalysis', path: './liveGoodsAnalysis/liveAnomalyAnalysis.ftl'},
            {name: '实时直播-实时流量分析-入口坑位分析', url: '/realTimeBroadcast/realTimeTrafficAnalysis/entryPositionAnalysis', path: './realTimeBroadcast/realTimeTrafficAnalysis/entryPositionAnalysis.ftl'},
            {name: '实时直播-实时活动-实时活动分析', url: '/realTimeBroadcast/realTimeActivity/realTimeActivityAnalysis', path: './realTimeBroadcast/realTimeActivity/realTimeActivityAnalysis.ftl'},
            {name: '实时活动-实时活动分析-活动页面坑位分析', url: '/realTimeBroadcast/realTimeActivityAnalysis/pagesPositionAnalysis', path: './realTimeBroadcast/realTimeActivityAnalysis/pagesPositionAnalysis'},
    ]

};

module.exports = config;