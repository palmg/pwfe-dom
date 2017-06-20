/**
 * Created by chkui on 2017/6/20.
 */


import React from 'react'
import {reRoute} from '../router'
import renderer from 'react-test-renderer'

test("Tag.Img Test", ()=> {
    const InnerComp = props =>{
        return(
            <div>
                browser.local:{props.browser.local.toString()}
                browser.forward:{props.browser.forward.toString()}
                browser.back:{props.browser.back.toString()}
            </div>
        )
    }
    const Comp = reRoute()(InnerComp)
    const comp = renderer.create(<Comp />)

    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
})
