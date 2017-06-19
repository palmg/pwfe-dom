/**
 * Created by chkui on 2017/5/11.
 * 通用路由工具组件
 */

import React from 'react'
import {isServerEvn, getComponentName} from '../util'
import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'
import {Router, Route, Link, Redirect, StaticRouter, withRouter} from 'react-router-dom'//路由
const history = !isServerEvn() && ("DEV" === __RunMode && __Local ? createHashHistory() : createBrowserHistory());

/**
 * 服务器控制类
 * @type {{local: ((p1:*)), forward: ((p1?:*)), back: (())}}
 */
const browser = {
    /**
     * 服务器跳转，使用该方法会导致服务器重加载并重新渲染页面。//TODO 暂时未实现
     * @param url 要跳转的地址
     */
    local: (url)=> {
        //TODO 服务器跳转暂未实现
    },
    /**
     * 浏览器向前跳转，使用该方法时不会发生服务器请求，只会发生react组件替换。
     * 1）若不传入url参数，则浏览器会发生前进一页的行为
     * 2）若传入url参数，浏览器会自行跳转到对应url
     * @param url
     */
    forward: (url) => {
        url ? history.push(url) : history.goForward();
    },
    /**
     * 浏览器回滚，不会发生服务器请求
     */
    back: ()=> {
        history.goBack();
    }
};

/**
 * 浏览器重定向高阶组件，用于重定向跳转。
 * 使用该组件时请注意数据突变的问题。
 * 1）被包裹的组件可以通过 props.browser 获取 browser对象。
 * @returns {function(*=)}
 */
const reRoute = () => {
    return (Wrap) => {
        class ReRoute extends React.Component {
            constructor(...props) {
                super(...props);
            }

            shouldComponentUpdate(nextProps, nextState) {
                return this.props !== nextProps;
            }

            render() {
                const props = Object.assign({}, this.props, {browser: browser});
                return (<Wrap {...props} />)
            }
        }
        ReRoute.displayName = `ReRoute(${getComponentName(Wrap)})`;
        return ReRoute;
    }
};

export {Route, Link, withRouter, reRoute, history, Redirect, StaticRouter, Router}
