//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    school: '',
    home: '',
    parentName: '', 
    wechat: '',
    mobile: '',
    motto: '2876',
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindInputFocus: function (event) {
    console.log(event)
    app.globalData.inputStatus = event.currentTarget.id
    wx.navigateTo({
      url: '../search/search'
    })
  },

  getCurrentPageUrl: function () {
    var pages = getCurrentPages()             //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route               //当前页面url
    return url
  },
  //表单提交方法
  /***
   * 通过表单触发进行调用提交，而不通过bindtap进行触发。
   * 
   */
  bindMatch: function (e) {
    // post数据给服务器获取匹配结果
    console.log(app.globalData.home);
    console.log(app.globalData.school);


    // post数据给服务器获取匹配结果
    var adds = e.detail.value;
    console.log(adds);
    
    wx.request({
      url: 'http://192.168.51.10:8888/api/json/match',
      data: { 
        "userinfo": JSON.stringify(adds), 
        "code": app.globalData.code, 
        "home": JSON.stringify(app.globalData.home), 
        "school": JSON.stringify(app.globalData.school)
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(JSON.stringify(res.data))
      },
      fail: function (res) {
        console.log('error: ' + res)
      }
    })

    wx.navigateTo({
      url: '../match/match',
    })

  },

  // 生命周期函数--监听页面显示
  onShow: function () {
    this.syncGlobalData()
  },

  // 读取并显示app.globalData
  syncGlobalData: function () {
    this.setData({
      school: app.globalData.school.name
    })
    this.setData({
      home: app.globalData.home.name
    })
    //this.setData({parentName : app.globalData})
    //this.setData({mobile : app.globalData.school.name})
  }
})