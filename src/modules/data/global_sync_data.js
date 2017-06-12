
'use strict';

import path from 'path';
import LocalData from './local_data';

const __root = fozy.__root;
const config = fozy.__config;
const globalJsonPath = path.join(__root, config.template.mock, '__global/data');

export default class GlobalSyncData {
    constructor() {

    }

    async getData() {
        return await new LocalData({
            path: globalJsonPath,
        }).getData();
    }
}
