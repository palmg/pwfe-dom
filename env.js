"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
var getRunMode = exports.getRunMode = function getRunMode() {
    var __runMode = void 0;
    !__runMode && function () {
        try {
            __runMode = __RunMode;
        } catch (e) {}
    }();
    return __runMode || "SITE";
};

var getLocal = exports.getLocal = function getLocal() {
    var __local = void 0;
    !__local && function () {
        try {
            __local = __Local;
        } catch (e) {}
    }();
    return typeof __local === "undefined" ? false : __local;
};