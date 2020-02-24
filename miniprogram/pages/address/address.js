// miniprogram/pages/address/address.js
import addressTools from "../../service/address/addressTools.js"

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newName: "",
    newTell: "",
    newAddr: "",
    showEditArea: false,
    addrList: [],
  },

  deleteSale(e) {
    console.log(e.currentTarget.dataset)
    wx.showModal({
      title: '删除商品',
      content: '删除后无法还原，确认是否删除！',
      success: res => {
        if (res.confirm) {
          console.log('用户点击确定')
          saleTools.deleteSale(e.currentTarget.dataset.id)

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  completeEdit() {
    // console.log(this.data.newName, this.data.newTell, this.data.newAddr)
    addressTools.addNewAddr(
      this,
      app.globalData.openid, {
        name: this.data.newName,
        tellphone: this.data.newTell,
        address: this.data.newAddr
      })
  },

  startEdit() {
    this.setData({
      showEditArea: true
    })
  },
  inputName(e) {
    // console.log(e.detail)
    this.setData({
      newName: e.detail.value
    })
  },
  inputNewTell(e) {
    // console.log(e.detail)
    this.setData({
      newTell: e.detail.value
    })
  },
  inputNewAddr(e) {
    // console.log(e.detail)
    this.setData({
      newAddr: e.detail.value
    })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.startPullDownRefresh()
  },


  onPullDownRefresh: function() {
    addressTools.getAddrList(this,app.globalData.openid)
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