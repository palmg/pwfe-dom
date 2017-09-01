/**
 * Created by chkui on 2017/5/27.
 */
'use strict';
import React from 'react'
import {withRouter} from '../../router'

/**
 *  内置A标签。
 *  1）标签提供服务器跳转和本地跳转2种模式。通过server参数配置。
 *  @param {object} props{
 *      {string} href:要跳转的路径
 *      {boolean} server:是否经过服务器跳转，默认为false。
 *      {object} style: 样式
  *     {string} className: css样式
 *  }
 */
const A = withRouter(class extends React.Component {
    constructor(...props) {
        super(...props);
        const params = this.props;
        this.hrefHandle = this.hrefHandle.bind(this);
        //设定参数
        this.params = {};
        params.style && (this.params.style = params.style);
        params.className && (this.params.className = params.className);
        if (params.server) {
            this.params.href = params.href
        } else {
            this.params.onClick = this.hrefHandle;
        }
    }

    hrefHandle() {
        const {href, history} = this.props;
        href && history.push(href);
    }

    render() {
        return (
            <a {...this.params}>{this.props.children}</a>
        )
    }
});

export default A
