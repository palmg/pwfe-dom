/**
 * Created by chkui on 2017/6/26.
 */
import React from 'react'
import Entrance from '../entry'
import {shallow} from 'enzyme';
//import renderer from 'react-test-renderer'

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
    const comp = shallow(
        <Entrance reducer={{reducer}} routes={routes} />
    )

    expect(comp.text()).toEqual('');
})


