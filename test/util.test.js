/**
 * Created by chkui on 2017/6/19.
 */
const util = require('../util')

test('test util.getComponentName default value', ()=>{
    expect(util.getComponentName({})).toBe('Component');
})

test('test util.getComponentName set displayName', ()=>{
    const component = {}
    component.displayName = 'name'
    expect(util.getComponentName(component)).toBe('name');
})

test('test util.getComponentName set name', ()=>{
    const component = {}
    component.name = 'name'
    expect(util.getComponentName(component)).toBe('name');
})

test('test util.isServerEnv', ()=>{
    expect(util.isServerEvn()).toBe(false);
})

test('test util.safeGetValue has data', ()=>{
    const component = {}
    component.name = 'name'
    expect(util.safeGetValue(component, 'name')).toBe('name');
})

test('test util.safeGetValue no data', ()=>{
    const component = {}
    expect(util.safeGetValue(component, 'name')).toBeUndefined () // eval如果执行没有返回的话，得到的是undefined
})

test('test asyncLoader class', done => {
    const loader = new util.asyncLoader({loader:(onLoad)=>{
        setTimeout(()=>{
            onLoad('result')
        }, 100)
    }});

    loader.register((result)=>{
        expect(result).toBe('result');
        done()
    })
});
