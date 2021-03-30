const db = wx.cloud.database();
const albumLists = db.collection("albumLists");
import Notify from '@vant/weapp/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    imageUrl: '',
    columns: ['风景', '人物', '动物'],
    typeIndex: '1',
    webUrl:''
  },
  onLoad: function(options) {
    getApp().globalData.isOnshow = true
    this.setData({
      value: '',
      imageUrl: '',
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        getApp().globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  upload() {
    wx.chooseImage({
      success: res => {
        console.log(res)
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        let domain
        if (getApp().globalData.openid) {
          domain = getApp().globalData.openid
        } else {
          domain = 'photos'
        }
        const cloudPath = `${domain}/` + name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath, // 上传至云端的路径
          filePath, // 小程序临时文件路径
          success: res2 => {
            // 返回文件 ID
            console.log(res2.fileID)
            wx.hideLoading();
            this.setData({
              imageUrl: res2.fileID,
            })
          },
          fail: console.error
        })
      },
    })
  },
  // 表单提交
  onSubmit() {
    console.log(1111)
    this.data.webUrl ="http://ce6.test.icloudidc.net/CSADSW/nqlP99q25ItsBRaqhtmYew/"
    let that = this
    if (!this.data.value) {
      Notify({
        type: 'warning',
        message: '请添加描述!'
      });
      return
    }
    if (!this.data.imageUrl) {
      Notify({
        type: 'warning',
        message: '请选择图片!'
      });
      return
    }
    albumLists.add({
      data: {
        title: this.data.value,
        image: this.data.imageUrl,
        type: Number(this.data.typeIndex),
        time: new Date().getTime()
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '上传成功',
        icon: 'cuccess',
        success: res2 => {
          getApp().globalData.typeIndex = that.data.typeIndex
          this.setData({
            value: '',
            imageUrl: ''
          })
          wx.switchTab({
            url: `../index/index`
          })
        }
      })
    })
  },
  remove() {
    this.setData({
      imageUrl: ''
    })
  },
  bigShow() {
    wx.previewImage({
      current: this.data.imageUrl, // 当前显示图片的http链接
      urls: [this.data.imageUrl] // 需要预览的图片http链接列表
    })
  },


  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      value: event.detail
    })
  },
  selectOnChange(event) {
    this.setData({
      typeIndex: event.currentTarget.dataset.id
    })
  }
})