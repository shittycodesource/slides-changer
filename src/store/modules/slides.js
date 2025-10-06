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
        },


        MOVE_SLIDE(state, data) {
            const slides = state.slides;
            const position = data.slide.position;
            const index = slides.indexOf(slides.find(item => item.url == data.slide.url));

            if (data.direction == '-') {
                slides[index].position -= 1;
                
                const prev = slides[index - 1];
                prev.position += 1;
                
                slides[index - 1] = slides[index];
                slides[index] = prev;

                if (index == 0) {
                    return false;
                }

            } else {
                slides[index].position += 1;
                
                const next = slides[index + 1];
                next.position -= 1;
                
                slides[index + 1] = slides[index];
                slides[index] = next    ;

                if (index == (slides.length - 1)) {
                    return false;
                }
            }

            state.slides = slides;
        },

        DELETE_SLIDE(state, data) {
            const slides = state.slides
            const index = slides.indexOf(slides.find(item => item.url == data.url && item.position == data.position));

            console.log(index)

            slides.splice(index, 1);

            state.slides = slides;
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
        },

        async slidesUpdatePositions({getters}) {
            try {
                if (!getters.getCurrentUser) return false;

                const slides = getters.getSlides;
                await updateDoc(doc(db, "slides", "slide"), { slides: slides });
            } catch(error) {
                console.error("slidesUpdatePositions error: ", error);
                throw error;
            }
        },
        

        deleteSlide({commit}, data) {
            commit("DELETE_SLIDE", data);
        },

        moveSlide({commit}, data) {
            commit("MOVE_SLIDE", data);
        }
    },

    getters: {
        getSettings: (state) => state.settings,
        getSlides: (state) => state.slides.sort((a, b) => a - b),
        getActivePosition: (state) => state.activePosition,
    },
}