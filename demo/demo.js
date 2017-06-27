/**
 * Created by chkui on 2017/6/27.
 */

import React from 'react'
import {render} from 'react-dom'
import entry from '../src/entry'

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
},{
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
    reducer:{reducer},
    routes: routes,
    renderCb: ()=>{console.log('render success!')}
})

