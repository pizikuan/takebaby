var bmap = require('../../libs/bmap-wx.js'); 
const app = getApp()

Page({

  //页面的初始数据
  data: {
    location: '',
    inputShowed: false,
    inputVal: "",
    searchResult: ['', '', '', '', '', '', '', '', '', '']
  }, 

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },

  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  // 从百度地图SDK得到建议热词语
  bindLocationInput: function (e) {

    this.setData({
      inputVal: e.detail.value
    });

    var that = this;

    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: '8omElRZxaosX2PoNpGiOEwsx7wbBlTZG'
    });

    var fail = function (data) {
      console.log(data)
    };

    var success = function (data) {

      var sugData = '';
      var sr = ['', '', '', '', '', '', '', '', '', ''];
      var maxLength = data.result.length < 10 ? data.result.length : 10;

      for (var i = 0; i < data.result.length; i++) {
        sugData = sugData + data.result[i].name + '\n';
        sr[i] = data.result[i].name;
      };

      app.globalData.searchResult = data.result.concat();

      //console.log(app.globalData.searchResult)

      that.setData({ searchResult: sr });

      that.setData({
        sugData: sugData
      });

    };

    // 发起suggestion检索请求 
    BMap.suggestion({
      query: e.detail.value,
      region: '北京',
      city_limit: true,
      fail: fail,
      success: success
    });
  },

  // 百度地图热词搜索结果被点击后的回调函数
  searchResultTap: function(event) {
    var index = event.currentTarget.id
    var i = parseInt(index.substr(2))
    console.log(event)
    console.log(i)
  },

  navigator2url:function(){
    wx.switchTab({
      url: "../index/index",
      success: function () {
        console.log('跳转到news页面成功')// success              
      },
      fail: function () {
        console.log('跳转到news页面失败')//fail
      }
    })
  },



  // 生命周期函数--监听页面加载
  onLoad: function (options) {
  
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {
  
  },

  // 生命周期函数--监听页面显示
  onShow: function () {
  
  },

  // 生命周期函数--监听页面隐藏
  onHide: function () {
  
  },

  // 生命周期函数--监听页面卸载
  onUnload: function () {
  
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
  
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
  
  },

  // 用户点击右上角分享
  onShareAppMessage: function () {
  
  }
})