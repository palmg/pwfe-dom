/**
 * Created by chkui on 2017/6/26.
 */
import React from 'react'
import Entry from '../entry'

const reducer = (state = 'begin test', action)=> {
    switch (action.type) {
        case 'test':
            return 'testing'
        default:
            return state
    }
}

const routes = [{
    id: 'comp1',
    url: '/',
    name: '演示文稿',
    component: (cb)=> {
        cb(Comp)
    }
}]

const Comp = props =>
    <div>Comp</div>

beforeAll(() => {
    window.SERVER_PARAMS = {id:'comp1'}
});

test("entry Test", ()=> {
    const comp = renderer.create(
        <Entry reducer={reducer} routes={routes} />
    )

    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
})


