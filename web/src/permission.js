import router from "./router"
import NProgress from 'nprogress'
import {getToken} from '@/utils/auth'
import store from './store'
import axios from 'axios'
import { getIFramePath, getIFrameUrl } from '@/utils/iframe'

const whiteList = ['/login','/auth-redirect']
console.log(router)
router.beforeEach((to,from,next) => {
    NProgress.start()
    console.log("permission.js:"+ getToken())
    let userName = getToken()
    if(to.path === '/login'){
      if(getToken()){
        next({path:'/'})
      }else{
        next()
      }
    }else{
      if(!getToken()){
        next({path:'/login'})
      }else{
        console.log(userName)
        addDynamicMenuAndRoutes(userName,to,from)
        console.log("this is dynamic menu")
        next()
      }
    }
})

router.afterEach(() => {
    NProgress.done()
})


/**
* 加载动态菜单和路由
*/

function addDynamicMenuAndRoutes(userName, to, from) {
    let dynamicRoutes,dddd
    if(store.state.app.menuRouteLoaded) {
      console.log('动态菜单和路由已经存在.')
      return
    }
    axios.get("/menu/findNavTree",userName).then(res =>{
        // 添加动态路由
      dynamicRoutes = addDynamicRoutes(res.data.data)
      dddd = res.data.data
      console.log(res.data)
      console.log(dynamicRoutes)
      // 处理静态组件绑定路由
      handleStaticComponent(router, dynamicRoutes)
      console.log("处理静态组件绑定路由")
      router.addRoutes(router.options.routes)

      console.log(router)

      console.log("加载动态路由")
      // 保存加载状态
      store.commit('menuRouteLoaded', true)
      console.log("保存加载状态")
      // 保存菜单树
      store.dispatch('toSetNavTree',res.data.data)
      //console.log("保存菜单树")
      //console.log(store.state.menu.navTree)
    }).then(res => {
      console.log(userName)
        axios.post("/user/findPermissions",userName).then(res => {
            store.commit('setPerms',res.data)
            console.log("权限"+res.data)
            let routePermObject = {
              perm : res.data,
              route : dddd
            }
            
          store.dispatch('GenerateRoutes',routePermObject).then(() => {
            store.dispatch('toSetNavTree',store.state.permission.addRouters)
            // router.addRoutes(store.state.permission.routers)
            // router.addRoutes(store.state.permission.addRouters)
            console.log(store.state.permission.addRouters)
            console.log(router)
          })

        })
    }).catch(function(res){
        
    })

  }
  
  /**
   * 处理路由到本地直接指定页面组件的情况
   * 比如'代码生成'是要求直接绑定到'Generator'页面组件
   */
  function handleStaticComponent(router, dynamicRoutes) {
    console.log(router)
    console.log("111111111")
    console.log(dynamicRoutes)
    router.options.routes[1].children = router.options.routes[1].children.concat(dynamicRoutes)
  }
  
  
/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  console.log(url)
  console.log(length)
  for(let i=0; i<length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if(path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
  console.log(store.state.iframe.iframeUrl)
  console.log(length)
}

  /**
  * 添加动态(菜单)路由
  * @param {*} menuList 菜单列表
  * @param {*} routes 递归创建的动态(菜单)路由
  */
  function addDynamicRoutes (menuList = [], routes = []) {
   var temp = []
   for (var i = 0; i < menuList.length; i++) {
     if (menuList[i].children && menuList[i].children.length >= 1) {
       temp = temp.concat(menuList[i].children)
     } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
        menuList[i].url = menuList[i].url.replace(/^\//, '')
        // 创建路由配置
        var route = {
          path: menuList[i].url,
          component: null,
          name: menuList[i].name,
          perms:menuList[i].perms,
          url:menuList[i].url,
          children:menuList[i].children,
          meta: {
            icon: menuList[i].icon,
            index: menuList[i].id
          }
        }
        let path = getIFramePath(menuList[i].url)
      console.log(path)
      if (path) {
        // 如果是嵌套页面, 通过iframe展示
        route['path'] = path
        route['component'] = resolve => require([`@/views/IFrame/IFrame`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = getIFrameUrl(menuList[i].url)
        let iFrameUrl = {'path':path, 'url':url}
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
         try {
           // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
           // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
           let array = menuList[i].url.split('/')
           let url = ''
           for(let i=0; i<array.length; i++) {
              url += array[i].substring(0,1).toUpperCase() + array[i].substring(1) + '/'
           }
           url = url.substring(0, url.length - 1)
           route['component'] = resolve => require([`@/views/${url}`], resolve)
         } catch (e) {}
        }
       
       routes.push(route)
     }
   }
   if (temp.length >= 1) {
     addDynamicRoutes(temp, routes)
   } else {
     console.log('动态路由加载...')
     console.log(routes)
     console.log('动态路由加载完成.')
   }
   return routes
  }
  