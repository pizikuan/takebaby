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
    selectFlag:false,
    isReg:false,
    // userInfo_name:    "",
    // userInfo: {
    //   nickname: 'Hi,游客',
    //   username: '',
    //   avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png',
    //   schoolAddr:'',
    //   homeAddr:'',
    //   phoneNum:'',
    //   wxNum:'',
    //   isE: null
    // },
  },
  onLaunch: function () {

  },onShow:function(){
    
  }
  
})