/**
 * Created by chkui on 2017/6/19.
 */


let __img, handleList = []

export const registerImgHandle = (id, callback) => {
    __img ? callback(__img[id]) : handleList.push({id, callback})
}

const executeHandle = ()=> {
    handleList.map(i=>i.callback(__img[i.id]));
    handleList = null;
}

/**
 * 设置当前的图标对象，当站内图标初始化完毕之后，需要调用这个方法来告知组件图标已经异步加载完成
 * @param img
 */
const setImgFile = (img) =>{
    __img = img
    executeHandle()
}

export default setImgFile