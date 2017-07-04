/**
 * Created by chkui on 2017/6/16.
 */

import {asyncLoader, isServerEvn} from '../../util'
import {buildMapping, exeMapping, exeMappingEx} from './util'

if (typeof require.ensure !== 'function') { //server without webpack
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

let loader;
isServerEvn() && (loader = new asyncLoader({
    loader: (call)=> {
        require.ensure([], require => {
            call(require('node-fetch'))
        }, 'nodeFetch')
    }
}))

//TODO 目前直接从全局环境获取配置
const __host = global ? global.serverHost : '127.0.0.1', //主机地址
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
class serverNetwork {
    constructor(params) {
        const _this = this;
        this.callback = {};//所有回调方法
        this.params = params;
        this.onLoad = this.onLoad.bind(this);
        this.response = this.response.bind(this);
    }

    onLoad(fetch) {
        const params = this.params,
            _this = this,
            options = {}
        params.method && (options.method = params.method)
        params.header && (options.headers = params.header)
        params.data && (options.body = params.data)
        fetch(params.url, options).then((res)=>{
            this.response(res)
        }).catch((e)=>{
            exeMappingEx(_this.callback, 'err', e, e.message)
            console.error(`请求遇到问题: ${e}`);
        })
    }

    /**
     * 发送方法
     * @returns {serverNetwork}
     */
    send() {
        loader.register(this.onLoad)
        return this;
    }

    response(res) {
        exeMapping(this.callback, 'suc', res.json())
        exeMapping(this.callback, 'headers', res.headers.raw())
    }

    /**
     * 服务器正常响应回传的信息
     * @param fun(data)
     * @returns {serverNetwork}
     */
    suc(fun) {
        buildMapping(this.callback, 'suc', fun)
        return this;
    }

    /**
     * 服务器头部信息
     * @param fun(header)
     * @returns {serverNetwork}
     */
    headers(fun) {
        buildMapping(this.callback, 'headers', fun)
        return this;
    }

    /**
     * 服务器产生错误的回调
     * @param fun(err,res) err为错误信息,res为服务器回调信息
     */
    err(fun) {
        buildMapping(this.callback, 'err', fun)
        return this;
    }
}

export default serverNetwork