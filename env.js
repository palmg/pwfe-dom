'use strict';

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
 * 运行模式[DEV|SITE],开发模式和站点模式
 */
var __runMode = 'SITE',

/**
 *标识是否为本地模式 [true|false]
 */
__local = false;

var getRunMode = exports.getRunMode = function getRunMode() {
  return __runMode;
};
var setRunMode = exports.setRunMode = function setRunMode(mode) {
  return __runMode = mode;
};

var getLocal = exports.getLocal = function getLocal() {
  return __local;
};
var setLocal = exports.setLocal = function setLocal(local) {
  return __local = local;
};