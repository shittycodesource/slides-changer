import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

let app;

onAuthStateChanged(auth, (user) => {
    if (!app) {
        if (user) {
            if (user.uid) {
                console.log("Logged id");
            }
            // const currentUser = auth.currentUser;
            // store.dispatch("setUser", currentUser);
        } else {
            console.log("Not logged in");
        }
            
        app = new Vue({
            store,
            router,
            render: h => h(App)
        }).$mount('#app');
    }
})