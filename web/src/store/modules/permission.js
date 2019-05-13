import {constantRouterMap} from '@/router/index'


// 判断用户是否拥有此菜单
function hasPermission(menus,route){
    console.log("does "+menus+" hasPermission "+route.perms)
    if(route.perms){
        // 如果这个路由有menu属性，就需要判断用户是否拥有此menu权限
        // let item
        // for(item=0;item<6;item++){
        //     console.log(menus[item])
        // }
        console.log(menus.indexOf(route.perms))
        return menus.indexOf(route.perms) > -1
    }else{
        return true
    }
}
/**
 * 递归过滤异步路由表，返回符合用户菜单权限的路由表
 * @param asyncRouterMap
 * @param menus
 */
function filterAsyncRouter(asyncRouterMap,menus){
    const accessedRouters = asyncRouterMap.filter(route => {
        console.log(route)
        console.log(hasPermission(menus,route))
        if(hasPermission(menus,route)){
            console.log(route)
            if(route.children && route.children.length){
                route.children = filterAsyncRouter(route.children,menus)
                return (route.children && route.children.length)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

const permission = {
    state:{
        routers: [],
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state,routers) => {
            console.log(routers)
            state.addRouters = routers
            state.routers = routers
        }
    },
    actions:{
        GenerateRoutes({commit},routePermObject){
            return new Promise(resolve => {
                console.log("userPermission ",routePermObject.perm)
                console.log("asyncRoute ",routePermObject.route)
                const asyncRouterMap = routePermObject.route;
                const menus = routePermObject.perm;

                let accessedRouters
                accessedRouters = filterAsyncRouter(asyncRouterMap,menus)
                console.log(accessedRouters)
                commit('SET_ROUTERS',accessedRouters)
                resolve()
            })
        }
    }
}
export default permission