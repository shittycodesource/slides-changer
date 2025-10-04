<template>
    <div id="app">

        <div 
            class="view" 
            @click="changeView"
        >
        
            <div
                v-if="isLoading == false && isError == false"
                v-for="(data, index) in getSlides"
                :key="index"

                :class="[
                    { 'active': getActivePosition == data.position }, `slide--${getSettings.fit}`
                ]"

                :style="`--img: url(${data.url}); --index: ${index};`"
                class="slide"
            ></div>
            <div v-else-if="isLoading == true && isError == false">Loading...</div>
            <div v-else>Error, check console</div>

        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: 'App',
    data() {
        return {
            isLoading: true,
            isError: false,
        }
    },
    computed: {
        ...mapGetters(["getSlides", "getSettings", "getActivePosition"]),
    },
    methods: {
        ...mapActions(['fetchSlides']),
        changeView() {
            this.activePosition++;
        },
    },
    async created() {
        try  {
            this.isLoading = true;

            await this.fetchSlides();

            this.isLoading = false;
        } catch(error) {
            this.isLoading = false;
            this.isError = true;

            console.log("Created fetch error");
            throw error;
        }
    }
}
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        width: 100%;
        height: 100%;
    }

    .slide {
        --img: "";
        --index: -999;

        position: fixed;
        width: 100%;
        height: 100vh;


        background: var(--img) center no-repeat;
        background-size: cover;

        opacity: 0;
        z-index: -9999;

        &.active {
            opacity: 1;
            z-index: calc(-1 * var(--index));
        }

        &--fit {
            background-size: contain;
        }
        
    }
</style>
