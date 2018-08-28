var Api = require('../../utils/api.js');

var app=getApp()
var that;

Page({
  data: {
    title: '匹配',
    matchRes: null,
    loginErrorCount: 1,
    isMatched: 'false'
  },

  onPullDownRefresh: function() {
    this.fetchData();
    console.log('onPullDownRefresh', new Date())
  },

  // 事件处理函数
  redictDetail: function(e) {
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;

    wx.navigateTo({url: url})
  },

  onLoad: function (){ 
    this.fetchData()
    console.log("match.js - onLoad() - isMathching" + app.globalData.isMatching)
  },


  onShow: function () {
    that = this
    console.log("onShow");
    this.match();
  },


  //开启匹配后台调用
  match: function () {
    // post数据给服务器获取匹配结果
    // console.log(app.globalData.home);
    // console.log(app.globalData.school);
    // console.log(app.globalData.parentName);
    // console.log(app.globalData.wechat);
    // console.log(app.globalData.mobile);
  
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        // this.globalData.code = code;
      //后台请求
      wx.request({
        // url: 'http://192.168.51.10:8888/api/json/match',
        url: app.globalData.host + 'json/getUserInfo',
        data: {
          "userName": app.globalData.parentName,
          "wxNum": app.globalData.wechat,
          "phoneNum": app.globalData.mobile,
          "code": code,
          "home": JSON.stringify(app.globalData.home),
          "school": JSON.stringify(app.globalData.school)
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {// 设置请求的 header
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // console.log(JSON.stringify(res.data)
          // this.data.matchRes = []
          // this.data.isShow = true;
          // console.log(res)
        //后台请求
        wx.request({
          url: app.globalData.host + 'json/match',
          data: {
            "userName": app.globalData.parentName,
            "wxNum": app.globalData.wechat,
            "phoneNum": app.globalData.mobile,
            "code": code,
            "home": JSON.stringify(app.globalData.home),
            "school": JSON.stringify(app.globalData.school)
          },
          method: 'POST',     // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {           // 设置请求的 header
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            // console.log(JSON.stringify(res.data)
            // this.data.matchRes = []
            // this.data.isShow = true;
            // console.log(res)

            // 删除loading标志
            that.setData({
              isMathching : 'false'
            })

            if (res.data.errno == 1) {
              console.log("请求失败");

              wx.showModal({
                title: '',
                content: '请勿重复请求',
                showCancel: false,
                success: function (res) {
                  wx.navigateTo({
                    url: '../index/index'
                  })
                }
              })
            } else {
              that.setData({
                'matchRes': JSON.parse(res.data.data)
              });
            }
          },
          fail: function (res) {
            console.log('error: ' + res)
          }
        })
      }
    })
  },

  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: false
    })
  }
})