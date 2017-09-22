/**
 * Created by chkui on 2017/5/27.
 */
'use strict';
import Icon from './lib/tag/icon'
import DynaIcon from './lib/tag/dynaIcon'
import Img from 'react-scroll-over-img'
import A from './lib/tag/a'
import setIcon from './lib/tag/setIcon'

const Tag = {
    /**
     * 图片组件，支持滚入自动加载
     * @param onOff: 图片延迟加载的开关，默认会使用全局的onOff配置参数
     * @param loadSrc: 图片未滚入显示区域时异步加载图片地址,应该是一个很小切易于快速加载的图片，大小建议小于2KB，默认为一张空图片。
     * @param loadClassName: 图片异步加载时的样式
     * @param src: 图片滚入显示区域时显示的图片地址
     * @param className: 图片默认样式，在加载时会和loadClass叠加
     * @constructor
     */
    Img,
    /**
     * 设置当前的图标对象，当站内图标初始化完毕之后，需要调用这个方法来告知组件图标已经异步加载完成
     * @param img
     */
    setIcon,
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
    Icon,
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
    DynaIcon,
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
    A
};

module.exports = Tag;
module.exports.default = module.exports;
