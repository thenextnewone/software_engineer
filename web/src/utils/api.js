import axios from 'axios'
import {Message, MessageBox, Header} from 'element-ui'
import store from '../store'
import {getToken} from '@/utils/auth.js'
//创建axios实例
const service = axios.create({
    baseUrl: "http://localhost:8080",
    timeout:15000,
     headers:{
    //   'X-Requested-With':'XMLHttpRequest',
    //   'Content-Type':'application/json'
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json',
        'Authorization' : getToken("SESSIONID")
     }
      // common['Authorization'] : doCookie.getCookie("SESSIONID")
    
})
service.defaults.baseURL= 'http://localhost:8080'
//request拦截器
  // service.interceptors.request.use(config =>{
  //     return config
  // }),error =>{
  //     console.error(error)
  //     Promise.reject(error)
  // }
  // //response拦截器
  // service.interceptors.response.use(
  //     response =>{
  //         const res = response.data;
  //         if(res.code == '1000'){
  //             return res;
  //         }
  //         if (res.code == '100'){
  //             return res.info;
  //         }else if(res.code == "20011"){
  //             Message({
  //                 showClose:true,
  //                 message:res.msg,
  //                 type:'error',
  //                 duration:500,
  //                 onClose: () =>{
  //                     store.dispatch('FedLogOut').then(() => {
  //                         location.reload() //为了重新实例化vue-router对象，避免bug
  //                     })
  //                 }
  //             });
  //             return Promise.reject("未登录")
  //         }else{
  //             Message({
  //                 message: res.msg,
  //                 type:'error',
  //                 duration: 3 * 1000
  //             })
  //             return Promise.reject(res)
  //         }
  //     },
  //     error => {
  //         console.error('err' + error)
  //         Message({
  //             message: error.message,
  //             type: 'error',
  //             duration: 3 * 1000
  //         }) 
  //         return Promise.reject(error)
  //     }
  //)
export default service