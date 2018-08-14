//获取应用实例
const app = getApp()

Page({
  data: {
    motto:        '本市已经有2943个家庭匹配成功',
    userInfo:     {},
    hasUserInfo:  false,
    canIUse:      wx.canIUse('button.open-type.getUserInfo'),
    school:       '',
    home:         '',
    parentName:   '',
    wechat:       '',
    mobile:       '',
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

  // 匹配按钮点击函数
  bindMatch: function () {
    // post数据给服务器获取匹配结果

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