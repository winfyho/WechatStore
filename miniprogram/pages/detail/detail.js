// miniprogram/pages/detail/detail.js
import saleTools from "../../service/sale/saleTools.js"
import cartTools from "../../service/cart/cartTools.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sale: {}
  },
  routeToOrder(){
    let url = '/pages/order/order?sid=' + this.data.sale._id + '&num=1';
    wx.navigateTo({
      url: url,

      success: res => {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { 
          orderList:[
            {
              sale: this.data.sale,
              num:1,
              subTotal: parseFloat(this.data.sale.price) * 1
            }
          ]
        })
      }
    })
    
  },

  addCart(e) {
    let sale = e.currentTarget.dataset.sale
    // console.log("添加购物车", sale.title)

    cartTools.addCart(sale, app.globalData.openid)
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    // saleTools.browseSale(options.sid, parseInt(options.browse_num))
    saleTools.getSaleDetail(this, options.sid)
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
    saleTools.updateData(this.data.sale, {
      browse_num: this.data.sale.browse_num + 1,
      pay_num: this.data.sale.pay_num,
      cart_num: this.data.sale.cart_num,
    })
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