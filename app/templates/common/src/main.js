import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
<% if(temp==='oms'){ %>
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.prototype.$brandInfo = {
  brandId: 1,
  brandName: <%= brandName %>
}
<% } else if(temp==='h5'){ %>
import Vant from 'vant'
Vue.use(Vant)
<% } %>

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
