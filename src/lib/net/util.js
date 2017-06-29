/**
 * Created by chkui on 2017/6/29.
 */

export const buildMapping = (obj, name, cb) =>{
    !obj[name] && (obj[name] = [])
    obj[name].push(cb)
}

export const exeMapping = (obj, name, res) =>{
    obj && obj[name] && obj[name].map(cb=>cb(res))
}

export const exeMappingEx = (obj, name, err, res) =>{
    obj && obj[name] && obj[name].map(cb=>cb(err, res))
}