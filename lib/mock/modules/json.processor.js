
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var requireNew = require('../../util/require_from_new.js');
var fs = require('../../promise/fs');

var JSONProcessor = function () {
    function JSONProcessor(option) {
        _classCallCheck(this, JSONProcessor);

        this.module = option.module;
        this.preStringify = option.preStringify || false;
        try {
            this.processor = fs.existsSync(option.module) ? requireNew(option.module) : undefined;
        } catch (err) {
            this.processor = undefined;
        }
    }

    _createClass(JSONProcessor, [{
        key: 'process',
        value: function process(json) {
            var proc = this.processor;
            var args = [].slice.call(arguments, 0);
            var res = Object.assign({}, json);

            if (typeof proc === 'function') {
                res = proc.apply(null, args);
            }
            res = this.__stringify(res);
            return res;
        }

        // stringify property in json according to json.__json

    }, {
        key: '__stringify',
        value: function __stringify(json) {
            var res = Object.assign({}, json);
            if (!this.preStringify || !json || !json.__json || json.__json.length === 0) {
                return res;
            }

            json.__json.forEach(function (item, i) {
                var key = Object.keys(item)[0];
                if (_typeof(json[key]) === 'object') {
                    res[item[key]] = JSON.stringify(json[key]);
                }
            });

            return res;
        }
    }]);

    return JSONProcessor;
}();

module.exports = JSONProcessor;