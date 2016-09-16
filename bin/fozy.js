#!/usr/bin/env node


var path = require('path');

if(!!!global.fozy) {
    global.fozy = {
        __root: path.join(process.cwd()),
    }
}

require('../index.js');