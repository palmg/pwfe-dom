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
!isServerEvn() && (loader = new asyncLoader({
    loader: (call)=> {
        require.ensure([], require => {
            call(require('superagent'))
        }, 'request')
    }
}))

let _withCredentials = (()=>{
    try{
        return __WithCredentials
    }catch(e){
        return false
    }
})()
/**
 *  通用网络请求工具
 *  @constructor {
 *      @param {string} method: 服务器调用方法["GET"|"POST"],
 *      @param {url} url: 访问路径
 *      @param {object|string} data: 要传递的数据
 *      @param {object} header: 要提交的头部 例如 {"Accept":"application/json"}
 *      @param {object} query: 服务器调用的query admin?a=a&b=b等价于{a:'a',b:'b'}
 *      @param {boolean} withCredentials: 标记是否跨域传递cookie。为了便于在测试环境中全局使用，可以在webpack中全局配置__WithCredentials=true
 *  }
 */
class browserNetwork {
    constructor(params) {
        this.callback = {};
        params.method = params.method || 'GET';
        'undefined' === typeof params.url && (()=> {
            console.log('Input param : Url undefined!');
            throw 'Input param : url undefined!';
        })();
        this.params = params;
        this.onLoad = this.onLoad.bind(this);
    }

    onLoad(request) {
        const params = this.params, cb = this.callback;
        const req = params.method === 'GET' ? request.get(params.url) : request.post(params.url).type('form');
        params.data && req.send(params.data);
        params.header && (()=> {
            const header = params.header;
            for (let item of header) {
                req.set(item.name, item);
            }
        })();
        params.query && req.query(params.query);
        (params.withCredentials || _withCredentials) && req.withCredentials();
        req.end((err, res)=> {
            if (!err && res.ok) {
                exeMapping(cb, 'suc', res.body)
                exeMapping(cb, 'headers', res.headers)
            } else {
                exeMappingEx(cb, 'err', err, res)
                console.error(`请求遇到问题: ${err}`);
            }
        });
    }

    /**
     * 发送方法
     * @returns {browserNetwork}
     */
    send() {
        loader.register(this.onLoad)
        return this;
    }

    /**
     * 服务器正常响应回传的信息
     * @param fun(data)
     * @returns {browserNetwork}
     */
    suc(fun) {
        buildMapping(this.callback, 'suc', fun)
        return this;
    }

    /**
     * 服务器头部信息
     * @param fun(header)
     * @returns {browserNetwork}
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

export default browserNetwork