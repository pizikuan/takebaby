const app = getApp()

Page({

  data: {
  },

  downloadProtocol: function () {
    wx.downloadFile({
      url: 'https://ekunyu.com/file/protocol.docx',
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开协议成功')
          }
        })
      }
    })
  },


  onShareAppMessage: function () {
    return {
      title: app.globalData.shareTitle,
      desc: app.globalData.shareDesc,
      path: "pages/index/index",
      imageUrl: "/images/share.jpg"
    }
  }



})