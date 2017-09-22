'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _context = require('./context');

var matchRoutes = [];
var hasInit = false,
    //标识是否已经完成初始化
hasRoutes = false; //标识是否存在routes列表
var initMatchRoutes = function initMatchRoutes(routes) {
    //初始化路由匹配
    if (routes && 0 < routes.length) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;
                var url = i.url,
                    id = i.id,
                    module = i.module,
                    flag = ':',
                    pos = url.indexOf(flag) - 1,
                    suffix = 0 < pos ? url.match(/\:[\w]+/g) : false;

                matchRoutes.push({
                    url: suffix ? url.replace(/\:[\w]+/g, "[\\w]+") : url,
                    id: id,
                    module: module,
                    suffix: suffix
                });
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

        hasRoutes = true;
    }
},
    getMatchRoute = function getMatchRoute(url) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = matchRoutes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var i = _step2.value;

            var match = void 0; //标识是否匹配上[true|false]
            var reg = new RegExp('^' + i.url + '/?$');
            match = -1 < url.search(reg);
            if (match) return i;
        }
        //代码执行到这里证明没有匹配上
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    console.warn("url match none!check you routes's config");
    return false;
};

/**
 * 获取与url匹配的route。
 * 如果没有初始化匹配列表，或单个URL匹配失败则返回fasle。
 * @param url
 * @returns {*}
 */

exports.default = function (url) {
    //根据传入的url从路由匹配中获取route数据
    !hasInit && function () {
        initMatchRoutes((0, _context.get)('routes'));
        hasInit = true;
    }();
    return hasRoutes ? getMatchRoute() : false;
};