// components/order/order.js
import orderTools from "../../service/order/orderTools.js"
Component({
  /**
   * 组件的属性列表
   */
  lifetimes: {
    attached: function () {
      let totalNum = 0;
      this.data.saleList.forEach( i=> {
        totalNum += i.num
      })
      // console.log(totalNum)
      if (this.data.saleList.length === 1){
        // 订单只有一样商品
        let title = this.data.saleList[0].sale.title;
        let imgList = this.data.saleList[0].sale.imgUrl;
        this.setData({
          title,
          imgList,
          totalNum
        })
        // console.log(this.data.saleList,this.data.title,this.data.imgList[0])

      }else{
        // 订单有多样商品，只截取前三张图片
        let saleList = this.data.saleList.slice(0,3)
        let imgList = [];
        let title = ""
        saleList.forEach( i => {
          imgList.push(i.sale.imgUrl)
        })
        this.setData({
          title,
          imgList,
          totalNum
        })
        console.log(imgList, title)
      }
    },
    
  },

  properties: {
    oid:{
      type:String,
      value:""
    },
    state:{
      type:String,
      value:"状态"
    },
    detail:{
      type:Object,
      value:[]
    },
    saleList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title:"商品名称",
    imgList:[],
    totalNum:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancelOrder(e){
      // console.log(this.data.oid)
      orderTools.cancelOrder(this.data.oid)
    }
  }
})
