const homePage = getApp()
const order = ['demo1', 'demo2', 'demo3']
const db=wx.cloud.database();
const _=db.command
Page({
  data: {
    background: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574945816965&di=72fe0eebb4af630968672923b996151b&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F0e2442a7d933c8956c0e8eeadb1373f08202002a.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574945816964&di=219db30644fd33309d669f597bdab1c6&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb151f8198618367aa7f3cc7424738bd4b31ce525.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574945816964&di=63d2a9d2d13c1987c74d8046dcb75e12&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F0eb30f2442a7d9337119f7dba74bd11372f001e0.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    currType: 1,
    // 当前类型
    types: [{ id: '1', name: 'qqqq' }, { id: '2', name: 'aaaa' }],
    typeTree: [{ id: '1', bz_1: 'http://pic1.win4000.com/wallpaper/2/589adf9eac917.jpg', name: '222222' }, { id: '2', bz_1: 'http://bbs-fd.zol-img.com.cn/t_s1200x5000/g2/M00/0A/09/ChMlWlz3KJuIN6ubABtbXDUbQ38AAKj5wHFd58AG1t0132.jpg', name: '33333' }, { id: '2', bz_1: 'http://bbs-fd.zol-img.com.cn/t_s1200x5000/g2/M00/0A/09/ChMlWlz3KJuIN6ubABtbXDUbQ38AAKj5wHFd58AG1t0132.jpg', name: '33333' }, { id: '1', bz_1: 'http://pic1.win4000.com/wallpaper/2/589adf9eac917.jpg', name: '222222' }],
  },

  onLoad() {
    // 获取临时图片的url
    wx.cloud.getTempFileURL({
      fileList:['cloud://myapp-2edcc2.6d79-myapp-2edcc2-1258198683/myPhoto/timg (2).jpg'],
      success:res=>{
        console.log(res.fileList[0]);
        
      }
    })
  },
  query(){
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
    db.collection("banner")
    .where({
      desc:new db.RegExp({
        regexp:'name-0[1-9]',  //name-01  name-02 ...name-09
        options:'i'
      })
    })
    .get().then(console.log)

  },
  tapType(e) {
    const currType = e.currentTarget.dataset.typeId;
    if (currType == 1) {
      this.setData({
        currType: currType,
        typeTree: [{ id: '1', bz_1: 'http://pic1.win4000.com/wallpaper/2/589adf9eac917.jpg', name: '222222' }, { id: '2', bz_1: 'http://bbs-fd.zol-img.com.cn/t_s1200x5000/g2/M00/0A/09/ChMlWlz3KJuIN6ubABtbXDUbQ38AAKj5wHFd58AG1t0132.jpg', name: '33333' }],
      });
    } else if (currType == 2) {
      this.setData({
        currType: currType,
        typeTree: [{ id: '1', bz_1: 'http://pic1.win4000.com/wallpaper/2/53d07b9f6bdf6.jpg', name: '33333' }, { id: '2', bz_1: 'http://pic1.win4000.com/wallpaper/b/583407c989c57.jpg', name: '555555' }],
      });
    }

  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {
      // this is setData callback
    })
  },
  customData: {
    hi: 'MINA'
  }
})
