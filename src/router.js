/**
 * Created by chkui on 2017/5/11.
 * 通用路由工具组件
 */
'use strict';
import React from 'react'
import {isServerEvn, getComponentName} from './util'
import {HistoryType, getHisType} from './env'
import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'
import match from './lib/match'
import {get} from './lib/context'
import {Router, Route, Link, Redirect, StaticRouter, withRouter} from 'react-router-dom'//路由
const history = !isServerEvn() && (getHisType() === HistoryType.Browser ? createBrowserHistory() : createHashHistory());

/**
 * 浏览器操作类
 * @param path 匹配路径
 * @param url 浏览器路径
 * @constructor 构造器 new Browser(path, url)
 */
const Browser = function (path, url) {
    const _path = path,
        _url = url
    this.path = function () {
        return _path
    }
    this.url = function () {
        return _url
    }
}
Browser.prototype.local = function (url) {
    window.location.href = url
}
Browser.prototype.forward = function (url) {
    url ? history.push(url) : history.goForward();
}
Browser.prototype.back = function () {
    history.goBack();
}
Browser.prototype.isServerInitPath = function () {
    const route = get('initRoute')
    return this.path() === route.url
}

const MatchBrowser = function (path, url, route) {
    Browser.call(this, path, url)
    this.route = route
}
MatchBrowser.prototype = new Browser()

/**
 * 浏览器重定向高阶组件，用于重定向跳转。
 * 使用该组件时请注意数据突变的问题。
 * 1）被包裹的组件可以通过 props.browser 获取 browser对象。
 * @returns {function(*=)}
 */
const reRoute = () => {
    return (Wrap) => {
        class NextWrapper extends React.Component {
            constructor(...props) {
                super(...props);
            }

            shouldComponentUpdate(nextProps, nextState) {
                return this.props !== nextProps;
            }

            render() {
                const props = Object.assign({},
                    this.props,
                    {browser: new Browser(this.props.match.path, this.props.match.url)});
                return (<Wrap {...props} />)
            }
        }

        const ReRoute = withRouter(NextWrapper)
        ReRoute.displayName = `ReRoute(${getComponentName(Wrap)})`;
        return ReRoute;
    }
};

/**
 * 携带routes匹配的高阶组件，用于根据routes配置知道当前请求对应的route。
 * 1）reRouteMatch可以组合了所有的reRoute属性值。所以需要reRoute的功能不必重复组合
 * 2）将reRouteMatch和reRoute分离，主要是reRouteMatch进行正则运算较多，而不是所有组件都需要知道请求所属route
 * @returns {*}
 */
const reRouteMatch = () => {
    return (Wrap) => {
        class Wrapper extends React.Component {
            constructor(...props) {
                super(...props);
            }

            shouldComponentUpdate(nextProps, nextState) {
                return this.props !== nextProps;
            }

            render() {
                const browser = this.props.browser,
                    route = match(browser.path())
                const props = Object.assign({}, this.props);
                props.browser = new MatchBrowser(browser.path(), browser.url(), route)
                return (<Wrap {...props} />)
            }
        }

        const ReRouteMatch = reRoute()(Wrapper)
        ReRouteMatch.displayName = `ReRouteMatch(${getComponentName(Wrap)})`;
        return ReRouteMatch;
    }
}

export {Route, Link, withRouter, reRoute, reRouteMatch, history, Redirect, StaticRouter, Router}
