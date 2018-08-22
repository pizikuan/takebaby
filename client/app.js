//app.js

var app = getApp();

App({
  globalData: {
    // userInfo:         null,
    school: { 
      name: "", 
      longitude: 0.0, 
      latitude: 0.0 
    },
    home: { 
      name: "", 
      longitude: 0.0, 
      latitude: 0.0 
    },
    parentName: "",
    wechat: "",
    mobile: "",
    searchResult: Array[10],
    inputStatus: "",
    code: "",
    hidden: true,
    // userInfo_name:    "",
    userInfo: {
      nickname: 'Hi,游客',
      username: '',
      avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png',
      schoolAddr:'',
      homeAddr:'',
      phoneNum:'',
      wxNum:'',
      isE: null
    },
  },
  onLaunch: function () {
    var that = this;

    // this.globalData.userInfo.username='李英浩';


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        this.globalData.code = code;
      
        //去后台服务器请求，用户信息

        wx.request({
          url: 'http://192.168.51.10:8888/api/json/getUserInfo',
          data: {
            "code": this.globalData.code,
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
              that.globalData.parentName = res.data.data.username;
              that.globalData.wechat = res.data.data.wxNum;
              that.globalData.mobile = res.data.data.phoneNum;

              that.globalData.userInfo.username = res.data.data.username;
              that.globalData.userInfo.phoneNum = res.data.data.phoneNum;
              that.globalData.userInfo.wxNum = res.data.data.wxNum;
              that.globalData.userInfo.isE = res.data.data.isEmpy;
              that.globalData.userInfo.schoolAddr = res.data.data.schoolAddr;
              that.globalData.userInfo.homeAddr = res.data.data.homeAddr;
              that.globalData.school.name = res.data.data.schoolAddr;
              that.globalData.school.longitude = res.data.data.schoolAddr_x;
              that.globalData.school.latitude = res.data.data.schoolAddr_y;
              that.globalData.home.name = res.data.data.homeAddr;
              that.globalData.home.longitude = res.data.data.home_x;
              that.globalData.home.latitude = res.data.data.home_y;

              that.globalData.userInfo.isE = false;
              // wx.setStorageSync(that.globalData.userInfo.username, res.data.data.username);
              // that.setData({
              //   'home': JSON.stringify(res.data.data.username)
              // })

              console.log(JSON.stringify(res.data.data.username));
              console.log(JSON.stringify(that.globalData.userInfo.isE));

              console.log(JSON.stringify(that.globalData.school.name));

              console.log(JSON.stringify(that.globalData.home.name));
              // that.onLaunch();

              wx.navigateTo({
                url: '2index'
              })
            };
          },
          fail: function (res) {
            console.log('error: ' + res)
          }
        })
      }
    })


  },onShow:function(){
    
  }
  
})