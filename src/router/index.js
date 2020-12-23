import Vue from 'vue'
import VueRouter from 'vue-router'
import ShoppiesView from '../components/shoppies-view.vue';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        name: 'ShoppiesView',
        component: ShoppiesView,
    }
  ]
})

export default router
