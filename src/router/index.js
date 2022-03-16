import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import report from '@/components/report'

Vue.use(Router)

const routes = [
  {path: '/', component: index, name: 'home'},
  {path: '/report', component: report, name: 'login'}
]

export default new Router({
  mode: 'history',
  hashbang: false,
  base: process.env.BASE_URL,
  routes
})
