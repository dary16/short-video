
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import VueClipboard from 'vue-clipboard2'
import ENV_DATA from '@/util/util.js'


Vue.prototype.ENV_DATA = ENV_DATA
Vue.config.productionTip = false
Vue.use(uView)
Vue.use(VueClipboard)
Vue.use(ENV_DATA)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

