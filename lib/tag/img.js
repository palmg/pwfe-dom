'use strict';
/**
 * Created by chkui on 2017/5/27.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactScrollOverImg = require('react-scroll-over-img');

var _reactScrollOverImg2 = _interopRequireDefault(_reactScrollOverImg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 图片组件,参数说明见：https://github.com/palmg/react-scroll-over-img#readme
 * @param {string} props 可以设置任意图片属性
 * @constructor
 */
var Img = function Img(props) {
  return _react2.default.createElement(_reactScrollOverImg2.default, props);
};
exports.default = Img;