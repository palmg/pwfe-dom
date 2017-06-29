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
!(0, _util.isServerEvn)() && (loader = new _util.asyncLoader({
    loader: function loader(call) {
        require.ensure([], function (require) {
            call(require('superagent'));
        }, 'request');
    }
}));

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

var browserNetwork = function () {
    function browserNetwork(params) {
        _classCallCheck(this, browserNetwork);

        this.callback = {};
        params.method = params.method || 'GET';
        'undefined' === typeof params.url && function () {
            console.log('Input param : Url undefined!');
            throw 'Input param : url undefined!';
        }();
        this.params = params;
        this.onLoad = this.onLoad.bind(this);
    }

    _createClass(browserNetwork, [{
        key: 'onLoad',
        value: function onLoad(request) {
            var params = this.params,
                cb = this.callback;
            var req = params.method === 'GET' ? request.get(params.url) : request.post(params.url).type('form');
            params.data && req.send(params.data);
            params.header && function () {
                var header = params.header;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = header[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        req.set(item.name, item);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }();
            params.query && req.query(params.query);
            req.end(function (err, res) {
                if (!err && res.ok) {
                    (0, _util2.exeMapping)(cb, 'suc', res.body);
                    (0, _util2.exeMapping)(cb, 'headers', res.headers);
                } else {
                    (0, _util2.exeMappingEx)(cb, 'err', err, res);
                    console.error('\u8BF7\u6C42\u9047\u5230\u95EE\u9898: ' + err);
                }
            });
        }

        /**
         * 发送方法
         * @returns {browserNetwork}
         */

    }, {
        key: 'send',
        value: function send() {
            loader.register(this.onLoad);
            return this;
        }

        /**
         * 服务器正常响应回传的信息
         * @param fun(data)
         * @returns {browserNetwork}
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
         * @returns {browserNetwork}
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

    return browserNetwork;
}();

exports.default = browserNetwork;