"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by chkui on 2017/6/19.
 */
var __img = void 0,
    handleList = [],
    __defImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMoAAADKCAYAAADkZd+oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2YmI5NjAwMy0wZjdjLTRkYWEtODMxMC05YjcwYzVhYTk2YWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUU5QzgzQzY0MTI0MTFFN0JGNTFEQzI4RDQ1NTMyMDciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUU5QzgzQzU0MTI0MTFFN0JGNTFEQzI4RDQ1NTMyMDciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZDA5NGU2ODItM2M0Ni0xYzRhLWE4Y2UtMDcwOGVlZGRhZGNlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MzAxYjRkN2ItMmYwNi0xMWU3LWJmZjgtY2Y1NmI0OGFlYjMxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+cQqqIwAAAaJJREFUeNrs0zENAAAIBDHAv+fHARNjK+GS6yQF3EYCMAoYBYwCRgGjgFHAKIBRwChgFDAKGAWMAkYBjAJGAaOAUcAoYBQwChgFMAoYBYwCRgGjgFHAKIBRwChgFDAKGAWMAkYBjAJGAaOAUcAoYBQwChgFMAoYBYwCRgGjgFHAKIBRwChgFDAKGAWMAkYBjAJGAaOAUcAoYBQwChgFMAoYBYwCRgGjgFHAKIBRwChgFDAKGAWMAkYBowBGAaOAUcAoYBQwChgFMAoYBYwCRgGjgFHAKIBRwChgFDAKGAWMAkYBowBGAaOAUcAoYBQwChgFMAoYBYwCRgGjgFHAKIBRwChgFDAKGAWMAkYBowBGAaOAUcAoYBQwChgFMAoYBYwCRgGjgFHAKGAUwChgFDAKGAWMAkYBowBGAaOAUcAoYBQwChgFMAoYBYwCRgGjgFHAKGAUwChgFDAKGAWMAkYBowBGAaOAUcAoYBQwChgFMAoYBYwCRgGjgFHAKGAUwChgFDAKGAWMAkYBowBGAaOAUcAoYBQwChgFjAIYBT6sAAMAS8gEkf6ULmwAAAAASUVORK5CYII=";
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