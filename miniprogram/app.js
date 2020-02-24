//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        
        env: 'srxd-dev-2fdj2',
        traceUser: true,
      })
    }

    let op = ""
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        console.log('app login: ', res.result.openid)
        op = res.result.openid;

        this.globalData = {
          openid: res.result.openid,
          
        }

      }
    })

    this.globalData = {}
  }
})
