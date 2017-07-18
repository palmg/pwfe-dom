# pwfe-dom

palmg基础前端react组件基础工程。

-----
pwfe—palmg web front end。

-----

## 安装

`npm install pwfe-dom`
### sass-node安装异常
 当nodejs版本较低时，安装node-sass会出现异常，请使用cnpm执行：
 ```bash
 $ npm rm node-sass
 $ cnpm install node-sass
 ```
详情请查看：https://github.com/sass/node-sass/issues/468
## 规范
**pwfe**中的所有前后端组件统一使用标准的`routes`列表作为路由配置：
```JavaScript
[{
    id: 'comp1', //页面id，在列表中唯一
    url: '/', //页面对应的URL
    name: '演示文稿', //页面名称，会渲染到title媒体属性中
    component: (call)=> { //加载组件的回调
        require.ensure([], require => {
            call(require('./sub/comp1'))
        }, 'comp1')
    }
}]
```
***参数说明***：

接口 | 说明
------------ | -------------
id | 表示该页面的唯一标识，在内部用于匹配和实现前后端同步渲染。
url | 页面对应的url。可以为`/path/name`或`/path/name/:params`的形式
name | 页面显示在浏览器title的名称。
component | 获取组件的回调方式。一般是(cb)=>{cb(Component)}的方式，无论通过什么方式获取React组件，最后使用cb(component)来返回。例如上面使用了require.ensure规范。

## 组件说明
### bundle 
页面分片高阶组件。该组件配合`routes`用于实现页面分片。
```JavaScript
import bundle from 'pwfe-dom/bundle'
<div>bundle(initComp, getComp)</div>
```
**参数说明**

接口 | 类型 | 说明
----- | ---- | --- 
initComp | Element | 优先初始化的组件。当传入该参数时，表示不必使用第二个参数的get回调去获取参数。而直接使用这个组件。
getComp | function | 异步获取参数的回调方法。该方法会在组件开始渲染时被调用。传入另外一个回调方法，实现异步加载。例如`(cb)=>{cb(require('./page'))}`，在获取组件后调用cb返回。
### App
App是用于前后端同构的入口，app中会调用bundle进行分片渲染。如果在业务工程中有特别需要，可以以app组件以模板进行二次开发。
```JavaScript
import React from 'react'
import {render} from 'react-dom';
import App from 'pwfe-dom/app'
render(
    (<App className={className} init={{comp:comp, id: initID}} routes={routes}>
        <Children />
    </App>),
    document.getElementById('root')
)
```
**参数说明**

接口 | 类型 | 说明
----- | ---- | --- 
init | object | 系统初始化渲染参数。对象中包含2个参数：`comp`和`id`。<br>`comp`：初始化渲染的页面组件，一般用于前后端同构渲染。这个组件会在第一次渲染之前就传入，放置前后端首屏异构。<br>`id`：初始渲染组件对应的路由表id。
routes | arrya | 路由列表。结构请看规范中的routes说明。
className | string | app组件样式。所有App中的子元素都会被一个`div`标签包裹，传入className可以设定这个`div`对应的样式。
children | react Element |App的子元素。App组件包括2个字元素，一个是路由列表`routes`中的页面组件，一个通过children在列表之前显示的组件。例如可以设定`Link`元素。
### entry
entry是提供前端入口的全局组件。与后端的serverApp组件对应。用于实现前端同构渲染功能。entry中使用默认的App和bundle实现了页面渲染和分片加载。如果有特殊的业务需求，可以使用自定义的App
```JavaScript
import entry from 'pwfe-dom/entry'

entry({
    reducer: reducer, 
    routes: routes,
    children: (<div>
        <Link to="/">comp1</Link>
        <Link to="/comp2">comp2</Link>
    </div>),
    className: cn('demo'),
    renderCb: ()=> {
        console.log('render success!')
    }
})
```
**参数说明**

接口 | 类型 | 说明
----- | ---- | --- 
reducer | object | redux对应使用的reducer。结构为`{key:function(){}}`
routes | array | **routes**列表，详见前文的**routes**说明
app | Element | 用于前后端同构渲染的组件。该App会被传入`init`参数和`routes`参数。不设置默认使用`pwfe-dom/app`组件
children | Element | 在app中显示的子元素，如果使用了自定义App组件，则会传入到props.children中。
className | string | app组件显示的样式，如果使用自定义的App组件，则会传入到props.className中。
renderCb | function | 渲染成功的回调方法

## tag
tag组件包含一系列对源生HTML标签进行扩展的组件：`Img`、`Icon`、`DynaIcon`、`A`。此外还提供了针对动态图片的设置功能——`setIcon`。
### Img
`Img`用于替换源生的html`<img/>`标签。目前还未实现Img的特性。计划实现的特性包括：
1. 实现图片滚当到可视区域加载。
2. 实现图片低清图和高清图分步加载。
3. 实现图片质量控制，配合后台文件服务器控制图片的大小、分辨质量等。
```JavaScript
import Tag from 'pwfe-dom/tag'
<Tag.Img src="myPic" className="myStyle"/>
```
接口  | 说明
------ | ------
all | Img组件支持所有`<img/>`源生属性和方法。

