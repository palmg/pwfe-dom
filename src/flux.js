/**
 * Created by chkui on 2016/12/13.
 * 通用redux工具。
 */
'use strict';
import {createStore/*store创建器*/, combineReducers/*reducer合并工具*/, applyMiddleware/*中间渲染工具，用于支持ajax等异步渲染*/} from 'redux';
const reduxObj = require('react-redux')
import {isServerEvn} from './util'
import {FluxLogLevel, getFluxLogLevel}from './env'
import {asyncLoader} from './util'
import thunkMiddleware from 'redux-thunk';//中间渲染组件

let store,//本地存储store对象
    apply//中间件工具
const storeAsync = new asyncLoader() //store的异步处理工具
if (!isServerEvn() && getFluxLogLevel() === FluxLogLevel.Detail) {//如果是在服务器端，不会输出详细的store变更信息
    const createLogger = require('redux-logger'),//日志工具
        loggerMiddleware = createLogger();//创建日志
    apply = applyMiddleware(thunkMiddleware, loggerMiddleware)
} else {
    apply = applyMiddleware(thunkMiddleware)
}

/**
 * 注册异步执行任务
 * @param foo
 */
const asyncRegister = foo =>{
    storeAsync.register(foo)
}
/**
 * 异步执行
 */
const asyncExecute = () => {
    storeAsync && storeAsync.onLoad(true)
}

/**
 * 构建一个store，
 * @param reducer 要创建的reducer
 * @param loaderStore 异构的store数据
 * @returns {Store|*} 返回一个store对象
 */
export const buildStore = (reducer = {}, loaderStore) => {
    store = createStore(
        combineReducers(reducer),
        loaderStore,
        apply
    );
    asyncExecute()
    return store;
};

/**
 * 获取已构建的store对象
 * @returns {*}
 */
export const getStore = ()=> {
    return store;
};

/**
 * 执行对象的action
 * @param action
 */
export const dispatch = (action)=>{
    asyncRegister(()=>{store.dispatch(action)})
}

/**
 * 新增store变更的监听器
 * @param listener
 */
export const subscribe = (listener)=>{
    asyncRegister(()=>{store.subscribe(listener)})
}

const flux = {
    connect:reduxObj.connect,
    buildStore: buildStore,
    getStore: getStore,
    dispatch: dispatch,
    subscribe: subscribe
};

module.exports = flux
module.exports.default = module.exports