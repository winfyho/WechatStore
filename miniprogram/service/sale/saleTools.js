function updateData(sale, saleData) {
  const db = wx.cloud.database()
  const saleColl = db.collection("sale")
  console.log("更新商品后台数据", sale.title, saleData)

  saleColl.doc(sale._id).update({
      // data 传入需要局部更新的数据
      data: {
        browse_num: saleData.browse_num,
        pay_num: saleData.pay_num,
        cart_num: saleData.cart_num,
      }
    })
    .then(res => {
      console.log("更新商品后台数据", sale.title, saleData)
    })
    .catch(console.error)

}

function searchSaleList(_this,keyword){
  console.log("搜索关键词", keyword)

  const db = wx.cloud.database()
  const saleColl = db.collection("sale")
  saleColl.where({
    title: db.RegExp({
      regexp: keyword,
      options: 'i',
    })
  })
  .orderBy("pay_num","desc")
  .get()
  .then(res => {
    console.log(res.data)
    _this.setData({
      saleList:res.data
    })
  })
}

function getSaleDetail(_this, sid) {
  const db = wx.cloud.database()
  const saleColl = db.collection("sale")
  saleColl.doc(sid).get().then(res => {

    // console.log("商品详情-",res.data)
    let sale = res.data

    wx.cloud.getTempFileURL({
      fileList: [res.data.imgUrl],
      success: res => {
        // console.log(res.fileList[0].tempFileURL)
        sale.imgUrl = res.fileList[0].tempFileURL
        _this.setData({
          sale: sale
        })
        console.log("商品详情", _this.data.sale)

      },
      fail: err => {
        wx.showToast({
          title: '获取图片失败',
          icon: "fail"
        })
      }
    })

  })
}

function addSale(sale) {
  const db = wx.cloud.database()
  const saleColl = db.collection("sale")
  saleColl.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        salename: sale.salename,
        title: sale.title,
        price: sale.price,
        time: sale.time,
        imgUrl: sale.imgUrl,
        pay_num: sale.pay_num,
        browse_num: sale.browse_num,
        cart_num: sale.cart_num,
        stock: sale.stock,
        cats: sale.cats
      }
    })
    .then(res => {
      console.log(res)
      wx.showToast({
        title: '添加商品成功',
        icon: "success"
      })
      wx.startPullDownRefresh()
    })
    .catch(console.error)
}

function deleteSale(id) {
  const db = wx.cloud.database()
  db.collection("sale").doc(id).remove()
    .then(res => {
      console.log("删除成功", id)
      wx.startPullDownRefresh()
    })
    .catch(console.error)
}

function getSaleList(_this, option) {
  wx.showToast({
    title: '加载中',
    icon: "loading",
    duration:800
  })
  const db = wx.cloud.database()
  const saleColl = db.collection("sale")
  let imgList = []
  let saleList = []

  let sortType = option.sortType || "time";
  let sortValue = option.sortValue || "desc";

  saleColl
    .orderBy(sortType, sortValue)
    .get()
    .then(res => {
      saleList = res.data
      res.data.forEach(i => {
        imgList.push(i.imgUrl)
      })

      // console.log(res.data, imgList)

      // 通过cloudID获取临时图片网络路径
      wx.cloud.getTempFileURL({
        fileList: imgList,
        success: res => {
          // console.log(res.fileList)
          wx.stopPullDownRefresh()
          res.fileList.forEach((i, index) => {
            saleList[index].imgUrl = i.tempFileURL
          })
          _this.setData({
            saleList: saleList
          })
          console.log("商品列表", saleList)
        },
        fail: err => {
          wx.showToast({
            title: '获取图片失败',
            icon: "fail"
          })
        }
      })

    })
    .catch(console.error)

}

export default {
  addSale,
  getSaleList,
  deleteSale,
  getSaleDetail,
  updateData,
  searchSaleList
}