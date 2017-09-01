/**
 * Created by chkui on 2017/6/19.
 * 基础工具模块
 */
'use strict';
/**
 * 获取组件的显示名称
 * @param WrappedComponent 包装组件
 * @returns {*|string}
 */
export const getComponentName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

/**
 * 判断当前的运行环境是否为服务器环境。
 * 1）浏览器和服务器通用
 * @return {boolean}。true: 浏览器环境，false：服务器环境
 */
export const isServerEvn = () =>{
    return (typeof global === 'object') && (global.global === global);
}

/**
 * 基础类异步管理回调类
 * @constructor {object} params{
 *     @param {function} loader (onLoad)=>{
 *          //load complete then
 *          onLoad(loadResult);
 *     }。
 *     初始化完成的回调，由于初始化方法是由外部执行，所以当外部完成初始化之后，需要掉这个接口并传入初始化结果通知实例完成初始化。
 *     或者外部直接执行asyncLoader::onLoad(result) 方法
 * }
 */
export class asyncLoader {
    constructor(params){
        this.handleList = [];
        this.result = null;
        this.onLoad = this.onLoad.bind(this);
        params && params.loader && params.loader(this.onLoad)
    }

    /**
     * 注册初始化完成后需要回调通知的方法
     * @param callback
     */
    register(callback){
        this.result ? callback(this.result) : this.handleList.push(callback)
    }

    /**
     * 加载完成的方法
     * @param result
     */
    onLoad(result){
        this.result = result;
        this.executeHandle();
    }

    /**
     * 加载完成后执行的方法，非外部接口
     */
    executeHandle(){
        this.handleList.map(i=>i(this.result));
        this.handleList = null;
    }
}

/**
 * 获取src中key的值, 不存在则返回null
 * @param {object} src 要被获取值的对象，方法或看对象中是否包含名为key的属性 {}.key = 'value';
 * @param key 要获取值的属性
 * @returns {*} 返回对应的属性值，不存在则返回 undefined
 */
export const safeGetValue = (src, key) => {
    let rlt;
    try {
        if (key.startsWith("[")) {
            rlt = eval("src" + key);
        } else {
            rlt = eval("src." + key);
        }
    }
    catch (e) {
    }
    return rlt;
}
