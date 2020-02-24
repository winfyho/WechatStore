// miniprogram/pages/profile/profile.js
import userTools from "../../service/user/user.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    username:"",
    loginState:false
  },

  login(){
    
    userTools.login(this, app.globalData.openid)
  },


  routeToAddress(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },

  routeToOrderHistory(){
    wx.navigateTo({
      url: '/pages/order_history/order_history',
    })
  },

  // 跳转到修改用户信息页面-------------
  routeToModify(){
    wx.navigateTo({
      url: '/pages/modify/modify?uid=' + this.data.user._id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userTools.login(this, app.globalData.openid)
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
    userTools.getUser(this,this.data.user._id)
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