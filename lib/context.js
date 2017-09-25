'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 全局上线文，以k-v的方式存储
 * @type {{routes: Array}}
 */
var context = {
    routes: false
};

var set = exports.set = function set(key, value) {
    'undefined' === typeof context[key] && console.warn(key, 'not exists! current context:', context);
    context[key] = value;
};

var get = exports.get = function get(key) {
    return context[key];
};