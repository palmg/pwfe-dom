"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chkui on 2017/6/10.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * 页面分片高阶组件。该组件配合`routes`用于实现页面分片。
 * @param initComponent
 * @param getComponent
 * @return {{new(...[*]): {async: (function(*=)), render: (function()), componentWillMount: (function())}}}
 */
var bundle = function bundle(initComponent, getComponent) {
    return function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class() {
            var _ref;

            _classCallCheck(this, _class);

            for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                props[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(props)));

            _this.state = {
                Comp: initComponent
            };
            _this.async = _this.async.bind(_this);
            return _this;
        }

        _createClass(_class, [{
            key: "async",
            value: function async(Comp) {
                this.setState({
                    Comp: Comp
                });
            }
        }, {
            key: "componentWillMount",
            value: function componentWillMount() {
                !this.state.Comp && getComponent(this.async);
            }
        }, {
            key: "render",
            value: function render() {
                var Comp = this.state.Comp;

                Comp && Comp.default && (Comp = Comp.default) &&
                //增加注解说明需要将export default {} 替换为 module.exports = {}
                console.error("In current version 'require.ensure' has an issue that can't support es6 'export default {}' syntax. " + "Now replace Comp=Comp.default with force, but it could lead to other problems." + "If using 'require.ensure' to export a module, 'module.export = object' expression is appropriate.");
                return Comp ? _react2.default.createElement(Comp, this.props) : null;
            }
        }]);

        return _class;
    }(_react2.default.Component);
};

exports.default = bundle;