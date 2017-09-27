/**
 * Created by chkui on 2017/6/20.
 */


import React from 'react'
import {reRoute, reRouteMatch, StaticRouter} from '../router'
import renderer from 'react-test-renderer'

test("Tag.router reRoute", () => {
    const InnerComp = props => {
        return (
            <div>
                browser.local:{props.browser.local.toString()}
                browser.forward:{props.browser.forward.toString()}
                browser.back:{props.browser.back.toString()}
            </div>
        )
    }
    const Comp = reRoute()(InnerComp)
    const comp = renderer.create(<StaticRouter context={{}}><Comp /></StaticRouter>)
    let tree = comp.toJSON(); //withRoute 测试异常
    expect(tree).toMatchSnapshot();
})

test("Tag.router reRouteMatch", () => {
    const InnerComp = props => {
        return (
            <div>
                browser.local:{props.browser.local.toString()}
                browser.forward:{props.browser.forward.toString()}
                browser.back:{props.browser.back.toString()}
            </div>
        )
    }
    const Comp = reRouteMatch()(InnerComp)
    const comp = renderer.create(<StaticRouter context={{}}><Comp /></StaticRouter>)
    let tree = comp.toJSON(); //withRoute 测试异常
    expect(tree).toMatchSnapshot();
})