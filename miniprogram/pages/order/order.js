// miniprogram/pages/order/order.js
import addressTools from "../../service/address/addressTools.js"
import orderTools from "../../service/order/orderTools.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saleList: [],
    addrList: [],
    orderPrice: 0
  },

  addOrder() {
    let orderDetail = {
      orderPrice: this.data.orderPrice,
      openid: app.globalData.openid,
      address: this.data.addrList[0],
      time: new Date().getTime(),
      saleList: this.data.saleList,
      num: this.data.saleList.length
    }
    console.log("提交订单", orderDetail)
    // wx.showToast({
    //   title: '提交订单中',
    //   icon:"loading",

    //   complete: res => {
    //     orderTools.addOrder(orderDetail)
    //   }
    // })
    orderTools.addOrder(orderDetail)




  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {
      data: 'test'
    });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', res => {
      let orderPrice = 0;
      res.orderList.forEach(i => {
        orderPrice += i.subTotal
      })
      console.log("订单详情", orderPrice, res.orderList)

      this.setData({
        saleList: res.orderList,
        orderPrice
      })
    })

    addressTools.getAddrList(this, app.globalData.openid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

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