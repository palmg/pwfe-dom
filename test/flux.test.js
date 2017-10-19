/**
 * Created by chkui on 2017/6/20.
 */

import {buildStore, getStore, dispatch, subscribe} from '../flux'

test('test flux ', () => {
    const reducer1 = (state = {test1: 'test1'}, action) => {
        switch (action.type) {
            case 'test1':
                return action.data;
            default :
                return state;
        }
    };
    buildStore({reducer1: reducer1})
    expect(getStore().getState()).toEqual({reducer1: {test1: 'test1'}});
})

test('test action flux ', done => {
    const reducer1 = (state = {test1: 'test1'}, action) => {
            switch (action.type) {
                case 'test1':
                    return action.data;
                default :
                    return state;
            }
        },
        action1 = () => {
            return {
                type:'test1',
                data:{test1: 'dispatch data'}
            }
        }
    buildStore({reducer1: reducer1})
    subscribe(()=>{
        expect(getStore().getState()).toEqual({reducer1: {test1: 'dispatch data'}});
        done()
    })
    dispatch(action1())
})