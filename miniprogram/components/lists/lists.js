const db = wx.cloud.database();
const albumLists = db.collection('albumLists');
Component({
  properties: {
    typeTree: Object,
    isRemove: Number,
    animation: Object
  },
  /**
   * 页面的初始数据
   */
  data: {},

  methods: {
    removeImage(e) {
      console.log(e.currentTarget.dataset.replyType)
      this.triggerEvent('removeImage', e.currentTarget.dataset.replyType)
    },
    bigShow(event) {
      getApp().globalData.isOnshow = false
      const {typeTree}=this.data
      let newUrls=[]
      typeTree.map((item)=>{
        newUrls.push(item.image)
      })
      wx.previewImage({
        current: event.currentTarget.dataset.imgurl, // 当前显示图片的http链接
        urls: newUrls
      })
    },
    onLoad: function() {
      console.log(1111)
    }
   
  },
})