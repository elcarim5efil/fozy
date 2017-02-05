
'use strict';

class Cli {
    constructor(){
        this.handlers = [];
        this.maps = {};
        this.default = '-h';
        this.normal = function(){};
    }

    on(argvs, handler) {
        argvs.forEach( (item => {
            this.maps[item] = handler;
        }).bind(this))
    }

    end() {

    }

    normal() {

    }

    parse(argvs) {
        if(argvs.length === 0) {
            this.normal();
            return;
        };

        for(let i = 0, len = argvs.length; i < len; ){
            let arg,
                handler = this.maps[argvs[i]];
            if(handler !== undefined) {
                if(!/^\-{1,2}/.test(argvs[i+1])) {
                    arg = argvs[++i];
                }
                handler.call(null, arg);
                ++i;
            } else {
                console.log(`${argvs[i]} is invalid, please use -h or --help for help`);
                this.parse(['-h']);
                return;
            }
        }
        this.end();
    }
}

module.exports = Cli;