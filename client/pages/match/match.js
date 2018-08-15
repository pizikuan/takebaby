// // latest.js
// var Api = require('../../utils/api.js');

// Page({
//   data: {
//     title: '最新话题',
//     latest: [],
//     hidden: false
//   },
//   onPullDownRefresh: function () {
//     this.fetchData();
//     console.log('onPullDownRefresh', new Date())
//   },
//   // 事件处理函数
//   redictDetail: function(e) {
//     var id = e.currentTarget.id,
//       url = '../detail/detail?id=' + id;

//     wx.navigateTo({
//       url: url
//     })
//   },
//   fetchData: function() {
//     var that = this;
//     that.setData({
//       hidden: false
//     })
//     wx.request({
//       url: Api.getLatestTopic({
//         p: 1
//       }),
//       success: function(res) {
//         console.log(res);
//         that.setData({
//           latest: res.data
//         })
//         setTimeout(function() {
//           that.setData({
//             hidden: true
//           })
//         }, 300)
//       }
//     })
//   },
//   onLoad: function () {
//     this.fetchData();
//   }
// })

var Api = require('../../utils/api.js');

var app=getApp()
var that;

Page({
  data: {
    title: '匹配',
    matchRes: null,
    hidden: 'true',
    loginErrorCount: 1,
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

  fetchData: function () {
    console.log("ok");
    // var that = this;
    // that.setData({hidden: false})
    // wx.request({
    //   url: Api.GET_INDEX({p: 1}),
    //   success: function (res) {
    //     console.log(res);
    //     that.setData({matchRes: res.data})
    //     setTimeout(function () {
    //       that.setData({hidden: true})
    //     }, 300)
    //   }
    // })
  },

  onLoad: function (){ 
    that = this
    console.log("onLoad")
    this.fetchData()
    console.log(app.globalData.hidden)
    this.match()
  },


  onShow: function () {
    console.log("onShow")
  },
  matchSet: function () {
    this.setData({
      matchRes: [1, 2, 3, 4]
    })
  },
  //开启匹配后台调用
  match: function () {
    // post数据给服务器获取匹配结果
    // console.log(app.globalData.home);
    // console.log(app.globalData.school);
    // console.log(app.globalData.parentName);
    // console.log(app.globalData.wechat);
    // console.log(app.globalData.mobile);
  
    //后台请求
    wx.request({
      url: 'http://192.168.51.10:8888/api/json/match',
      data: {
        "userName": app.globalData.parentName,
        "wxNum": app.globalData.wechat,
        "phoneNum": app.globalData.mobile,
        "code": app.globalData.code,
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

        if (res.data.errno == 1) {
          console.log("请求失败");
        }else{
          that.setData({
            'matchRes': JSON.parse(res.data.data)
          });
        }
      },
      fail: function (res) {
        console.log('error: ' + res)
      }
    })
  },

  onLoad: function () {
    this.fetchData();
    console.log(app.globalData.hidden)
    wx.showShareMenu({
      withShareTicket: false
    })
  }
})