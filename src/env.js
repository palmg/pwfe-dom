/**
 * Created by chkui on 2017/6/20.
 */

/**
 * 环境配置包。为了统一所有项目的状态，目前支持运行模式配置和本地开发模式配置
 * 请在运行之前配置
 */
/**
 * 获取运行模式[DEV|SITE],如果已经通过webpack预设了模式__RunMode。则返回预设值，如果没有，返回默认值
 * @return {string}
 */
export const getRunMode = ()=> {
    let __runMode
    !__runMode && (()=> {
        try {
            __runMode = __RunMode
        } catch (e) {
        }
    })()
    return __runMode || "SITE"
}

export const getLocal = ()=> {
    let __local
    !__local && (()=> {
        try {
            __local = __Local
        } catch (e) {
        }
    })()
    return typeof __local === "undefined" ? false : __local
}