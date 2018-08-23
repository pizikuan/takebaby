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
    shareTitle: "2个家庭合作接送孩子上下学，节省一半的工作量",
    shreDesc: "",
  },
  
  
  onLaunch: function () {

  },
  
  onShow:function(){
    
  }
  
})