import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import menu from './modules/menu'
import iframe from './modules/iframe'
import action from './modules/action'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        user,
        app,
        permission,
        menu,
        iframe,
        action
    },
    getters
})

export default store