"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by chkui on 2017/6/19.
 */
var __img = void 0,
    handleList = [],
    __defImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTguNzQgMTI3LjUxIj4NCiAgICA8ZGVmcz4NCiAgICAgICAgPHN0eWxlPi5jbHMtMXtmaWxsOiM2MDkyRTA7fTwvc3R5bGU+DQogICAgPC9kZWZzPg0KICAgIDx0aXRsZT7otYTmupAgMTwvdGl0bGU+DQogICAgPGcgaWQ9IuWbvuWxgl8yIiBkYXRhLW5hbWU9IuWbvuWxgiAyIj4NCiAgICAgICAgPGcgaWQ9IuWbvuWxgl8xLTIiIGRhdGEtbmFtZT0i5Zu+5bGCIDEiPg0KICAgICAgICAgICAgPGcgaWQ9Il/nvJbnu4RfIiBkYXRhLW5hbWU9IiZsdDvnvJbnu4QmZ3Q7Ij4NCiAgICAgICAgICAgICAgICA8ZyBpZD0iX+e8lue7hF8yIiBkYXRhLW5hbWU9IiZsdDvnvJbnu4QmZ3Q7Ij4NCiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9Il/lpI3lkIjot6/lvoRfIiBkYXRhLW5hbWU9IiZsdDvlpI3lkIjot6/lvoQmZ3Q7IiBjbGFzcz0iY2xzLTEiDQogICAgICAgICAgICAgICAgICAgICAgICAgIGQ9Ik0xMjguMDgsMCwwLDI1LjM4VjExOC43YzAsNC4yNCw1LjY1LDguODEsMTgsOC44MXMxOC00LjU3LDE4LTguODFWNTYuMUw2MS4zNCw2Ny4xOHY1MS4zOHMwLC4wOSwwLC4xNGMwLDQuMjQsNS42NSw4LjgxLDE4LDguODFzMTgtNC41NywxOC04LjgxaDBWMzcuMzJMMzAuNjYsNDkuNzN2NjIuNDRjLTIuOTQtMS4zOC03LjExLTIuMjgtMTIuNjItMi4yOHMtOS42OC45MS0xMi42MiwyLjI4VjI5LjgxTDEyMi42Niw2LjYzVjExOC43YzAsNC4yNCw1LjY1LDguODEsMTgsOC44MXMxOC00LjU3LDE4LTguODFWMTcuMzRaTTkyLDExMi4xOGMtMi45NC0xLjM4LTcuMTEtMi4yOS0xMi42My0yLjI5cy05LjY3LjktMTIuNjEsMi4yOFY2Ny42NEw5Miw2My4zWm0tMTIuNjMsMTBjLTcuMDcsMC0xMi44MS0xLjU0LTEyLjgxLTMuNDRzNS43My0zLjQ0LDEyLjgxLTMuNDQsMTIuODEsMS41NCwxMi44MSwzLjQ0Uzg2LjQ0LDEyMi4xOCw3OS4zNywxMjIuMThaTTkyLDQzLjg5VjU3Ljc4bC0yNy42NSw0LjhMNDIuNDEsNTNaTTE4LDExNS4zMWM3LjA3LDAsMTIuODEsMS41NCwxMi44MSwzLjQ0cy01LjczLDMuNDQtMTIuODEsMy40NC0xMi44MS0xLjU0LTEyLjgxLTMuNDRTMTEsMTE1LjMxLDE4LDExNS4zMVpNMTUzLjMyLDIwLjV2OTEuNjdjLTIuOTQtMS4zOC03LjExLTIuMjgtMTIuNjItMi4yOHMtOS42OC45MS0xMi42MiwyLjI4VjYuMjNaTTE0MC43LDEyMi4xOGMtNy4wNywwLTEyLjgxLTEuNTQtMTIuODEtMy40NHM1LjczLTMuNDQsMTIuODEtMy40NCwxMi44MSwxLjU0LDEyLjgxLDMuNDRTMTQ3Ljc4LDEyMi4xOCwxNDAuNywxMjIuMThaIi8+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+";

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
    var defImg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __defImg;

    __img = img;
    __defImg = defImg;
    executeHandle();
};

exports.default = setImgFile;