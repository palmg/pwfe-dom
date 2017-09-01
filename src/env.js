/**
 * Created by chkui on 2017/6/20.
 */
'use strict';
/**
 * dom包运行环境配置。通常情况下可以使用webpack的DefinePlugin插件来定义
 */

/**
 * 宏定义history模式的枚举值
 * @type {{Hash: number, Browser: number}}
 */
export const HistoryType = {
    Hash:1, //hash模式
    Browser:2 //浏览器路径模式
}

/**
 * 获取history的模式，可以通过DefinePlugin.__History设定值，取值[Hash|Browser],
 * 定义方式：
 * {
 *    __History:JSON.stringify('Browser')或"'Browser'"
 * }
 */
export const getHisType = ()=>{
    let history;
    try{
        history = HistoryType[__History]
    }catch(e){
        console.warn('DefinePlugin plugin must define __HistoryType value ')
    }
    return history || HistoryType.Hash
}

/**
 * 宏定义Redux输出日志的枚举值
 * @type {{None: number, Detail: number}}
 */
export const FluxLogLevel = {
    None:1, //什么都不输出
    Detail:2 //输出每一次store变更的前后值以及变更内容
}

/**
 * 获取redux的日志输出等级，可以通过DefinePlugin.__FluxLogLevel设定值，取值[Hash|Browser],
 * 定义方式：
 * {
 *    __FluxLogLevel:JSON.stringify('Detail')或"'Detail'"
 * }
 */
export const getFluxLogLevel = () => {
    let logLevel;
    try{
        logLevel = FluxLogLevel[__FluxLogLevel]
    }catch(e){
        console.warn('DefinePlugin plugin must define __FluxLogLevel value ')
    }
    return logLevel || FluxLogLevel.Detail
}