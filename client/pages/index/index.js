//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    motto: '2876',
    school: '',
    home: '',
    parentName: '',
    wechat: '',
    mobile: '',
    isReg:null,
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onShow: function () {
    console.log("index.js - onShow()")
    wx.navigateTo({
      url: '../guide/guide'
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

    //************************************************************************************************************/

    var that = this;

    // this.globalData.userInfo.username='李英浩';

    if (app.globalData.selectFlag){

    }else{
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var code = res.code;
          // this.globalData.code = code;

          //去后台服务器请求，用户信息

          wx.request({
            url: app.globalData.host+'json/getUserInfo',
            data: {
              "code": code,
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {// 设置请求的 header
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(JSON.stringify(res.data.data));
              // this.data.matchRes = []
              // this.data.isShow = true;
              // console.log(res)

              if (res.data.errno == 1) {
                console.log("请求失败");
              } else {

                app.globalData.school.name = res.data.data.schoolAddr;
                app.globalData.school.longitude = res.data.data.schoolAddr_x;
                app.globalData.school.latitude = res.data.data.schoolAddr_y;

                app.globalData.home.name = res.data.data.homeAddr;
                app.globalData.home.longitude = res.data.data.homeAddr_x;
                app.globalData.home.latitude = res.data.data.homeAddr_y;

                app.globalData.parentName = res.data.data.username;
                app.globalData.wechat = res.data.data.wxNum;
                app.globalData.mobile = res.data.data.phoneNum;
                app.globalData.isReg = res.data.data.isEmpy;


                // that.setGlobalData({
                //   school: res.data.data.schoolAddr
                // })

                that.setData({
                  // app.globalData.school.name: res.data.data.schoolAddr,
                  school: app.globalData.school.name,
                  home: app.globalData.home.name,
                  parentName: app.globalData.parentName,
                  wechat: app.globalData.wechat,
                  mobile: app.globalData.mobile,
                  isReg: app.globalData.isReg,
                })


                // wx.setStorageSync(that.globalData.userInfo.username, res.data.data.username);
                // that.setData({
                //   'home': JSON.stringify(res.data.data.username)
                // })

                console.log(JSON.stringify(res.data.data.username));
                // console.log(JSON.stringify(that.globalData.userInfo.isE));

                // console.log(JSON.stringify(that.globalData.school.name));

                // console.log(JSON.stringify(that.globalData.home.name));
                // that.onLaunch();

                // wx.navigateTo({
                //   url: 'index'
                // })
              };
            },
            fail: function (res) {
              console.log('error: ' + res)
            }
          })
        }
      })
    }
    //************************************************************************************************************/
  },

  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  bindInputFocus: function (event) {
    console.log(event)
    app.globalData.inputStatus = event.currentTarget.id
    wx.navigateTo({
      url: '../search/search'
    })
  },

  bindReplaceInput: function (e) {
    if (e.currentTarget.id == "parentName") {
      app.globalData.parentName = e.detail.value
    }
    else if (e.currentTarget.id == "wechatNum") {
      app.globalData.wechat = e.detail.value
    }
    else if (e.currentTarget.id == "mobileNum") {
      app.globalData.mobile = e.detail.value
    }
    else {
      console.log("bindReplaceInput() parameter error")
    }

    // console.log(e)

  },

  getCurrentPageUrl: function () {
    var pages = getCurrentPages()             //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route               //当前页面url
    return url
  },
  //匹配按钮点击触发方法
  bindMatch: function (e) {

    var myPhonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    //在这里对各个数据进行检测，如果条件满足则navigateTo

    // console.log(app.globalData.wechatNum.length);

    if (JSON.stringify(app.globalData.school.name).length < 3) {
      wx.showModal({
        title: '',
        content: '请选择学校名称',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (JSON.stringify(app.globalData.home.name).length < 3) {
      wx.showModal({
        title: '',
        content: '请选择小区名称',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (app.globalData.parentName.length < 1 || app.globalData.parentName.length > 5) {

      wx.showModal({
        title: '',
        content: '请填写家长姓名',
        showCancel: false,
        success: function (res) {

        }
      });
    } else if (app.globalData.wechat == '') {
      wx.showModal({
        title: '',
        content: '请填写微信号码',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (!myPhonereg.test(app.globalData.mobile)) {
      wx.showModal({
        title: '',
        content: '手机号码格式不正确',
        showCancel: false,
        success: function (res) {

        }
      })
    } else {
      wx.navigateTo({
        url: '../match/match',
      })
    }
  },
  // 生命周期函数--监听页面显示
  onShow: function () {
    this.syncGlobalData()
  },

  // 读取并显示app.globalData
  syncGlobalData: function () {
    this.setData({ school: app.globalData.school.name })
    this.setData({ home: app.globalData.home.name })
    this.setData({ parentName: app.globalData.parentName })
    this.setData({ wechat: app.globalData.wechat })
    this.setData({ mobile: app.globalData.mobile })
    this.setData({ isReg: app.globalData.isReg })
  },

  // 检查input是否合法
  checkInput: function () {

  },

  onShareAppMessage: function () {
    return {
      title: app.globalData.shareTitle,
      desc: app.globalData.shareDesc,
      path: "pages/index/index",
      imageUrl: "/images/hotest.png"
    }
  }
})

