
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import VueClipboard from 'vue-clipboard2'




Vue.config.productionTip = false
Vue.use(uView)
Vue.use(VueClipboard)

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

