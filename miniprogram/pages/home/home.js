// miniprogram/pages/home/home.js
import saleTools from "../../service/sale/saleTools.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saleList: [],
    priceSort: "asc",
    filterPriceName: "价格升序",
    filterIndex: 0,
    keyword:""
  },

  inputKeyword(e){
    this.setData({
      keyword:e.detail.value
    })
  },

  searchSaleList(e){
    saleTools.searchSaleList(this,this.data.keyword)
  },

  routeToDetail(e) {


    wx.navigateTo({
      url: '/pages/detail/detail?sid=' + e.currentTarget.dataset.sid + "&browse_num=" + e.currentTarget.dataset.browse_num,
    })
  },

  orderByValue() {
    this.setData({
      filterIndex: 0
    })
    saleTools.getSaleList(this, {
      sortType: "pay_num",
      sortValue: "desc"
    })
  },

  orderByPrice() {
    if (this.data.priceSort === "asc") {
      this.setData({
        filterIndex: 1,
        priceSort: "desc",
        filterPriceName: "价格升序"
      })
      saleTools.getSaleList(this, {
        sortType: "price",
        sortValue: "asc"
      })
    } else {
      this.setData({
        filterIndex: 1,
        priceSort: "asc",
        filterPriceName: "价格降序"
      })
      saleTools.getSaleList(this, {
        sortType: "price",
        sortValue: "desc"
      })
    }
  },

  orderByHot() {
    this.setData({
      filterIndex: 2
    })
    saleTools.getSaleList(this, {
      sortType: "browse_num",
      sortValue: "desc"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.startPullDownRefresh()
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
    this.setData({
      keyword:""
    })
    saleTools.getSaleList(this, {
      sortType: "pay_num",
      sortValue: "desc"
    })
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