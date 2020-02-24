function getAddrList(_this,openid){
  const db = wx.cloud.database()
  const userColl = db.collection("users")
  userColl.where({
    _openid: openid
  }).get()
  .then(res => {
    console.log("用户的收货地址列表",res.data[0].addrList)
    wx.stopPullDownRefresh()
    _this.setData({
      addrList: res.data[0].addrList
    })
  })
}

function addNewAddr(_this,openid, options) {
  console.log(options)
  const db = wx.cloud.database()
  const addrColl = db.collection("address")
  const userColl = db.collection("users")
  userColl.where({
      _openid: openid
    }).get()
    .then(res => {
      let addrList = res.data[0].addrList;
      let newAddress = {
        name: options.name,
        tellphone: options.tellphone,
        address: options.address,
      }
      addrList.push(newAddress)
      console.log("新的收货地址", addrList)


      userColl.doc(res.data[0]._id).update({
        data: {
          addrList:addrList
        }
      })
      .then(res => {
        // console.log(res)
        _this.setData({
          showEditArea: false,
        })
        wx.showToast({
          title: '添加收货地址成功',
          icon:"success"
        })
        wx.startPullDownRefresh()
      })

    })

}

export default {
  addNewAddr,
  getAddrList
}