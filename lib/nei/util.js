
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAsyncDataList = getAsyncDataList;
exports.getFozyConfig = getFozyConfig;
exports.getPagesConfig = getPagesConfig;
exports.getProjectConfig = getProjectConfig;
exports.getRelativePath = getRelativePath;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __root = fozy.__root;

function getAsyncDataList(data) {
    var asyncDataList = data.interfaces.map(function (item, index) {
        var method = item.method || 'get';
        return {
            method: method.toLowerCase(),
            name: item.name,
            path: item.path
        };
    });

    return asyncDataList;
}

function getFozyConfig(data) {
    var pagesConfig = getPagesConfig(data);
    var projectConfig = getProjectConfig(data);

    return {
        pages: pagesConfig,
        templatesRoot: projectConfig.templateRoot,
        syncMockRoot: projectConfig.syncMockRoot,
        asyncMockRoot: projectConfig.asyncMockRoot,
        resourceRoot: projectConfig.resourceRoot
    };
}

function getPagesConfig(data) {
    var pages = data.pages.map(function (item, i) {
        return {
            name: item.name,
            url: item.path,
            path: item.templates[0].path
        };
    });
    return pages;
}

function getProjectConfig(data) {
    var docs = data.specs[0].docs;
    var spec = data.specs[0].spec;
    return find(docs, spec);
}

function find(docs, spec, res, dir) {
    res = res || {};
    dir = dir || '';
    if (docs == undefined || docs.length === 0 || spec.attributes == undefined) {
        return res;
    }
    docs.forEach(function (item, index) {
        switch (item.id) {
            case spec.attributes.mockApiRoot:
                {
                    res.asyncMockRoot = getRelativePath(dir + '/' + item.name);
                    break;
                }
            case spec.attributes.viewRoot:
                {
                    res.templateRoot = getRelativePath(dir + '/' + item.name);
                    break;
                }
            case spec.attributes.mockViewRoot:
                {
                    res.syncMockRoot = getRelativePath(dir + '/' + item.name);
                    break;
                }
            case spec.attributes.webRoot:
                {
                    res.resourceRoot = getRelativePath(dir + '/' + item.name);
                    break;
                }
        }
        find(item.children, spec, res, dir + '/' + item.name);
    });
    return res;
}

function getRelativePath(uri) {
    var res = _path2.default.relative(process.cwd(), _path2.default.join(__root, uri)).replace(/\\/g, '/');
    return res;
}