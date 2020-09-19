// export default function request(options){
//   return new Promise((resolve,reject) => {
//     wx.request({
//       url:options.url,
//       method:options.method || "get",
//       data:options.data || {},
//       success:function (res){
//         // console.log(res)
//         resolve(res)
//       },
//       fail:function (err){
//         // console.log(res)
//         reject(err)
//       }

//     })
//   })
// }

// 简单写法
import {baseURL} from "./config"
export default function request(options){
  return new Promise((resolve,reject) => {
    wx.request({
      url:baseURL + options.url,
      method:options.method || "get",
      data:options.data || {},
      success:resolve,
      fail:reject
    })
  })
}