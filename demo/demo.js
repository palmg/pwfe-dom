/**
 * Created by chkui on 2017/6/27.
 */

import {Link} from '../router'
import {render} from 'react-dom'
import entry from '../entry'
import {net} from '../net'
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
},{
    id: 'Click',
    url: '/Click',
    name: '异步测试',
    component: (cb)=> {
        cb(Click)
    }
}]

const Comp1 = props =>
    <div>Comp1</div>

const Comp2 = props =>
    <div>Comp2</div>

class Click extends React.Component{
    constructor(...props){
        super(...props)
        this.state = {info:'NONE'}
        this.clickHandle = this.clickHandle.bind(this)
    }

    clickHandle(){
        net({
            method:'GET',
            url:'https://file.mahoooo.com/res/policy/get'
        }).suc((result)=>{
            this.setState({
                info:JSON.stringify(result)
            })
        }).suc((result)=>{
            console.log(123)
        }).send()
    }

    render(){
        return(
            <div onClick={this.clickHandle}>{this.state.info}</div>
        )
    }
}

entry({
    reducer: {reducer},
    routes: routes,
    children: (<div>
        <Link to="/">comp1</Link>
        <Link to="/comp2">comp2</Link>
        <Link to="/Click">Click</Link>
    </div>),
    className: cn('demo'),
    renderCb: ()=> {
        console.log('render success!')
    }
})

