var bmap = require('../../libs/bmap-wx.js');
const app = getApp()

Page({

  //页面的初始数据
  data: {
    inputShowed: false,
    inputVal: "",
  },

  showInput: function() {
    this.setData({inputShowed: true});
  },

  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },

  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },

  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  // 从百度地图SDK得到建议热词语
  bindLocationInput: function(e) {

    this.setData({
      inputVal: e.detail.value
    });

    var that = this;

    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: '8omElRZxaosX2PoNpGiOEwsx7wbBlTZG'
    });

    var fail = function(data) {
      console.log(data)
    };

    var success = function(data) {

      var sr = ['', '', '', '', '', '', '', '', '', ''];
      var maxLength = data.result.length < 10 ? data.result.length : 10;

      for (var i = 0; i < data.result.length; i++) {
        sr[i] = data.result[i].name;
      };

      // 数组深拷贝
      app.globalData.searchResult = data.result.concat();

      //console.log(app.globalData.searchResult)
      that.setData( {searchResult: sr} );
    };

    // 发起suggestion检索请求 
    BMap.suggestion({
      query: e.detail.value,
      region: '北京',
      city_limit: false,
      fail: fail,
      success: success
    });
  },

  // 百度地图热词搜索结果被点击后的回调函数
  searchResultTap: function(event) {

    var index = event.currentTarget.id
    var i = parseInt(index.substr(2))
    console.log(event)

    // 设置学校和家庭住址经纬度
    if (app.globalData.inputStatus == "school") {
      app.globalData.school.name = app.globalData.searchResult[i].name
      app.globalData.school.longitude = app.globalData.searchResult[i].location.lng
      app.globalData.school.latitude = app.globalData.searchResult[i].location.lat
    } else if (app.globalData.inputStatus == "home") {
      app.globalData.home.name = app.globalData.searchResult[i].name
      app.globalData.home.longitude = app.globalData.searchResult[i].location.lng
      app.globalData.home.latitude = app.globalData.searchResult[i].location.lat
    } else {
      console.log("input status error!")
    }
  },

  navigator2url: function() {
    wx.switchTab({
      url: "../index/2index",
      success: function() {
        console.log('跳转到index页面成功') // success              
      },
      fail: function() {
        console.log('跳转到index页面失败') //fail
      }
    })
  },


  // 生命周期函数--监听页面加载
  onLoad: function(options) {

  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function() {

  },

  // 生命周期函数--监听页面显示
  onShow: function() {

  },

  // 生命周期函数--监听页面隐藏
  onHide: function() {

  },

  // 生命周期函数--监听页面卸载
  onUnload: function() {

  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {

  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function() {

  },

  // 用户点击右上角分享
  onShareAppMessage: function() {

  }
})