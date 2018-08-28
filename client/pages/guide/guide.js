// pages/guide.js
Page({

  data: {
    guide: ""
  },

  onShow: function () {
    console.log("开始尝试");
    const that = this;
    var myrich = '<view>hello,world</view>';
    that.setData({ guide: myrich });
  }

})