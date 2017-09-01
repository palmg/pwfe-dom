/**
 * Created by chkui on 2017/6/9.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 提供激活支持的Icon组件
 * 1）标签组件需要绑定资源路径使用，资源路径的配置文件默认在res/index中。每增加一个图片，都需要增加一个资源引用。
 * 2）src参数传递的是资源标记，例如资源项 img={logo:"base64:adf"},此时传入的src="logo"。
 * 3）标签组件的作用1：将资源文件和源代码隔离开，便于分部加载。
 * 4）支持所有img标签原有属性
 * @param {object} props {
 *  {object} style 样式
 *  {string} className css样式
 *  {string} alt 图标别名
 *  {string} src 图片标识
 *  {string} actSrc 激活图片标识
 *  {boolean} act 是否激活标记true标识激活,需要动态传入
 * }
 * @constructor
 */
var DynaIcon = function DynaIcon(props) {
  var params = Object.assign({}, props);
  params.act && (params.src = params.actSrc);
  delete params.actSrc;
  delete params.act;
  return _react2.default.createElement(_icon2.default, params);
};

exports.default = DynaIcon;