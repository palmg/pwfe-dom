'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _router = require('./router');

var _bundle = require('./bundle');

var _bundle2 = _interopRequireDefault(_bundle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 前后端同构的App入口。如果需要二次开发，请参照这个模板
 * @param props
 * @return {XML}
 * @constructor
 */
var App = function App(props) {
    var init = props.init,
        routes = props.routes;

    return _react2.default.createElement(
        'div',
        null,
        routes.map(function (i) {
            return _react2.default.createElement(_router.Route, { key: i.id, exact: true, path: i.url,
                component: (0, _bundle2.default)(init.id === i.id && init.comp, i.component) });
        })
    );
}; /**
    * Created by chkui on 2017/6/26.
    */

module.exports = App;