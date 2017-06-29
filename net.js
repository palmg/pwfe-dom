'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.post = exports.get = exports.net = undefined;

var _util = require('./util');

var _serverNetwork = require('./lib/net/serverNetwork');

var _serverNetwork2 = _interopRequireDefault(_serverNetwork);

var _browserNetwork = require('./lib/net/browserNetwork');

var _browserNetwork2 = _interopRequireDefault(_browserNetwork);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 网络服务工具
 * @param {object} params{
 *     {string} method: 服务器调用方法["GET"|"POST"],
 *     {string} url: 访问路径
 *     {object|string} data: 要传递的数据
 *     {object} header: 要提交的头部 例如 {"Accept":"application/json"}
 *     {object} query: 服务器调用的query admin?a=a&b=b等价于{a:'a',b:'b'}
 *  }
 * @returns {network}
 */
var net = function net(params) {
    return (0, _util.isServerEvn)() ? new _serverNetwork2.default(params) : new _browserNetwork2.default(params);
};

/**
 * get请求建议工具
 * @param url 网络请求地址
 * @param query: 服务器调用的query admin?a=a&b=b等价于{a:'a',b:'b'}
 * @returns {network}
 */
/**
 * Created by chkui on 2017/5/22.
 */
var get = function get(url, query) {
    return net({
        url: url,
        query: query
    }).send();
};

/**
 * post请求工具
 * @param url: 网络请求地址
 * @param data: 要传递的数据
 * @returns {network}
 */
var post = function post(url, data) {
    return net({
        url: url,
        method: 'POST',
        data: data
    }).send();
};

exports.net = net;
exports.get = get;
exports.post = post;