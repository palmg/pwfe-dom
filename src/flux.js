/**
 * Created by chkui on 2016/12/13.
 * 通用redux工具。
 */
import {createStore/*store创建器*/, combineReducers/*reducer合并工具*/, applyMiddleware/*中间渲染工具，用于支持ajax等异步渲染*/} from 'redux';
import {isServerEvn} from './util'
import {getRunMode}from './env'
import thunkMiddleware from 'redux-thunk';//中间渲染组件

let store,//本地存储store对象
    apply;//中间件工具
if (!isServerEvn() && getRunMode() === "DEV") {
    const createLogger = require('redux-logger'),//日志工具
        loggerMiddleware = createLogger();//创建日志
    apply = applyMiddleware(thunkMiddleware, loggerMiddleware)
} else {
    apply = applyMiddleware(thunkMiddleware)
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
    return store;
};

/**
 * 获取已构建的store对象
 * @returns {*}
 */
export const getStore = ()=> {
    return store;
};

const flux = {
    buildStore: buildStore,
    getStore: getStore
};

export default flux;