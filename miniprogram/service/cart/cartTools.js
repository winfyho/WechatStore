function getCartList(_this, openid) {
  const db = wx.cloud.database()
  const cartColl = db.collection("carts")
  cartColl.where({
      _openid: openid
    }).get()
    .then(res => {
      wx.stopPullDownRefresh()
      console.log("获取购物车数据", res.data)
      _this.setData({
        cartList: res.data
      })

    })
}


function addCart(sale, openid) {
  const db = wx.cloud.database()
  const cartColl = db.collection("carts")
  cartColl.where({
      _openid: openid,
      sale: {
        _id: sale._id
      }
    }).get()
    // 商品已经添加到购物车，数量加一
    .then(res => {
      console.log("商品已经在购物车了",res.data[0]._id,res.data[0].num)
      let cartId = res.data[0]._id;
      let oldNum = res.data[0].num

      cartColl.doc(cartId).update({
        data:{
          num: oldNum+1
        }
      })
      .then(res => {
        wx.showToast({
          title: '购物车数量+1',
          icon: "success"
        })
      })
    
    })
    // 创建新的cartItem
    .catch(err => {

      cartColl.add({
          data: {
            sale: sale,
            time: new Date().getTime(),
            num:1
          }
        })
        .then(res => {
          console.log("添加购物车成功", sale.title, sale._id)
          wx.showToast({
            title: '添加购物车成功',
            icon: "success"
          })
        })

    })

}

function deleteCart(cartid){
  const db = wx.cloud.database()
  db.collection("carts").doc(cartid).remove()
    .then(res => {
      console.log("删除成功", cartid)
      wx.startPullDownRefresh()
    })
    .catch(console.error)
}

export default {
  addCart,
  deleteCart,
  getCartList
}