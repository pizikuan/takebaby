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
    shareTitle: "2个家庭合作接送孩子上下学，节省50%工作量和费用",
    shreDesc: "",
    // host: "http://192.168.51.10:8888/api/",
    host: "https://ekunyu.com/api/",
  },
  
  
  onLaunch: function () {

  },
  
  onShow:function(){
    
  }
  
})