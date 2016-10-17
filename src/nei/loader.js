'use strict';

const req= require('../../lib//promise/req.js');

let neiHost = 'http://nei.netease.com';
let specType = 0;

let loader = async (key, cb) => {
    let url = `${neiHost}/api/projectres/?key=${encodeURIComponent(key)}&spectype=${specType}`;
    
    try{
        let json = await req({
            url
        });
        let data = JSON.parse(json.toJSON().body);
        if(data.code !== 200) {
            throw data
        } else {
            return data.result;
        }
    } catch(err) {
        console.log('NEI configuration download error: ', err);
    }
}

module.exports = loader;