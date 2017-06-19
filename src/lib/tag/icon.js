/**
 * Created by chkui on 2017/5/27.
 */
import React from 'react'
import {isServerEvn} from '../../util'
import {registerImgHandle, getImg, getDefImg} from './setIcon'

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
class Icon extends React.Component {
    static getServerImg(id) {
        const el = document.getElementById(id)
        return el ? el.src : false;
    }

    constructor(...props) {
        super(...props);
        const params = this.props, src = params.src
        const _img = getImg()
        this.state = _img ? {
            img: _img[src]
        } : {}
        /*
        * 如果是服务端渲染，会将当前的图片标记赋值为图片id
        * 如果是客户端渲染，初始化时会去提取现在的图片base64编码，保证首屏渲染和后端完全一致。
        * */
        isServerEvn() ? (this.id = src) : !this.state.img && (()=>{
            const base64Img = Icon.getServerImg(src)
            base64Img && (this.state.img = base64Img) && (this.id = src)
            this.id = src;
        })();
        this.loadImg = this.loadImg.bind(this);
    }

    loadImg(src) {
        const _this = this;
        registerImgHandle(src, (img)=> {
            _this.setState({
                img: img
            })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.img !== nextState.img
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.loadImg(nextProps.src)
        }
    }

    componentDidMount() {
        !this.state.img && this.loadImg(this.props.src)
    }

    render() {
        const props = Object.assign({}, this.props), {img} = this.state;
        props.src = img ? img : getDefImg()
        this.id && (props.id = this.id)
        return (
            <img {...props}/>
        )
    }
}

export default Icon
