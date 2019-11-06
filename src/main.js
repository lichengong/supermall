import "babel-polyfill"
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index'
import FastClick from 'fastclick'
import 'lib-flexible/flexible'
import axios from 'axios'
Vue.prototype.axios=axios

//图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  loading: require("./assets/img/imgloading/loading.gif")
})
//解决点击延迟300ms的问题
FastClick.attach(document.body)

Vue.config.productionTip = false
//事件总线添加到Vue原型链，方便后续调用
Vue.prototype.$bus=new Vue()
//导入mint-ui组件库
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import 'mint-ui/lib/style.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//定义一个全局过滤器，转换时间格式
import moment from 'moment'
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

//导入mui样式和内置图标
import '@/lib/mui/css/mui.css'
import '@/lib/mui/css/icons-extra.css'

路由守卫
router.beforeEach((to,from,next)=>{
  var user = localStorage.getItem('user')
  if(user){
    next()
  }else{
    if(to.path =='/login'|| to.path == '/register'){
      next()
    }else{
      next('/login')
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
