// miniprogram/pages/cart/cart.js
import cartTools from "../../service/cart/cartTools.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[]
  },

  routeToDetail(e){
    wx.navigateTo({
      url: '/pages/detail/detail?sid=' + e.currentTarget.dataset.sid,
    })
  },

  deleteCart(e){
    console.log('用户点击确定', e.currentTarget.dataset)

    wx.showModal({
      title: '删除购物车',
      content: '是否删除该商品？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定', e.currentTarget.dataset.cartid)
          cartTools.deleteCart(e.currentTarget.dataset.cartid)
        } 
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
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
    cartTools.getCartList(this, app.globalData.openid)

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