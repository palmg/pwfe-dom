'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStore = exports.buildStore = undefined;

var _redux = require('redux');

var _util = require('./util');

var _env = require('./env');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//中间渲染组件

/**
 * Created by chkui on 2016/12/13.
 * 通用redux工具。
 */
var store = void 0,
    //本地存储store对象
apply = void 0; //中间件工具
if (!(0, _util.isServerEvn)() && (0, _env.getRunMode)() === "DEV") {
    var createLogger = require('redux-logger'),
        //日志工具
    loggerMiddleware = createLogger(); //创建日志
    apply = (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware);
} else {
    apply = (0, _redux.applyMiddleware)(_reduxThunk2.default);
}

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
    return store;
};

/**
 * 获取已构建的store对象
 * @returns {*}
 */
var getStore = exports.getStore = function getStore() {
    return store;
};

var flux = {
    buildStore: buildStore,
    getStore: getStore
};

exports.default = flux;