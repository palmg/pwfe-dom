/**
 * Created by chkui on 2017/5/27.
 */
'use strict';
import React from 'react'
import {reRoute} from '../../router'

/**
 *  内置A标签。
 *  1）标签提供服务器跳转和本地跳转2种模式。通过server参数配置。
 *  2) support all <a> attribute
 *  @param {object} props{
 *      {boolean} server:是否经过服务器跳转，默认为false。
 *  }
 */
const A = reRoute()(class extends React.Component {
    constructor(...props) {
        super(...props);
        this.hrefHandle = this.hrefHandle.bind(this);
    }

    hrefHandle() {
        const {href, browser} = this.props;
        href && browser.forward(href);
    }

    checkHref(props) {
        const {href, server, browser} = this.props
        if (server || browser.isServerInitPath()) {
            props.href = href
        } else {
            props.onClick = this.hrefHandle
        }
        delete props.server
    }

    render() {
        const props = Object.assign({}, this.props)
        check(props)

        return (
            <a {...props}>{this.props.children}</a>
        )
    }
});

export default A
