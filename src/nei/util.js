
'use strict';

import path from 'path';
const __root = fozy.__root;

export function getAsyncDataList(data) {
    let asyncDataList = data.interfaces.map(function(item, index) {
        var method = item.method || 'get';
        return {
            method: method.toLowerCase(),
            name: item.name,
            path: item.path,
        }
    });

    return asyncDataList;
}

export function getFozyConfig(data) {
    let pagesConfig = getPagesConfig(data);
    let projectConfig = getProjectConfig(data);

    return {
        pages: pagesConfig,
        templatesRoot: projectConfig.templateRoot,
        syncMockRoot: projectConfig.syncMockRoot,
        asyncMockRoot: projectConfig.asyncMockRoot,
        resourceRoot: projectConfig.resourceRoot,
    };
}

export function getPagesConfig(data) {
    let pages = data.pages.map((item, i) => {
        return {
            name: item.name,
            url: item.path,
            path: item.templates[0].path,
        }
    });
    return pages;
}

export function getProjectConfig(data) {
    let docs = data.specs[0].docs;
    let spec = data.specs[0].spec;
    return find(docs, spec);
}

function find(docs, spec, res, dir) {
    res = res || {};
    dir = dir || '';
    if(docs == undefined || docs.length === 0 || spec.attributes == undefined) {
        return res;
    }
    docs.forEach((item, index) => {
        switch(item.id) {
            case spec.attributes.mockApiRoot:{
                res.asyncMockRoot = getRelativePath(dir + '/' + item.name);
                break;
            }
            case spec.attributes.viewRoot:{
                res.templateRoot = getRelativePath(dir + '/' + item.name);
                break;
            }
            case spec.attributes.mockViewRoot:{
                res.syncMockRoot = getRelativePath(dir + '/' + item.name);
                break;
            }
            case spec.attributes.webRoot:{
                res.resourceRoot = getRelativePath(dir + '/' + item.name);
                break;
            }
        }
        find(item.children, spec, res, dir + '/' + item.name);
    });
    return res;
}

export function getRelativePath(uri) {
    let res = path.relative(process.cwd(), path.join(__root, uri)).replace(/\\/g,'/');
    return res;
}
