/**
 * Created by chkui on 2017/6/26.
 */
import {Component} from 'react'
import {Provider} from 'react-redux'
import {Router, history} from './router'
import {buildStore} from './flux'
import DefApp from './app'
/**
 * 单页面前端基础入口组件，提供整合pwfe-server的入口支持。
 * 1）必须使用已定义的前后端通用标准页面模板。必须包含title、REDUX_STATE、SERVER_PARAMS模板参数
 *-------------------------------------------------------------------------------------------------------------
 *<html lang="en">
 <head>
 <title><%- title %></title>
 </head>
 <body>
 <div id="root"><%- root %></div>
 <script>
 window.REDUX_STATE = <%- JSON.stringify(state) %>;
 window.SERVER_PARAMS =<%- JSON.stringify(params) %>
 </script>
 *</html>
 *-----------------------------------------------------------------------------------------------------------------
 2）路由列表必须使用标准结构
 *-----------------------------------------------------------------------------------------------------------------
 *[{
    id: 'comp1', //页面id，在列表中唯一
    url: '/', //页面对应的URL
    name: '演示文稿', //页面名称，会渲染到title媒体属性中
    component: (cb)=> { //加载组件的回调
        //after get component
        cb(require('./sub/comp1'))
    }
 *}]
 *-----------------------------------------------------------------------------------------------------------------
 *3）仅用于客户端
 *4）如果有特殊需要，可以参照这个模型进行开发。关键一定要生成首屏渲染的页面组件。
 * @param {object} reducer：redux的reducer。结构为{key:value}
 * @param {array} routes：路由列表
 * @param {component} app: 用于前后端同构渲染的app。该App会被传入 init参数和 routes参数。
 * init的结构为{comp 和 id} comp表示首屏渲染的页面以及页面对应的id。
 * routes就是定义的路由列表
 */
class Entry extends Component {
    constructor(...props) {
        super(...props)
        const innerWindow = window || {}, //防止window不存在时属性运算异常
            {reducer} = this.props
        this.store = buildStore(reducer, innerWindow.REDUX_STATE)
        this.serverParam = innerWindow.SERVER_PARAMS || {}
        this.state = {comp: false}
    }

    componentWillMount() {
        const routes = this.props.routes, initID = this.serverParam.initId || routes[0].id
        for (let i of routes) {
            if (i.id === initID) {
                i.component(comp=> {
                    this.setState({comp: comp})
                })
            }
        }
    }

    render() {
        const App = this.props.app || DefApp
        return this.state.Comp ? (
            <Provider store={store}>
                <Router history={history}>
                    <App init={{comp: this.state.comp, id: this.serverParam.initId}} routes={this.props.routes}/>
                </Router>
            </Provider>
        ) : null
    }
}

module.exports = Entry