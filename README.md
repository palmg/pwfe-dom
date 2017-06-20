# pwfe-dom

palmg基础前端react组件基础工程。
pwfe—palmg web front end。

## 安装

 1. 安装git。
 2. 执行：npm install git+https://github.com/chkui/pwfe-dom.git --save-dev

### window cmd无法执行git命令的问题

 1. windows10以上版本且有powerShell脚本工具直接使用powerShell执行以上过程。
 2. window其他版本，需要用安装git后的git bash工具执行npm i
    命令。下载：https://git-for-windows.github.io/

## 使用
palmg相关的所有工程都使用es6。
es6:
```
//引入 Tag组件包
import Tag from 'pwfe-dom/tag'
```
es5:
```
//引入 Tag组件包
var Tag = require('pwfe-dom/tag')
```

## 功能介绍
### 配置
组件提供2个配置入口。分别是
env和Tag.setIcon, env用于配置