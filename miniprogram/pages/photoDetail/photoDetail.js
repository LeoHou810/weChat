// pages/photoDetail/photoDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onReady: function() {
    this.animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
    })
  },
  onShow: function() {
    let next = true;
    setInterval(function() {
      if (next) {
        // this.animation.scale(0.9).step();
        this.animation.rotate(5).step()
        this.animation.rotate(0).step()
        this.animation.rotate(-5).step()
        next = !next;
      } else {
        this.animation.scale(1).step();
        next = !next;
      }
      this.setData({ //输出动画  
        animation: this.animation.export()
      })
    }.bind(this), 600)
  },







  formatDate(datetime) {
    // 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
    var year = datetime.getFullYear(),
      month = ("0" + (datetime.getMonth() + 1)).slice(-2),
      date = ("0" + datetime.getDate()).slice(-2),
      hour = ("0" + datetime.getHours()).slice(-2),
      minute = ("0" + datetime.getMinutes()).slice(-2),
      second = ("0" + datetime.getSeconds()).slice(-2);
    // 拼接
    var result = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    // 返回
    return result;
  },

  /**
   * 生命周期函数--监听页面显示
   */

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})