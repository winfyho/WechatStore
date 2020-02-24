// miniprogram/pages/modify/modify.js
import userTools from "../../service/user/user.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modify: false,
    uid:"",
    username:"",
    tellphone:"",
    userAddr:""
  },


  inputUsername(e) {
    // console.log(e.detail)
    this.setData({
      username: e.detail.value
    })
  },
  inputTell(e) {
    // console.log(e.detail)
    this.setData({
      tellphone: e.detail.value
    })
  },
  inputAddress(e) {
    // console.log(e.detail)
    this.setData({
      userAddr: e.detail.value
    })
  },
  modify(e) {
    this.setData({
      modify: true
    })
  },
  complete() {
    console.log(this.data.username, this.data.tellphone, this.data.userAddr)
    
    userTools.updateUser(this,this.data.uid, {
      username: this.data.username,
      tellphone: this.data.tellphone,
      userAddr: this.data.userAddr
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("用户openid", options)
    userTools.getUser(this, options.uid)
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