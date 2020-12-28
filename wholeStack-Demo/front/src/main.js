import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import util from "../utils/util";
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$util = util

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(axios)