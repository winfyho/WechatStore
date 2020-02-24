function cancelOrder(oid){
  const db = wx.cloud.database()
  const ordersColl = db.collection("orders")
  ordersColl.doc(oid).update({
    data:{
      state:"已取消"
    }
  })
  .then(res => {
    wx.showModal({
      content: '取消成功',
      showCancel:false,
      success(res) {
        if (res.confirm) {
          wx.startPullDownRefresh()
        } 
      }

    })
    // console.log("取消成功",res)

  })
}

function deleteOrder(oid){
  const db = wx.cloud.database()
  const ordersColl = db.collection("orders")
  ordersColl.doc(oid).remove()
  .then(res => {
    console.log("删除成功",res)
    wx.showToast({
      title: '删除成功',
      icon:"success"
    })
    wx.startPullDownRefresh()
  })
}

function getOrderList(_this,openid){
  const db = wx.cloud.database()
  const ordersColl = db.collection("orders")
  ordersColl.where({
    _openid:openid
  })
  .orderBy("detail.time","desc")
  .get()
  .then(res => {
    wx.stopPullDownRefresh()
    console.log("我的历史订单",res.data[0].detail,res.data)
    _this.setData({
      orderList : res.data
    })
  })
}

function addOrder(orderDetail){
  console.log(orderDetail)
  const db = wx.cloud.database()
  const ordersColl = db.collection("orders")
  ordersColl.add({
    data:{
      detail:orderDetail,
      state:"进行中"
    }
  })
  .then(res => {
    console.log("下单成功",res)
    wx.showModal({
      title: '下单成功',
      content: '可在”我的-历史订单“中查看',
      showCancel:true,
      cancelText:"返回",
      confirmText:"查看",
      confirmColor:"#54ac9e",
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/order_history/order_history'
            
          })
        } else if (res.cancel) {
          wx.navigateBack()
        }
      }
    })
  })
}


export default{
  addOrder,
  getOrderList,
  deleteOrder,
  cancelOrder
}