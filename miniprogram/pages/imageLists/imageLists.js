// pages/todo/todo.js

const db = wx.cloud.database();
const albumLists = db.collection('albumLists');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: [],
    administration: '管理',
    isRemove: 0,
    imgAnimation: '',
    animation: ''
  },
  onTabItemTap(item) {
    getApp().globalData.isOnshow = true
    wx.showLoading({
      title: '数据加载中...',
    })
    albumLists
      .get().then(res => {
        this.setData({
          tasks: res.data,
          isRemove: 0,
          administration: '管理'
        }, res => {
          wx.hideLoading();
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getData()
    // console.log(options)
  },

  removeShow() {
    const {
      isRemove
    } = this.data
    if (isRemove == 0) {
      this.setData({
        isRemove: 1,
        administration: '取消'
      })
    } else {
      this.setData({
        isRemove: 0,
        administration: '管理'
      })
    }
  },
  onPullDownRefresh() {
    this.getData(res => {
      wx.stopPullDownRefresh();
      this.pageDate.skip = 0
    });
  },

  onReachBottom() {
    this.getData()
  },

  removeImage(value) {
    let that = this
    albumLists.doc(value.detail).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        wx.showLoading({
          title: '数据加载中...',
        })

        albumLists
          .get().then(res => {
            this.setData({
              tasks: res.data,
              isRemove: 0,
              administration: '管理'
            }, res => {
              wx.hideLoading();
            })
          })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        console.error('[数据库] [删除记录] 失败：', err)
      }
    })
  },

  getData(callBack) {
    if (!callBack) {
      callBack = res => {}
    }
    wx.showLoading({
      title: '数据加载中...',
    })
    albumLists
      .skip(this.pageDate.skip)
      .get().then(res => {
        let oldData = this.data.tasks
        console.log(oldData, res.data)
        this.setData({
          tasks: oldData.concat(res.data)
        }, res => {
          this.pageDate.skip = this.pageDate.skip + 20
          wx.hideLoading();
          callBack();
        })
      })
  },
  pageDate: {
    skip: 0
  },
  onShow() {

    if (getApp().globalData.isOnshow) {
      wx.showLoading({
        title: '数据加载中...',
      })
      albumLists
        .get().then(res => {
          this.setData({
            tasks: res.data,
            isRemove: 0,
            administration: '管理'
          }, res => {
            wx.hideLoading();
          })
        })
    }
    let next = true;
    setInterval(function() {
      if (next) {
        this.animation.rotate(2).step()
        this.animation.rotate(-2).step()
        this.animation.rotate(0).step()
        next = !next;
      } else {
        this.animation.scale(1).step();
        next = !next;
      }
      this.setData({ //输出动画  
        animation: this.animation.export()
      })
    }.bind(this), 200)

  },
  onReady: function() {
    this.animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear',
    })
  },
})