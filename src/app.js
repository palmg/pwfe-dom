/**
 * Created by chkui on 2017/6/26.
 */

import React from 'react'
import {Route, Link} from './router'
import bundle from './bundle'

/**
 * 前后端同构的App入口。一般和
 * @param props
 * @return {XML}
 * @constructor
 */
const App = props => {
    const {init, routes} = props;
    return (
        <div>
            {routes.map(i=><Route key={i.id} exact path={i.url}
                                  component={bundle(init.id === i.id && init.comp, i.component)}/>)}
        </div>
    )
}

module.exports = App