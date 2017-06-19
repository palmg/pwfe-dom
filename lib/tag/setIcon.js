"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by chkui on 2017/6/19.
 */

var __img = void 0,
    handleList = [];

var registerImgHandle = exports.registerImgHandle = function registerImgHandle(id, callback) {
    __img ? callback(__img[id]) : handleList.push({ id: id, callback: callback });
};

/**
 * 获取__img实例
 * @return {*}
 */
var getImg = exports.getImg = function getImg() {
    return __img;
};

var executeHandle = function executeHandle() {
    handleList.map(function (i) {
        return i.callback(__img[i.id]);
    });
    handleList = null;
};

/**
 * 设置当前的图标对象，当站内图标初始化完毕之后，需要调用这个方法来告知组件图标已经异步加载完成
 * @param img
 */
var setImgFile = function setImgFile(img) {
    __img = img;
    executeHandle();
};

exports.default = setImgFile;