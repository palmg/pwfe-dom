/**
 * Created by chkui on 2017/6/26.
 */

import React from 'react'
import {Route} from './router'
import bundle from './bundle'

/**
 * 前后端同构的App入口。如果需要二次开发，请参照这个模板
 * @param {object} props{
 *     init : {comp:后台初始化的组件,id:初始化组件对应的id}
 *     routes : 路由列表
 *     className : app的样式
 *     children : 子元素
 * }
 * @return {XML}
 * @constructor
 */
const App = props => {
    const {init, routes, className} = props;
    return (
        <div className={className}>
            {props.children}
            {routes.map(i=><Route key={i.id} exact path={i.url}
                                  component={bundle(init.id === i.id && init.comp, i.component)}/>)}
        </div>
    )
}

module.exports = App