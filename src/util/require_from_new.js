
'use strict';

import path from 'path';
export default function requireWithNoCache(file){
    delete require.cache[path.resolve(file)];
    return require(file);
}