export default{
    state:{
        navTree:[]
    },
    getters:{

    },
    mutations:{
        setNavTree(state,navTree){
            state.navTree = navTree;
        }
    },
    actions:{
        toSetNavTree({commit,state},navTree){
            commit('setNavTree',navTree)
        }
    }
}