### Icon
`Icon`用于展示所有站内图标，它的作用是将资源文件和代码部分隔离开，然后异步加载，不影响业务执行。
1. 标签组件需要绑定资源路径使用，每增加一个图片，都需要增加一个资源引用。资源文件通过Tab.Icon设置（后文有介绍）
2. src参数传递的是资源标记，例如资源项 img={logo:"base64:adf"},此时传入的src="logo"。

```JavaScript
import Tag from 'pwfe-dom/tag'
<Tag.Icon src="myPicName" className="myStyle"/>
```

接口  | 说明
------ | ------
all | Icon组件支持所有`<img/>`源生属性和方法。
src | 与标准`<img/>`不同是，这里的src传入的是一个资源文件名称。详见`Tag.setIcon`部分说明。

### DynaIcon
支持激活特性的`Icon`组件。使用方式和`Icon`组件一样。
```JavaScript
import Tag from 'pwfe-dom/tag'
<Tag.DynaIcon src="myPicName" actSrc="myActPicName" act/>
```

接口 | 类型 | 说明
----- | ---- | --- 
all | object | 组件支持所有`<img/>`源生属性和方法。
src | string | 未激活时要显示的图标，src传入的是一个资源文件名称。详见`Tag.setIcon`部分说明。
actSrc | string | 激活后要显示的图标，actSrc传入的是一个资源文件名称。详见`Tag.setIcon`部分说明。
act | boolean | 是否激活标记true标识激活,需要动态传入。默认为false

### A
类同于HTML源生的`<a>`标签。提供控制浏览器端跳转和服务端跳转的特性。
```JavaScript
import Tag from 'pwfe-dom/tag'
<Tag.A href="/path/name" server/>
```

接口 | 类型 |说明
----- | ---- | --- 
href | string | 要跳转的路径。
server | boolean | 标记是否通过服务器跳转，默认为false。

### setIcon
用于设置系统图标。该工具方法用于设置`Icon`的数据。当图标未初始化时，`Icon`组件所有的实例都只显示默认的空白图片，当调用`setIcon`方法设置图标后，所有的图片都会更新为`Icon`组件src名称对应的图标。

`setIcon`设定的图标数据为扁平化对象结构：
```JavaScript
{
    myPicName:Base64Data=
    myAvatarName:Base64Data=
}
```
在代码的任意位置都可以使用setIcon方法来设置图标，以实现分片、异步等加载方法，例如下面的代码实现了分片在家独立的img模块：
```JavaScript
import Tag from 'pwfe-dom/tag'
require.ensure([], require => {
    Tag.setIcon(require("./res/img"))
}, 'res')
```
而在**"./res/img"**模块中，可以这样设定图片：
```JavaScript
/**
* 通过import或require引入图片，会将图标转换为base64。
*/
import logo from './icon/logo.png' 
const img = {
    logo
}
module.exports = img
```
**注意**，上面的代码需要设定webpack的图片loader。例如：
```
{
    test: /\.(png|jpg|svg)$/,
    use:['url-loader?limit=25000']
}
```

接口 | 类型 |说明
----- | ---- | --- 
img | object | 设定img的资源对象。
defImg | string | 设定默认图片。

