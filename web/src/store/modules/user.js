
const user = {
    state: {
      username:'',
      perms:[]
    },
  
    mutations: {
      setUserName(state,username){
        state.username = username
      },
      setPerms(state,perms){
        state.perms = perms
      }
    },
    actions:{
      setUserName({state,commit},username){
        commit('setUserName',username)
      }
    }
}

export default user
// actions: {
//    // 用户名登录 && 获取用户信息
//    LoginByUsername({ commit,state }, loginForm) {
//     return new Promise((resolve, reject) => {
//       api({
//         url:"/login/auth",
//         method: "post",
//         data:loginForm
//       }).then(data =>{
//         if(data.data.data === "success"){
//           setToken();
//           setUserInfo(data.data.info.userPermission)
//           commit('SET_USER',data.data.info.userPermission);

//           //生成路由
//           let userPermission = data.data.info.userPermission;
          
//           store.dispatch('GenerateRoutes',userPermission).then(() => {
//             router.addRoutes(store.getters.addRoutes)
//           })
//         }
//         resolve(data);
//       }).catch(err =>{
//         resolve(data)
//         reject(err)
//       })
//       })
//   },

//   //获取用户信息
//   GetInfo({ commit,state }){
//     return new Promise((resolve) =>{
//       let userPermission = JSON.parse(getUserInfo())
//       commit('SET_USER', userPermission)
//       store.dispatch('GenerateRoutes',userPermission).then(() => {
//         router.addRoutes(store.getters.addRoutes)
//       })
//       resolve()
//     })
//   },
//   LogOut({commit}){
//     return new Promise((resolve) => {
//       api({
//         url:"/login/logout",
//         method:"post"
//       }).then(data => {
//         commit('RESET_USER')
//         removeToken()
//         removeUserInfo()
//         resolve(data)
//       }).catch(err => {
//         console.log("err")
//         console.log("2333")
//         commit('RESET_USER')
//         removeToken()
//       })
//     })
//   },
//   //前端 登出
//   FedLogOut({commit}){
//     return new Promise(resolve => {
//       commit('RESET_USER')
//       removeToken()
//       removeUserInfo()
//       resolve()
//     })
//   }
// }
