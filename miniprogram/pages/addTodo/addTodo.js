// pages/addTodo/addTodo.js
const db=wx.cloud.database();
const todos=db.collection("todos");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlMessgae:''
  },

  uploadFile(){
    wx.chooseImage({
      success: res => {
        wx.cloud.uploadFile({
          cloudPath: `${Math.floor(Math.random()*1000000)}.png`, // 上传至云端的路径
          filePath: res.tempFilePaths[0], // 小程序临时文件路径
          success: res2 => {
            // 返回文件 ID
            console.log(res2.fileID)
            this.setData({
              urlMessgae: res2.fileID
            })
          },
          fail: console.error
        })
      },
    })
  },
  // 表单提交
  onSubmit(e){
    todos.add({
      data:{
        title: e.detail.value.title,
        image: this.data.urlMessgae
      }
    }).then(res=>{
      console.log(res)
      wx.showToast({
        title: '添加成功',
        icon:'cuccess',
        success:res2=>{
          wx.redirectTo({
            url: `../todoInfo/todoInfo?id=${res._id}`,
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})