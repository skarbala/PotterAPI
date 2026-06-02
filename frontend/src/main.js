import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import VueRouter from 'vue-router'
import Spelleology from '../src/components/Spelleology'
import SortingHat from '../src/components/SortingHat'
import Welcome from '../src/components/Welcome'
import QuoteGenerator from '../src/components/QuoteGenerator'
import GringottsBank from '../src/components/GringottsBank'

const axiosconfig = {
  baseURL: 'http://localhost:3000/',
  timeout: 30000,
};
Vue.prototype.$http = axios.create(axiosconfig)
Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    { path: '/spelleology', component: Spelleology },
    { path: '/sortingHat', component: SortingHat },
    { path: '/quotes', component: QuoteGenerator },
    { path: '/gringottsBank', component: GringottsBank },
    { path: '/', component: Welcome }

  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
