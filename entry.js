'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _router = require('./router');

var _flux = require('./flux');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chkui on 2017/6/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


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
 * @param {object} reducer：redux的reducer。结构为{key:value}
 * @param {array} routes：路由列表
 * @param {component} app: 用于前后端同构渲染的app。该App会被传入 init参数和 routes参数。
 * init的结构为{comp 和 id} comp表示首屏渲染的页面以及页面对应的id。
 * routes就是定义的路由列表
 */
var Entry = function (_React) {
    _inherits(Entry, _React);

    function Entry() {
        var _ref;

        _classCallCheck(this, Entry);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Entry.__proto__ || Object.getPrototypeOf(Entry)).call.apply(_ref, [this].concat(props)));

        var innerWindow = window || {},
            reducer = _this.props.reducer;
        _this.store = (0, _flux.buildStore)(reducer, innerWindow.REDUX_STATE);
        _this.serverParam = innerWindow.SERVER_PARAMS || {};
        _this.state = { comp: false };
        return _this;
    }

    _createClass(Entry, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var routes = this.props.routes,
                initID = this.serverParam.initId || routes[0].id;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    if (i.id === initId) {
                        i.component(function (comp) {
                            _this2.setState({ comp: comp });
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
        }
    }, {
        key: 'render',
        value: function render() {
            var App = this.props.app || _app2.default;
            return this.state.Comp ? _react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(
                    _router.Router,
                    { history: _router.history },
                    _react2.default.createElement(App, { init: { comp: this.state.comp, id: this.serverParam.initId }, routes: this.props.routes })
                )
            ) : null;
        }
    }]);

    return Entry;
}(_react2.default);

module.exports = Entry;