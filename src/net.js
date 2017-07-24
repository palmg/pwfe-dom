/**
 * Created by chkui on 2017/5/22.
 */
import {isServerEvn} from './util'
import serverNetwork from './lib/net/serverNetwork'
import browserNetwork from './lib/net/browserNetwork'

/**
 * 网络服务工具
 * @param {object} params{
 *     {string} method: 服务器调用方法["GET"|"POST"],
 *     {string} url: 访问路径
 *     {object|string} data: 要传递的数据
 *     {object} header: 要提交的头部 例如 {"Accept":"application/json"}
 *     {object} query: 服务器调用的query admin?a=a&b=b等价于{a:'a',b:'b'}
 *      @param {boolean} withCredentials: 标记是否跨域传递cookie。为了便于在测试环境中全局使用，可以在webpack中全局配置__WithCredentials=true
 *  }
 * @returns {network}
 */
const net = (params)=> {
    return isServerEvn() ? new serverNetwork(params) : new browserNetwork(params);
};

/**
 * get请求建议工具
 * @param url 网络请求地址
 * @param query: 服务器调用的query admin?a=a&b=b等价于{a:'a',b:'b'}
 * @returns {network}
 */
const get = (url, options) => {
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
const post = (url, data, options) => {
    return net({
        url: url,
        method: 'POST',
        data: data
    }).send();
};

export {net, get, post}