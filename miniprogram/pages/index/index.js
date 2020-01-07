const db = wx.cloud.database();
const albumLists = db.collection('albumLists');
const _ = db.command
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    typeTree: [],
    banners: [],
    active: 0,
    Height: '',
    animation: ''
  },
  onTabItemTap(item) {
    getApp().globalData.isOnshow = true
    this.setData({
      active: getApp().globalData.typeIndex ? getApp().globalData.typeIndex : 0,
      typeTree: []
    }, res => {
      this.getData({}, getApp().globalData.typeIndex)
      this.getBannerData()
      // this.imgHeight()
    })
  },
  imgHeight: function(e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width; //图片宽度
    var swiperH = winWid * imgh / imgw
    if (swiperH >= 375) {

    }
    this.setData({
      Height: swiperH >= 375 ? 375 + "px" : swiperH + "px" //设置高度
    })
  },
  onLoad: function(options) {
    this.getData()
    this.getBannerData()
    getApp().globalData.isOnshow = true
  },
  query() {
    // 检索数据
    // db.collection("banner")
    // .where({
    //   content:_.in([1])
    // })
    // .get().then(console.log);

    // 只查询需要的数据
    // db.collection("banner")
    // .field({
    //   desc:true
    // })   
    // .get().then(console.log)
    // 正则匹配
    // db.collection("banner")
    // .where({
    //   desc:new db.RegExp({
    //     regexp:'name-0[1-9]',  //name-01  name-02 ...name-09
    //     options:'i'
    //   })
    // })
    // .get().then(console.log)
  },
  bigShow(event) {
    wx.previewImage({
      current: event.currentTarget.dataset.imgurl, // 当前显示图片的http链接
      urls: [event.currentTarget.dataset.imgurl] // 需要预览的图片http链接列表
    })
  },
  tabsClick(e) {
    this.setData({
      active: e.detail.index,
      typeTree: []
    }, res => {
      this.getData()
    })
  },
  getData(callBack, typeIndex) {
    if (!callBack) {
      callBack = res => {}
    }
    wx.showLoading({
      title: '数据加载中...',
    })
    let tabIndex
    if (this.data.active) {
      tabIndex = this.data.active
    } else {
      tabIndex = '0'
    }
    albumLists
      .where({
        type: _.in([Number(tabIndex)])
      })
      .get().then(res => {
        this.setData({
          typeTree: res.data.reverse(),
        }, res => {
          wx.hideLoading();
        })
      })
  },
  removeImage(value) {
    let that = this
    albumLists.doc(value.detail).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.getData({}, getApp().globalData.typeIndex)
        this.getBannerData()
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
  onShow() {
    if (getApp().globalData.isOnshow) {
      this.setData({
        active: getApp().globalData.typeIndex ? getApp().globalData.typeIndex : 0,
        typeTree: []
      }, res => {
        this.getData({}, getApp().globalData.typeIndex)
        this.getBannerData()
        // this.imgHeight()
      })
    } else {
      return
    }
  },
  getBannerData() {
    wx.showLoading({
      title: '数据加载中...',
    })
    albumLists
      .get().then(res => {
        let banners
        if (res.data.length > 0) {
          banners = res.data.length >= 3 ? res.data.slice(-3).reverse() : res.data.reverse()
        } else {
          banners = [{
            image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575449429153&di=d7651ecfb2419a5a02b3ded6dc12384e&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fb7b5b489ab8adb866af91fee3019886c5389ff9d67ab-hH0Mm2_fw658'
          }]
        }
        this.setData({
          banners
        }, res => {
          wx.hideLoading();
        })
      })
  }
})