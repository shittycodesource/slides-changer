import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes.js';

import store from '../store';

Vue.use(VueRouter);



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// Route guard
router.beforeEach((from, to, next) => {
    if (to.meta.authOnly || (to.name == null && from.meta.authOnly)) {
        if (!store.getters.getCurrentUser) {
            router.push("/");

            return false;
        }
    }
    
    next();
})

export default router;
