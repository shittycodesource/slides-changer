import { db } from '@/firebase/index.js';
import { doc, increment, onSnapshot, updateDoc } from "firebase/firestore";

export default {
    state: {
        snapshot: null,
        settings: {}, // fit | cover 
        slides: [], // { url: "...", position: 0 }
        activePosition: -999,
    },
    
    mutations: {
        SET_SLIDES: (state, data) => state.slides = data,
        SET_ACTIVE_POSITION: (state, num) => state.activePosition = num,
        SET_SETTINGS: (state, data) => state.settings = data,

        SET_SNAPSHOT(state, snapshot) {
            state.snapshot = snapshot;
        }
    },
    
    actions: {
        async fetchSlides({commit}) {
            try {
                const snapshot = onSnapshot(doc(db, "slides", "slide"), (doc) => {
                    const data = doc.data();

                    commit("SET_SETTINGS", data.settings);
                    commit("SET_SLIDES", data.slides);
                    commit("SET_ACTIVE_POSITION", data.activePosition);
                })
                
                commit("SET_SNAPSHOT", snapshot);
            } catch(error) {
                console.error('fetchSlides error', error);
                throw error;
            }
        },

        async updateSlide({getters}, direction) {
            try {
                if (!getters.getCurrentUser) return false; 

                const func = direction == "+" ? increment(1) : increment(-1);
                await updateDoc(doc(db, "slides", "slide"), { activePosition: func });
            } catch(error) {
                console.error('updateSlide error', error);
                throw error;
            }
        },

        async updateFit({getters}, currentSetting) {
            try {
                if (!getters.getCurrentUser) return false;

                const mode = currentSetting == "cover" ? "fit" : "cover";
                await updateDoc(doc(db, "slides", "slide"), { settings: { fit: mode } });
            } catch(error) {
                console.error('updateFit error', error);
                throw error;
            }
        }
    },

    getters: {
        getSettings: (state) => state.settings,
        getSlides: (state) => state.slides,
        getActivePosition: (state) => state.activePosition,
    },
}