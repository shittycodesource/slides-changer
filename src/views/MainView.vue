<template>
    <div class="view">
        <div
            v-if="isLoading == false && isError == false"
            v-for="(data, index) in getSlides"
            :key="index"

            :class="[
                { 'active': getActivePosition == data.position }, 
                `slide--${getSettings.fit}`
            ]"

            :style="`--img: url(${data.url}); --index: ${index};`"
            class="slide"
        ></div>
        <div v-else-if="isLoading == true && isError == false">Loading...</div>
        <div v-else>Error, check console</div>
        
        <controls-panel 
            v-if="isPanelHidden == false"
            @changePosition="changePosition"
            @changeFit="changeFit"
        ></controls-panel>
    </div>
</template>

<script>
import dataFetchMixin from '@/mixins/dataFetch.mixin';

export default {
    name: "MainView",
    data() {
        return {
            isPanelHidden: true,
            listener: null
        }
    },
    mixins: [ dataFetchMixin ],
    methods: {
        togglePanel() { this.isPanelHidden = !this.isPanelHidden; },
        toggleHandler(event) {
            if (event.keyCode == 78) {
                this.togglePanel();
            }
        }
    },
    created() {
        window.addEventListener('keydown', this.toggleHandler)
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.toggleHandler); // there is no navigation using SPA links
        // so i don't know why i did this
    }
}
</script>

<style lang="scss">
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