
'use strict';

const _request = require('request');

let req = async function(option){
    return new Promise(function(resolve, reject){
        _request(option, function(err, data){
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
};

module.exports = req;