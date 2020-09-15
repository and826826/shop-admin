import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/global.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false

axios.defaults.baseURL='https://www.liulongbin.top:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http=axios
Vue.component('tree-table',TreeTable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