## flux
`flux`提供了redux相关的支持功能。提供的接口包括`buildStore`、`getStore`。
### buildStore
`buildStore`提供构建[store][1]实例的功能。
```JavaScript
import {buildStore} from 'pwfe-dom/flux'
const store = buildStore(reducer, window.REDUX_STATE)
```
接口 | 类型 |说明
----- | ---- | ---
reducer | object | 设定`redux`的[reducer][2]。其结构为`{reducerName:function()}。
loaderStore | object | 设定已有的store对象，一般用于前后端同构渲染。

### getStore
获取[store][1]实例。需要先运行`buildStore`创建才能获取，否则返回`'undefined'`
```JavaScript
import {getStore} from 'pwfe-dom/flux'
const store = getStore()
```
除了直接使用`import {getStore} from './flux'`方式引入，还可以引入全局`flux`对象：
```JavaScript
import flux from 'pwfe-dom/flux'
const store = buildStore(reducer, window.REDUX_STATE)
const store = getStore()
```
### 设置日志输出等级
可以通过webpack的DefinePlugin设定redux的日志输出等级。通过以下方式设置：
```JavaScript
 new webpack.DefinePlugin({
    __FluxLogLevel:"'None'" //JSON.stringify('None')
 }）
```
设置变量说明

值 |说明
----- | ----
'None' | 什么日志也不输出
'Detail' | 输出Redux变更的详细日志，包括：变更之前的数据状态，变更之后的数据状态，以及变更的值。

## net
提供前后端异步请求的功能。前端请求用ajax实现、后台请求使用nodejs提供的http包实现。`net`模块中提供`net`、`get`和`post`方法。所有的请求返回一个`serverNetwork`实例或一个`browserNetwork`实例。通过函数式的方式来获取数据，回调提供3个方法`suc`、`err`，`headers`，例如：
```JavaScript
import {net,get,post} from 'pwfe-dom/net'
net({
    method: 'GET',
    url: '/myPath/value'
}).suc((data)=>{})
  .err((err,msg)=>{})
  .headers((header)=>{})

get('/myPath/value')
  .suc((data)=>{})
  .err((err,msg)=>{})
  .headers((header)=>{})

post('/myPath/value',{key:'kye',value:'value'})
  .suc((data)=>{})
  .err((err,msg)=>{})
  .headers((header)=>{})
```

### net方法
net传递的是一个options对象——`net(options)`。下面是options的参数：

接口 | 类型 | 说明
----- | ----- | -----
method | string | 请求的方法`GET`或`POST`。
url | string | 请求地址。
data | object或string | 要传递的数据。可以是一段字符串，或者是一个JSON结构的对象。
header | object | 请求的头部，格式为：`{"Accept":"application/json"}`。
query | object | 请求的查询字段，类似的get请求的？参数。
### get方法
GET请求。

接口 | 类型 | 说明
----- | ---- | ---
url | string | 请求地址。
query | object | 请求的查询字段，类似的get请求的？参数。
### post方法
POST请求。

接口 | 类型 | 说明
----- | ---- | ---
url | string | 请求地址。
query | object | 请求的查询字段，类似的get请求的？参数。

### router
*router* 提供路由、链接、跳转、重定向等功能。模块包含的组件有：`Route`, `Router`, `reRoute`, `Link`, `Redirect`, `StaticRouter`。
其中`Route`, `Router`, `Link`, `Redirect`, `StaticRouter` 基于`react-route`实现。请参看对应的说明。
 1. `Route`：https://reacttraining.com/react-router/web/api/Route
 2. `Router`：https://reacttraining.com/react-router/web/api/Router
 3. `Link`：https://reacttraining.com/react-router/web/api/Link
 4. `Redirect`： https://reacttraining.com/react-router/web/api/Redirect
 5. `StaticRouter`：仅用于后台渲染。https://reacttraining.com/react-router/web/api/StaticRouter。

`reRoute`是一个提供路由控制功能的高阶组件。采用react高阶组件的方式使用：
```JavaScript
const MyComponent = reRoute()(props=>{
    const browser = props.browser; //获取browser对象来操作路由
    return(<div>组件</div>)
})
```
browser提供了多个路由方法：

接口 | 说明
----- | ----
local | 通过服务器跳转。跳转石会访问服务器，浏览器重新刷新页面。原有的内存数据会丢失。<br> 调用方法：`browser.local('/myPath')`
forward | 浏览器向前跳转，使用该方法时不会发生服务器请求，只会发生react组件替换。<br>若不传入url参数，则浏览器会发生前进一页的行为。<br>若传入url参数，浏览器会自行跳转到对应url。<br>调用方法：`browser.forward('/myPath')`
back | 浏览器回滚，不会发生服务器请求。<br>调用方法：`browser.back()

### 设置history的类型
可以通过webpack的DefinePlugin设定react-route的history类型。通过以下方式设置：
```JavaScript
 new webpack.DefinePlugin({
    __History:"'Browser'" //JSON.stringify('Browser')
 }）
```
设置变量说明

值 |说明
----- | ----
'Hash' | 类似于http://domain(:port)/#/path这样格式的URL。可参看关于hash的说明:https://reacttraining.com/react-router/core/api/history
'Browser' | 标准的浏览器格式：http(s)://domain(:port)/path

## util
**util**提供了最基础的工具。包括`getComponentName`、`isServerEvn`、`asyncLoader`和`safeGetValue`。
方法 | 说明
----- | ----
getComponentName | 获取react组件的名称。
isServerEvn | 获取当前的运行环境是服务器端还是浏览器端。
asyncLoader | 异步加载类。用于等待某一项任务完成，然后通知所有的处理器。
safeGetValue | 从对象中安全获取属性。
案例：
```JavaScript
//import util from 'pwfe-dom/util' 全局引用
import {getComponentName} from 'pwfe-dom/util'
console.log(getComponentName(component))
```
`asyncLoader`使用方法:
```JavaScript
//import util from 'pwfe-dom/util' 全局引用
import {asyncLoader} from 'pwfe-dom/util'
/**
* 新建一个asyncLoader实例。
* 新建时传入回调方法，表示需要加载的内容。
* call由asyncLoader传入，加载的内容成功后，需要调用call方法
*/
const loader = new asyncLoader({
    loader: (call)=> {
        require.ensure([], require => {
            call(require('superagent'))
        }, 'request')
    }
})
//注册一个处理器，
//当第一个处理器被调用时，上面传入的loader方法会被触发。
//laoder方法执行回调之后
//
loader.register((result)=>{
    console.log(resule)
})
```


  [1]: http://cn.redux.js.org/docs/basics/Store.html
  [2]: http://cn.redux.js.org/docs/basics/Reducers.html
