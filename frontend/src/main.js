import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
const axiosconfig = {
  baseURL: 'http://localhost:3000/',
  timeout: 30000,
};
Vue.prototype.$http = axios.create(axiosconfig)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),

}).$mount('#app')
