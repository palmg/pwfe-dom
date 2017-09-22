/**
 * Created by chkui on 2017/6/26.
 */
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _router = require('./router');

var _bundle = require('./bundle');

var _bundle2 = _interopRequireDefault(_bundle);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var element = function element(el) {
    if ((0, _util.isElement)(el)) {
        return el;
    } else {
        var El = el;
        return _react2.default.createElement(El, null);
    }
};

/**
 * 前后端同构的App入口。如果需要二次开发，请参照这个模板
 * @param {object} props{
 *     init : {comp:后台初始化的组件,id:初始化组件对应的id}
 *     routes : 路由列表
 *     className : app的样式
 *     header: 头部元素
 *     children : 内容子元素
 *     footer:页脚元素
 * }
 * @return {XML}
 * @constructor
 */
var App = function App(props) {
    var init = props.init,
        routes = props.routes,
        className = props.className,
        header = props.header,
        children = props.children,
        footer = props.footer;

    return _react2.default.createElement(
        'div',
        { className: className },
        element(header),
        element(children),
        routes.map(function (i) {
            return _react2.default.createElement(_router.Route, { key: i.id, exact: true, path: i.url,
                component: (0, _bundle2.default)(init.id === i.id && init.comp, i.component) });
        }),
        element(footer)
    );
};

module.exports = App;
module.exports.default = module.exports;