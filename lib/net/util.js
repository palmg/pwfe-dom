"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by chkui on 2017/6/29.
 */

var buildMapping = exports.buildMapping = function buildMapping(obj, name, cb) {
    !obj[name] && (obj[name] = []);
    obj[name].push(cb);
};

var exeMapping = exports.exeMapping = function exeMapping(obj, name, res) {
    obj && obj[name] && obj[name].map(function (cb) {
        return cb(res);
    });
};

var exeMappingEx = exports.exeMappingEx = function exeMappingEx(obj, name, err, res) {
    obj && obj[name] && obj[name].map(function (cb) {
        return cb(err, res);
    });
};