function updateUser(_this,uid, options) {
  // console.log(uid, options)
  const db = wx.cloud.database()
  const userColl = db.collection("users")
  userColl.doc(uid).update({
    data:{
      username: options.username,
      tellphone: options.tellphone,
      userAddr: options.userAddr
    }
  })
  .then(res => {
    console.log("修改用户信息成功",options)
    wx.showToast({
      title: '修改成功',
      icon:"success"
    })
    _this.setData({
      modify: false      
    })
  })
}

function getUser(_this, uid) {
  const db = wx.cloud.database()
  const userColl = db.collection("users")
  userColl.doc(uid).get()
    .then(res => {
      wx.stopPullDownRefresh()
      console.log("获取用户信息", res.data)
      _this.setData({
        user:res.data,
        uid:res.data._id,
        username: res.data.username,
        tellphone: res.data.tellphone,
        userAddr: res.data.userAddr,
      })
    })
}

function login(_this, openid) {
  const db = wx.cloud.database()
  const userColl = db.collection("users")
  userColl.where({
      _openid: openid
    }).get()
    .then(res => {
      if (res.data.length > 0) {
        // 用户信息存在数据库
        console.log("登录成功", res.data[0])

        _this.setData({
          user: res.data[0],
          loginState: true

        })
      } else {
        userColl.add({
            data: {
              username: "username",
              tellphone: "",
              userAddr: "",
              addrList: []
            }
          })
          .then(res => {
            console.log("添加用户信息成功", res)
          })
      }

    })
}

export default {
  login,
  getUser,
  updateUser
}