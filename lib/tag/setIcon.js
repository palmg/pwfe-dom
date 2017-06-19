'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefImg = exports.getImg = exports.registerImgHandle = undefined;

var _empty = require('../../res/icon/empty.png');

var _empty2 = _interopRequireDefault(_empty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __img = void 0,
    __defImg = void 0,
    handleList = []; /**
                      * Created by chkui on 2017/6/19.
                      */
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

var getDefImg = exports.getDefImg = function getDefImg() {
    return __defImg;
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
 * @param defImg 默认图标
 */
var setImgFile = function setImgFile(img) {
    var defImg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _empty2.default;

    __img = img;
    executeHandle();
};

exports.default = setImgFile;