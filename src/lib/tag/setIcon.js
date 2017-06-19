/**
 * Created by chkui on 2017/6/19.
 */
import emptyImg from '../../res/icon/empty.png'

let __img, __defImg, handleList = []

export const registerImgHandle = (id, callback) => {
    __img ? callback(__img[id]) : handleList.push({id, callback})
}

/**
 * 获取__img实例
 * @return {*}
 */
export const getImg = ()=> {
    return __img
}

export const getDefImg = ()=> {
    return __defImg
}

const executeHandle = ()=> {
    handleList.map(i=>i.callback(__img[i.id]));
    handleList = null;
}

/**
 * 设置当前的图标对象，当站内图标初始化完毕之后，需要调用这个方法来告知组件图标已经异步加载完成
 * @param img
 * @param defImg 默认图标
 */
const setImgFile = (img, defImg = emptyImg) => {
    __img = img
    executeHandle()
}

export default setImgFile