// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* 引入样式重置 */
import './assets/css/reset.css'

/* 引入store状态管理 */
import store from './store'

/* 引入elelment-ui框架 */
import elementUI from 'element-ui';
/* 引入element样式 */
import 'element-ui/lib/theme-chalk/index.css';
//调用插件
Vue.use(elementUI)

//给vue原型挂载一个服务器地址
Vue.prototype.$imgUrl = 'http://localhost:80'

/* 全局引入echarts */
import Echarts from 'echarts';
Vue.prototype.$eh = Echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
