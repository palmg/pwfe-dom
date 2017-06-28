/**
 * Created by chkui on 2017/6/27.
 */

import React from 'react'
import {Link} from '../src/router'
import {render} from 'react-dom'
import entry from '../src/entry'
const cn = require('classnames/bind').bind(require('./demo.scss'))

const reducer = (state = 'begin test', action)=> {
    switch (action.type) {
        case 'test':
            return 'testing'
        default:
            return state
    }
}

const routes = [{
    id: 'Comp1',
    url: '/',
    name: '演示文稿1',
    component: (cb)=> {
        cb(Comp1)
    }
}, {
    id: 'Comp2',
    url: '/comp2',
    name: '演示文稿2',
    component: (cb)=> {
        cb(Comp2)
    }
},]

const Comp1 = props =>
    <div>Comp1</div>

const Comp2 = props =>
    <div>Comp2</div>

entry({
    reducer: {reducer},
    routes: routes,
    children: (<div>
        <Link to="/">comp1</Link>
        <Link to="/comp2">comp2</Link>
    </div>),
    className: cn('demo'),
    renderCb: ()=> {
        console.log('render success!')
    }
})

