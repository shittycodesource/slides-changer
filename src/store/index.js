import Vue from 'vue';
import Vuex from 'vuex';

import { db } from '../firebase/index.js';
import { doc, onSnapshot } from "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        snapshot: null,

        settings: {}, // fit | cover 
        slides: [], // { url: "...", position: 0 }
        activePosition: -999,
    },
    getters: {
        getSettings: (state) => state.settings,
        getSlides: (state) => state.slides,
        getActivePosition: (state) => state.activePosition,
    },
    mutations: {
        SET_SLIDES: (state, data) => state.slides = data,

        SET_ACTIVE_POSITION: (state, num) => state.activePosition = num,

        SET_SETTINGS: (state, data) => state.settings = data,

        SET_SNAPSHOT(state, snapshot) {
            console.log('Set snapshot', snapshot);

            state.snapshot = snapshot;
        }
    },
    actions: {

        async fetchSlides({commit}) {
            try {

                const snapshot = onSnapshot(doc(db, "slides", "slide"), (doc) => {
                    const data = doc.data();

                    console.log('Snapshot  response: ', data);
                    
                    commit("SET_SETTINGS", data.settings);
                    commit("SET_SLIDES", data.slides);
                    commit("SET_ACTIVE_POSITION", data.activePosition);
                })
                
                commit("SET_SNAPSHOT", snapshot);
            } catch(error) {
                console.log('fetchSlides error', error);
                throw error;
            }
        }

    },
    modules: {}
})
