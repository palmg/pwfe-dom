/**
 * Created by chkui on 2017/6/26.
 */
'use strict';
import React from 'react'
import ScrollToTop from './lib/app/scrollToTop'
import {Route, Switch} from './router'
import bundle from './bundle'
import {isElement} from './util'

const element = (el) => {
    if (isElement(el)) {
        return el
    } else {
        const El = el;
        return (<El/>)
    }
}

/**
 * 前后端同构的App入口。如果需要二次开发，请参照这个模板
 * @param {object} props{
 *     init : {comp:后台初始化的组件,id:初始化组件对应的id}
 *     routes : 路由列表
 *     className : app的样式
 *     header: 头部元素
 *     children : 内容子元素
 *     footer:页脚元素
 * }
 * @return {XML}
 * @constructor
 */
const App = props => {
    const {init, routes, className, header, children, footer} = props;
    return (
        <div className={className}>
            {element(header)}
            {element(children)}
            <Switch>
                {routes.map(i => {
                    const params = i.url ? {
                        key: i.id,
                        component: bundle(init.id === i.id && init.comp, i.component),
                        exact: true,
                        path: i.url
                    } : {
                        key: i.id,
                        component: bundle(init.id === i.id && init.comp, i.component)
                    }
                    return (<Route {...params} />)
                })}
            </Switch>
            {element(footer)}
        </div>
    )
}

module.exports = App;
module.exports.default = module.exports;