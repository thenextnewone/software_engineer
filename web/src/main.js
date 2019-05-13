// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import '@/permission'
import axios from 'axios'
import '@/mock/index.js'
import '@/assets/iconfont/iconfont.css'
import '@/assets/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'

require('./mock/index.js')
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

axios.defaults.baseURL = "http://localhost:8080"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created:{
    console(){
      console.log(router)
    }
  }
})