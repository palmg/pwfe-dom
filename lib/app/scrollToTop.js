'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 当页面被切换时，将滚动条滚动到顶端。
 * //TODO 目前默认是滚动window对象，需要进一步完善
 */
var ScrollToTop = function (_React$Component) {
    _inherits(ScrollToTop, _React$Component);

    function ScrollToTop() {
        _classCallCheck(this, ScrollToTop);

        return _possibleConstructorReturn(this, (ScrollToTop.__proto__ || Object.getPrototypeOf(ScrollToTop)).apply(this, arguments));
    }

    _createClass(ScrollToTop, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.location !== prevProps.location && 0 !== window.scrollY) {
                window.scrollTo(0, 0);
                console.log('to top');
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.children;
        }
    }]);

    return ScrollToTop;
}(_react2.default.Component);

exports.default = ScrollToTop;