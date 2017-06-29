/**
 * Created by chkui on 2017/6/10.
 */

import React from 'react'

/**
 * 页面分片高阶组件。该组件配合`routes`用于实现页面分片。
 * @param initComponent
 * @param getComponent
 * @return {{new(...[*]): {async: (function(*=)), render: (function()), componentWillMount: (function())}}}
 */
const bundle = (initComponent, getComponent)=> {
    return class extends React.Component {
        constructor(...props) {
            super(...props)
            this.state = {
                Comp: initComponent
            }
            this.async = this.async.bind(this)
        }

        async(Comp) {
            this.setState({
                Comp: Comp
            })
        }

        componentWillMount() {
            !this.state.Comp && getComponent(this.async)
        }

        render() {
            let {Comp} = this.state;
            Comp && Comp.default &&
            (Comp = Comp.default) &&
            //增加注解说明需要将export default {} 替换为 module.exports = {}
            (console.error("In current version 'require.ensure' has an issue that can't support es6 'export default {}' syntax. " +
                "Now replace Comp=Comp.default with force, but it could lead to other problems." +
                "If using 'require.ensure' to export a module, 'module.export = object' expression is appropriate."))
            return Comp ? (<Comp {...this.props}/>) : null;
        }
    }
}

export default bundle