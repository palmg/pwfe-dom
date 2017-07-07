'use strict';

var _icon = require('./lib/tag/icon');

var _icon2 = _interopRequireDefault(_icon);

var _dynaIcon = require('./lib/tag/dynaIcon');

var _dynaIcon2 = _interopRequireDefault(_dynaIcon);

var _img = require('./lib/tag/img');

var _img2 = _interopRequireDefault(_img);

var _a = require('./lib/tag/a');

var _a2 = _interopRequireDefault(_a);

var _setIcon = require('./lib/tag/setIcon');

var _setIcon2 = _interopRequireDefault(_setIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = {
  /**
   * 图片组件
   * @param {string} props 可以设置任意图片属性
   * @constructor
   */
  Img: _img2.default,
  /**
   * 设置当前的图标对象，当站内图标初始化完毕之后，需要调用这个方法来告知组件图标已经异步加载完成
   * @param img
   */
  setIcon: _setIcon2.default,
  /**
   * 标签组件。
   * 1）标签组件需要绑定资源路径使用，资源路径的配置文件默认在res/index中。每增加一个图片，都需要增加一个资源引用。
   * 2）src参数传递的是资源标记，例如资源项 img={logo:"base64:adf"},此时传入的src="logo"。
   * 3）标签组件的作用1：将资源文件和源代码隔离开，便于分部加载。
   * @param {object} props {
   *     {object} style: 样式
   *     {string} className: css样式
   *     {string} alt：图片说明
   *     {string} src: 图片路径，这里直接使用资源文件中的标记项
   * }
   * @returns {XML}
   * @constructor
   */
  Icon: _icon2.default,
  /**
   * 提供激活支持的Icon组件
   * 1）标签组件需要绑定资源路径使用，资源路径的配置文件默认在res/index中。每增加一个图片，都需要增加一个资源引用。
   * 2）src参数传递的是资源标记，例如资源项 img={logo:"base64:adf"},此时传入的src="logo"。
   * 3）标签组件的作用1：将资源文件和源代码隔离开，便于分部加载。
   * @param {object} style 样式
   * @param {string} className css样式
   * @param {string} alt 图标别名
   * @param {string} src 图片标识
   * @param {string} actSrc 激活图片标识
   * @param {boolean} act 是否激活标记true标识激活,需要动态传入
   * @constructor
   */
  DynaIcon: _dynaIcon2.default,
  /**
   *  内置A标签。
   *  1）标签提供服务器跳转和本地跳转2种模式。通过server参数配置。
   *  @param {object} props{
   *      {string} href:要跳转的路径
   *      {boolean} server:是否经过服务器跳转，默认为false。
   *      {object} style: 样式
   *      {string} className: css样式
   *  }
   */
  A: _a2.default
};

// commonjs
/**
 * Created by chkui on 2017/5/27.
 */

module.exports = Tag;
// es6 default export compatibility
module.exports.default = module.exports;