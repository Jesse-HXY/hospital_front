// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueCookie from 'vue-cookie'
import htmlToPdf from '@/components/utils/htmlToPdf/htmlToPdf'
Vue.use(htmlToPdf)
Vue.use(VueCookie)
// var axios = require('axios');


// //var urlpath = "http://localhost:8080/";
// Vue.prototype.urlpath = urlpath
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios
axios.defaults.baseURL =  "http://localhost:8080/";
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
