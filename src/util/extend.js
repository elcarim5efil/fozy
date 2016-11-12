let _ = {
    /**
    * remove postfix from the path, '/mock/demo.ftl' => '/mock/demo'
    * @param  {string} path path string
    * @return {string}      path without postfix
    */
    removeQueryString(path) {
        if(typeof path !== 'string') {
            return;
        }
        return path.split('?')[0];
    },

    /**
    * remove postfix(.***) from the path, '/mock/demo.ftl' => '/mock/demo'
    * @param  {string} path path string
    * @return {string}      path without postfix
    */
    removePostfix(path) {
        if(typeof path !== 'string') {
            return;
        }
        var parts = path.split('.');
        if(parts.length > 1) {
            parts.splice(parts.length-1,1);
        }
        return parts.join('.');
    },

    which(arr, func) {
        let res;
        if(typeof func !== 'function') {
            return;
        }
        arr.some(function(item){
            if(func.call(null, item)) {
                res = item;
                return true;
            }
        });
        return res;
    },
}

module.exports = _;