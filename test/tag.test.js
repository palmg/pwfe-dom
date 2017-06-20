/**
 * Created by chkui on 2017/6/20.
 */

import React from 'react'
import Tag from '../tag'
import {HashRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'
beforeAll(() => {
    Tag.setIcon({
        test:"base64:test",
        act1:"base64:act1",
        act2:"base64:cat2"
    })
});

test("Tag.A Test", ()=> {
    const comp = renderer.create(
        <HashRouter>
            <Tag.A>https://github.com/palmg/pwfe-dom</Tag.A>
        </HashRouter>
    )

    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
})

test("Tag.Img Test", ()=> {
    const comp = renderer.create(
        <Tag.Img src="file.icon"/>
    )

    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
})

test("Tag.Icon Test none", ()=> {
    const comp = renderer.create(
        <Tag.Icon/>
    )

    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
})

test("Tag.Icon Test value", ()=> {
    const comp = renderer.create(
        <Tag.Icon src="test" alt="测试图片" style={{width:'20px'}} className="css"/>
    )

    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
})

test("Tag.Icon DynaIcon", ()=> {
    const comp = renderer.create(
        <Tag.DynaIcon src="act1" actSrc="act2" alt="测试图片" style={{width:'20px'}} className="css"/>
    )

    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
})
test("Tag.Icon DynaIcon act", ()=> {
    const comp = renderer.create(
        <Tag.DynaIcon src="act1" actSrc="act2" act alt="测试图片" style={{width:'20px'}} className="css"/>
    )

    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
})