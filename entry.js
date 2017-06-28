'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _router = require('./router');

var _flux = require('./flux');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 单页面前端基础入口组件，提供整合pwfe-server的入口支持。
 * 1）必须使用已定义的前后端通用标准页面模板。必须包含title、REDUX_STATE、SERVER_PARAMS模板参数
 *-------------------------------------------------------------------------------------------------------------
 *<html lang="en">
 <head>
 <title><%- title %></title>
 </head>
 <body>
 <div id="root"><%- root %></div>
 <script>
 window.REDUX_STATE = <%- JSON.stringify(state) %>;
 window.SERVER_PARAMS =<%- JSON.stringify(params) %>
 </script>
 *</html>
 *-----------------------------------------------------------------------------------------------------------------
 2）路由列表必须使用标准结构
 *-----------------------------------------------------------------------------------------------------------------
 *[{
    id: 'comp1', //页面id，在列表中唯一
    url: '/', //页面对应的URL
    name: '演示文稿', //页面名称，会渲染到title媒体属性中
    component: (cb)=> { //加载组件的回调
        //after get component
        cb(require('./sub/comp1'))
    }
 *}]
 *-----------------------------------------------------------------------------------------------------------------
 *3）仅用于客户端
 *4）如果有特殊需要，可以参照这个模型进行开发。关键一定要生成首屏渲染的页面组件。
 * @param {object} options{
 *  {object} reducer：redux的reducer。结构为{key:value}
 *  {array} routes：路由列表
 *  {component} app: 用于前后端同构渲染的app。该App会被传入 init参数和 routes参数。
 *  {component} children: 在app中显示的子元素，如果传入了自定义的app，则会传入到props.children中
 *  {string} className: app的样式
 *  {function} renderCb: 渲染完成的回调
 * }
 * init的结构为{comp 和 id} comp表示首屏渲染的页面以及页面对应的id。
 * routes就是定义的路由列表
 */
/**
 * Created by chkui on 2017/6/26.
 */
var entry = function entry(options) {
    var reducer = options.reducer,
        routes = options.routes,
        app = options.app,
        renderCb = options.renderCb,
        className = options.className,
        innerWindow = window || {},
        store = (0, _flux.buildStore)(reducer, innerWindow.REDUX_STATE),
        serverParam = innerWindow.SERVER_PARAMS || {},
        initID = serverParam.initId || routes[0].id,
        App = app || _app2.default;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            if (i.id === initID) {
                i.component(function (comp) {
                    (0, _reactDom.render)(_react2.default.createElement(
                        _reactRedux.Provider,
                        { store: store },
                        _react2.default.createElement(
                            _router.Router,
                            { history: _router.history },
                            _react2.default.createElement(
                                App,
                                { className: className, init: { comp: comp, id: initID }, routes: routes },
                                options.children
                            )
                        )
                    ), document.getElementById('root'));
                    renderCb && renderCb();
                });
            }
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
};

module.exports = entry;