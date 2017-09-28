'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _context = require('./context');

var matchRoutes = [];
var hasInit = false,
    //标识是否已经完成初始化
//hasRoutes = false, //标识是否存在routes列表
routes = false;
/*const initMatchRoutes = (routes) => { //初始化路由匹配
        if (routes && 0 < routes.length) {
            for (let i of routes) {
                const {url, id, module} = i, flag = ':', pos = url.indexOf(flag) - 1,
                    suffix = 0 < pos ? url.match(/\:[\w]+/g) : false
                matchRoutes.push({
                    url: suffix ? url.replace(/\:[\w]+/g, "[\\w]+") : url,
                    id: id,
                    module: module,
                    suffix: suffix
                })
            }
            hasRoutes = true
        }
    },
    getMatchRoute = (url) => {
        for (let i of matchRoutes) {
            let match; //标识是否匹配上[true|false]
            let reg = new RegExp(`^${i.url}\/?$`);
            match = (-1 < url.search(reg))
            if (match) return i
        }
        //代码执行到这里证明没有匹配上
        console.warn("url match none!check you routes's config")
        return false
    }*/

var getMatchRoute = function getMatchRoute(path) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var route = _step.value;

            if (route.url === path) {
                return route;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return false;
};

/**
 * 获取与url匹配的route。
 * 如果没有初始化匹配列表，或单个URL匹配失败则返回fasle。
 * @param url
 * @returns {*}
 */

exports.default = function (path) {
    //根据传入的url从路由匹配中获取route数据
    !hasInit && function () {
        routes = (0, _context.get)('routes');
        hasInit = true;
    }();

    return routes ? getMatchRoute(path) : false;
};