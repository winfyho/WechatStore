// components/cart-item/cart-item.js
Component({
  /**
   * 组件的属性列表
   *
   */

  lifetimes: {
    attached: function () {
      this.setData({
        subtotal:this.data.num*this.data.cartItem.price
      })
    }
  },


  properties: {
    cartItem:{
      type:Object,
      value:{
        title:"商品名称",
        imgUrl: "https://7465-testcloud-ltqmd-1300575674.tcb.qcloud.la/images/sale1_1578361598008.jpg?sign=77c1fb5d75ff4cf522ff1e5a048469ba&t=1578366345",
        subtotal:100,
        num:1
      }
    },
    num:{
      type:Number,
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    choosed:false,
    subtotal:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeNum(e){
      this.setData({
        num:e.currentTarget.dataset.num,
        subtotal: parseFloat(this.data.cartItem.price) * e.currentTarget.dataset.num
      })
    },
    chooseCart(e){
      let price = e.currentTarget.dataset.cart.price
      let num = e.currentTarget.dataset.num
      // let subtotal = price * num
      console.log(e.currentTarget.dataset.cart.title, num,this.data.subtotal)

      
      // 向父组件传递消息
      if(this.data.choosed === false){
        // 选择状态
        this.setData({
          choosed: true
        })


      }else{
        // 取消选择状态
        this.setData({
          choosed: false
        })


        
      }
      
    }
  }
})
