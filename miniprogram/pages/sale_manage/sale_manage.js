// miniprogram/pages/sale_manage/sale_manage.js
import saleTools from "../../service/sale/saleTools.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newName:"",
    newPrice:"",
    newTitle:"",
    filePath:"",
    cloudPath:"",
    showEditArea:false,
    saleList:[],
    stock:100,
    cats:["默认"]
  },

  deleteSale(e){
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

  startEdit(){
    this.setData({
      showEditArea: true
    })
  },
  inputNewName(e){
    // console.log(e.detail)
    this.setData({
      newName: e.detail.value
    })
  },
  inputNewTitle(e) {
    // console.log(e.detail)
    this.setData({
      newTitle: e.detail.value
    })
  },
  inputNewPrice(e) {
    // console.log(e.detail)
    this.setData({
      newPrice: parseFloat(e.detail.value)
    })
  },
  inputStock(e){
    this.setData({
      stock: parseInt(e.detail.value)
    })
  },
  chooseImage(e){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        let timeMark = new Date().getTime()
        // const tempFilePaths = res.tempFilePaths
        const filePath = res.tempFilePaths[0];
        const cloudPath = "images/" + this.data.newName + "_"+  timeMark + '.jpg';
        this.setData({
          filePath: filePath,
          cloudPath: cloudPath
        })
        console.log(this.data.filePath, "=>", this.data.cloudPath)

      }
    })
  },
  completeEdit(){
    let time = new Date().getTime()
    console.log("添加商品信息",this.data.newName, this.data.newPrice, this.data.newTitle)
    this.setData({
      showEditArea: false
    })
    if (this.data.newName === "" || this.data.newPrice === "" || this.data.newTitle === "" || this.data.filePath===""){
      wx.showModal({
        title: '信息有误',
        content: '请填写完整商品信息',
        showCancel:false,
      })
    }else{
      wx.cloud.uploadFile({
        cloudPath: this.data.cloudPath,
        filePath: this.data.filePath,
      }).then(res => {
        console.log(res.fileID)
        saleTools.addSale({
          salename: this.data.newName,
          title: this.data.newTitle,
          price: this.data.newPrice,
          stock:this.data.stock,
          cats:["默认"],
          time: time,
          imgUrl: res.fileID,
          pay_num:0,
          browse_num:0,
          cart_num:0
        })

      }).catch(error => {
        console.log(error)
      })
    }

    

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
    saleTools.getSaleList(this,{})
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