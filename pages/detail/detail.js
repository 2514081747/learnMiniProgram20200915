// pages/detail/detail.js
import {getDetail,GoodsBaseInfo,ShopInfo, ParamInfo,getRecommends} from "../../service/detail"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    iid:"",
    topImages:[],
    baseInfo:{},
    shopInfo:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 保存iid
    this.setData({
      iid:options.iid
    })
    
    this._getDetailData()
    this._getRecommendsData()
   
  },
  _getDetailData(){
    getDetail(this.data.iid).then(res => {
      console.log(res)
      // 取出顶部图片
      // 1.取出顶部的图片
      const topImages =res.data.result.itemInfo.topImages;
      console.log(topImages)
      this.setData({
        topImages:topImages
      })
      // 2.创建baseinfo对象
      const baseInfo = new GoodsBaseInfo(res.data.result.itemInfo,
         res.data.result.columns, res.data.result.shopInfo.services)
      this.setData({
        baseInfo:baseInfo
      })
      console.log(baseInfo)

      // 3.创建商店shopInfo对象
      const shopInfo = new ShopInfo(res.data.result.shopInfo);
      this.setData({
        shopInfo:shopInfo
      })
      // 4.创建商品细节信息
      const detailInfo = res.data.result.detailInfo
      this.setData({
        detailInfo:detailInfo
      })
      // 5.创建商品尺寸对象信息
      const paramInfo = new ParamInfo(res.data.result.itemParams.info, 
        res.data.result.itemParams.rule)

      this.setData({
        paramInfo:paramInfo
      })
      // 6创建商品评论信息
      let commentInfo = {}
      if (res.data.result.rate && res.data.result.rate.cRate > 0) {
        commentInfo = res.data.result.rate.list[0]
        console.log(commentInfo)
      }
      this.setData({
        commentInfo:commentInfo
      })
     

    })
   
  },
  _getRecommendsData(){
    getRecommends().then(res => {
      // console.log(res)
      // 取出推荐数据
      const recommends = res.data.data.list
      this.setData({
        recommends:recommends
      })
    })
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

  },
  onAddCart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})