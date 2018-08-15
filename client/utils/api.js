'use strict';
//var HOST_URI = 'https://www.v2ex.com/api/';
var HOST_URI = 'http://192.168.51.10:8080/api/';

//获取首页信息
var GET_METCH = 'index.json';


//??????????? 这是个啥
function _obj2uri(obj) {
  return Object.keys(obj).map(function (k) {
    return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
  }).join('&');
}

//获取首页数据
function _getINDEX() {
  return HOST_URI + GET_METCH;
}


//加载所有方法
module.exports = {

  GET_INDEX: _getINDEX
};