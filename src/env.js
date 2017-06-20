/**
 * Created by chkui on 2017/6/20.
 */

/**
 * 环境配置包。为了统一所有项目的状态，目前支持运行模式配置和本地开发模式配置
 * 请在运行之前配置
 */

/**
 * 运行模式[DEV|SITE],开发模式和站点模式
 */
let __runMode = 'SITE',
    /**
     *标识是否为本地模式 [true|false]
     */
    __local = false

export const getRunMode = ()=>__runMode
export const setRunMode = (mode)=> __runMode = mode

export const getLocal = ()=>__local
export const setLocal = (local)=> __local = local