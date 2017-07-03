'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../../util');

var _setIcon = require('./setIcon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chkui on 2017/5/27.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * 标签组件。
 * 1）标签组件需要绑定资源路径使用，资源路径的配置文件默认在res/index中。每增加一个图片，都需要增加一个资源引用。
 * 2）src参数传递的是资源标记，例如资源项 img={logo:"base64:adf"},此时传入的src="logo"。
 * 3）标签组件的作用1：将资源文件和源代码隔离开，便于分部加载。
 * 4）支持所有img标签原有属性
 * 5）为了提升比对效率。组件内部使用了shouldComponentUpdate进行限制，只允许初始化时设定样式和属性，之后不再接受任何修改。
 * 6）可以使用dynaIcon来提供图片切换指定功能
 * 7）id用于标记后台异步渲染的文件名称，所以Icon组件中的img元素id属性会被占用
 * @param {object} props {
 *     {object} style: 样式
 *     {string} className: css样式
 *     {string} alt：图片说明
 *     {string} src: 图片路径，这里直接使用资源文件中的标记项
 * }
 * @returns {XML}
 * @constructor
 */
var Icon = function (_React$Component) {
    _inherits(Icon, _React$Component);

    _createClass(Icon, null, [{
        key: 'getServerImg',
        value: function getServerImg(id) {
            var el = document.getElementById(id);
            return el ? el.src : false;
        }
    }]);

    function Icon() {
        var _ref;

        _classCallCheck(this, Icon);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this2 = _possibleConstructorReturn(this, (_ref = Icon.__proto__ || Object.getPrototypeOf(Icon)).call.apply(_ref, [this].concat(props)));

        var params = _this2.props,
            src = params.src;
        var _img = (0, _setIcon.getImg)();
        _this2.state = _img ? {
            img: _img[src]
        } : {};
        /*
        * 如果是服务端渲染，会将当前的图片标记赋值为图片id
        * 如果是客户端渲染，初始化时会去提取现在的图片base64编码，保证首屏渲染和后端完全一致。
        * */
        (0, _util.isServerEvn)() ? _this2.id = src : !_this2.state.img && function () {
            var base64Img = Icon.getServerImg(src);
            base64Img && (_this2.state.img = base64Img) && (_this2.id = src);
            _this2.id = src;
        }();
        _this2.loadImg = _this2.loadImg.bind(_this2);
        return _this2;
    }

    _createClass(Icon, [{
        key: 'loadImg',
        value: function loadImg(src) {
            var _this = this;
            (0, _setIcon.registerImgHandle)(src, function (img) {
                _this.setState({
                    img: img
                });
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.src !== this.props.src) {
                this.loadImg(nextProps.src);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            !this.state.img && this.loadImg(this.props.src);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = Object.assign({}, this.props),
                img = this.state.img;
            props.src = img ? img : (0, _setIcon.getDefImg)();
            this.id && (props.id = this.id);
            return _react2.default.createElement('img', props);
        }
    }]);

    return Icon;
}(_react2.default.Component);

exports.default = Icon;