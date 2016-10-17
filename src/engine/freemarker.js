
'use strict';

const Freemarker = require('freemarker.js');

module.exports = (option) => {
    let fm = new Freemarker(option);
    return {
        engine: fm,
        render: async (tpl, json) => {
            return new Promise(function(resolve, reject) {
                fm.render(tpl, json, function(err, html, output){
                    if(err) {
                        reject(err);
                    } else {
                        resolve(html);
                    }
                });
            });
        }
    }
}