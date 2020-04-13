import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.less'

import router from '@/router'

import plugin from '@/components'

import axios from '@/api'
Vue.prototype.$http = axios

Vue.use(plugin)

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
