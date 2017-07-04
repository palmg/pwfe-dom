'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by chkui on 2017/6/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _util = require('../../util');

var _util2 = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof require.ensure !== 'function') {
    //server without webpack
    require.ensure = function (dependencies, callback) {
        callback(require);
    };
}

var loader = void 0;
(0, _util.isServerEvn)() && (loader = new _util.asyncLoader({
    loader: function loader(call) {
        require.ensure([], function (require) {
            call(require('node-fetch'));
        }, 'nodeFetch');
    }
}));

//TODO 目前直接从全局环境获取配置
var __host = global ? global.serverHost : '127.0.0.1',
    //主机地址
__port = 8080; //主机端口

/**
 *  通用网络请求工具
 *  @constructor {
 *      @param {string} method: 服务器调用方法["GET"|"POST"],
 *      @param {url} url: 访问路径
 *      @param {object|string} data: 要传递的数据
 *      @param {object} header: 要提交的头部 例如 {"Accept":"application/json"}
 *      @param {object} query: 服务器调用的query admin?a=a&b=b等价于{a:'a',b:'b'}
 *  }
 */

var serverNetwork = function () {
    function serverNetwork(params) {
        _classCallCheck(this, serverNetwork);

        var _this = this;
        this.callback = {}; //所有回调方法
        this.params = params;
        this.onLoad = this.onLoad.bind(this);
        this.response = this.response.bind(this);
    }

    _createClass(serverNetwork, [{
        key: 'onLoad',
        value: function onLoad(fetch) {
            var _this2 = this;

            var params = this.params,
                _this = this,
                options = {};
            params.method && (options.method = params.method);
            params.header && (options.headers = params.header);
            params.data && (options.body = params.data);
            fetch(params.url, options).then(function (res) {
                _this2.response(res);
            }).catch(function (e) {
                (0, _util2.exeMappingEx)(_this.callback, 'err', e, e.message);
                console.error('\u8BF7\u6C42\u9047\u5230\u95EE\u9898: ' + e);
            });
        }

        /**
         * 发送方法
         * @returns {serverNetwork}
         */

    }, {
        key: 'send',
        value: function send() {
            loader.register(this.onLoad);
            return this;
        }
    }, {
        key: 'response',
        value: function response(res) {
            (0, _util2.exeMapping)(this.callback, 'suc', res.json());
            (0, _util2.exeMapping)(this.callback, 'headers', res.headers.raw());
        }

        /**
         * 服务器正常响应回传的信息
         * @param fun(data)
         * @returns {serverNetwork}
         */

    }, {
        key: 'suc',
        value: function suc(fun) {
            (0, _util2.buildMapping)(this.callback, 'suc', fun);
            return this;
        }

        /**
         * 服务器头部信息
         * @param fun(header)
         * @returns {serverNetwork}
         */

    }, {
        key: 'headers',
        value: function headers(fun) {
            (0, _util2.buildMapping)(this.callback, 'headers', fun);
            return this;
        }

        /**
         * 服务器产生错误的回调
         * @param fun(err,res) err为错误信息,res为服务器回调信息
         */

    }, {
        key: 'err',
        value: function err(fun) {
            (0, _util2.buildMapping)(this.callback, 'err', fun);
            return this;
        }
    }]);

    return serverNetwork;
}();

exports.default = serverNetwork;