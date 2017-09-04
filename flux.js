/**
 * Created by chkui on 2016/12/13.
 * 通用redux工具。
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.subscribe = exports.dispatch = exports.getStore = exports.buildStore = undefined;

var _redux = require('redux');

var _util = require('./util');

var _env = require('./env');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reduxObj = require('react-redux');
//中间渲染组件

var store = void 0,
    //本地存储store对象
apply = void 0,
    //中间件工具
storeAsync = void 0; //store的异步处理工具
if (!(0, _util.isServerEvn)() && (0, _env.getFluxLogLevel)() === _env.FluxLogLevel.Detail) {
    //如果是在服务器端，不会输出详细的store变更信息
    var createLogger = require('redux-logger'),
        //日志工具
    loggerMiddleware = createLogger(); //创建日志
    apply = (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware);
} else {
    apply = (0, _redux.applyMiddleware)(_reduxThunk2.default);
}

/**
 * 注册异步执行任务
 * @param foo
 */
var asyncRegister = function asyncRegister(foo) {
    !storeAsync && (storeAsync = new _util.asyncLoader());
    storeAsync.register(foo);
};
/**
 * 异步执行
 */
var asyncExecute = function asyncExecute() {
    //!storeAsync && (storeAsync = new asyncLoader())
    storeAsync && storeAsync.onLoad(true);
};

/**
 * 构建一个store，
 * @param reducer 要创建的reducer
 * @param loaderStore 异构的store数据
 * @returns {Store|*} 返回一个store对象
 */
var buildStore = exports.buildStore = function buildStore() {
    var reducer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var loaderStore = arguments[1];

    store = (0, _redux.createStore)((0, _redux.combineReducers)(reducer), loaderStore, apply);
    asyncExecute();
    return store;
};

/**
 * 获取已构建的store对象
 * @returns {*}
 */
var getStore = exports.getStore = function getStore() {
    return store;
};

/**
 * 执行对象的action
 * @param action
 */
var dispatch = exports.dispatch = function dispatch(action) {
    asyncRegister(function () {
        store.dispatch(action);
    });
};

/**
 * 新增store变更的监听器
 * @param listener
 */
var subscribe = exports.subscribe = function subscribe(listener) {
    asyncRegister(function () {
        store.subscribe(listener);
    });
};

var flux = {
    connect: reduxObj.connect,
    buildStore: buildStore,
    getStore: getStore,
    dispatch: dispatch,
    subscribe: subscribe
};

module.exports = flux;
module.exports.default = module.exports;