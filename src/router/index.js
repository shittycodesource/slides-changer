import Vue from 'vue';
import VueRouter from 'vue-router';

import MainView from '../views/MainView.vue';
import AuthView from '../views/AuthView.vue';
import PanelView from '../views/PanelView.vue';

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'main',
        component: MainView
    },
    {
        path: '/auth',
        name: 'main',
        component: AuthView
    },
    {
        path: '/panel',
        name: 'panel',
        component: PanelView
    },

//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
