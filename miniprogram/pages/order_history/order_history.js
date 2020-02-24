// miniprogram/pages/order_history/order_history.js
import orderTools from "../../service/order/orderTools.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[]
  },


  deleteOrder(e){
    console.log(e.currentTarget.dataset)
    wx.showModal({
      title: '删除订单',
      content: '删除后无法复原，确认删除？',
      confirmText:"删除",
      confirmColor:"#f00",
      success: res => {
        if (res.confirm) {
          // console.log('用户点击确定')
          orderTools.deleteOrder(e.currentTarget.dataset.oid)
        } 
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh()
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
    orderTools.getOrderList(this, app.globalData.openid)

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