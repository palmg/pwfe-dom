/**
 * Created by chkui on 2017/6/27.
 */

import React from 'react'
import {Link} from '../router'
import entry from '../entry'
import {net} from '../net'
import {reRoute} from '../router'
import {getStore, connect, dispatch, subscribe}from '../flux'
import Tag from '../tag'
import {res} from './res/res'
const cn = require('classnames/bind').bind(require('./demo.scss'))

Tag.setIcon(res)
const reducer = (state = 'begin test', action) => {
    switch (action.type) {
        case 'test':
            return action.data
        default:
            return state
    }
}

const action = (data) => {
    return {
        type: 'test',
        data: data
    }
}

//路由列表
const routes = [{
    id: 'Comp1',
    url: '/',
    name: '演示文稿1',
    component: (cb) => {
        cb(Comp1)
    }
}, {
    id: 'Comp1Ex',
    url: '/comp1/:id',
    name: '演示文稿1',
    component: (cb) => {
        cb(Comp1)
    }
}, {
    id: 'Comp2',
    url: '/comp2',
    name: '演示文稿2',
    component: (cb) => {
        cb(Comp2)
    }
}, {
    id: 'Click',
    url: '/click',
    name: '异步测试',
    component: (cb) => {
        cb(Click)
    }
}]

//组件1
const Comp1 = props => {
    return (<Comp1Next/>)
}

const Comp1Next = reRoute()(props => {
    return (<div>
        A picture ：
        <Tag.Icon alt="测试图片" src="bank" onClick={(e)=>{
            props.browser.local(props.browser.url())
        }}/>
    </div>)
})

//组件2,附带redux效果
const Comp2 = props =>
    <div><Comp2Input /></div>

//触发redux数据更新的组件
class Comp2Input extends React.Component {
    constructor(...props) {
        super(...props)
        this.submitHandle = this.submitHandle.bind(this)
    }

    submitHandle() {//直接触发redux
        dispatch(action(this.input.value))
    }

    render() {
        return (
            <div>
                <input type="text" ref={ref => this.input = ref}/>
                <button onClick={this.submitHandle}>触发Action</button>
                <Comp2Value />
            </div>
        )
    }
}

const Comp2Value = connect((state) => {
    return {
        data: state.reducer
    }
})(props => <div>{props.data}</div>)


class Click extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {info: 'NONE'}
        this.clickHandle = this.clickHandle.bind(this)
    }

    clickHandle() {
        net({
            method: 'GET',
            url: 'https://file.mahoooo.com/res/policy/get'
        }).suc((result) => {
            this.setState({
                info: JSON.stringify(result)
            })
        }).suc((result) => {
            console.log(123)
        }).send()
    }

    render() {
        return (
            <div onClick={this.clickHandle}>{this.state.info}</div>
        )
    }
}

entry({
    reducer: {reducer},
    routes: routes,
    children: (<div>
        <Link to="/comp1/12850">comp1</Link>
        <Link to="/comp2">comp2</Link>
        <Link to="/click">click</Link>
    </div>),
    className: cn('demo'),
    renderCb: () => {
        console.log('render success!')
    }
})


subscribe(()=>{
    console.log('current store' , getStore().getState())
})
