
const app = {
    state:{
        menuRouteLoaded:false
    },
    getters:{
        // collapse(state){
        //     return state.collapse
        // }
    },
    mutations:{
        menuRouteLoaded(state,menuRouteLoaded){
            state.menuRouteLoaded = menuRouteLoaded
        }
    },
    actions:{
        setMenuRouteLoaded({state,commit},menuRouteLoaded){
            commit('menuRouteLoaded',menuRouteLoaded)
        }
    }
}


export default app