<template>
    <div class="controls-panel">
        <button 
            class="controls-panel__nav controls-panel__nav--left"
            @click="$emit('changePosition', '-')"
            :disabled="getActivePosition <= 0"
        >
            &lt;<br/>
            {{ getActivePosition - 1 }}
         </button>

        <button class="controls-panel__toggle" @click="$emit('changeFit', getSettings.fit)">
            Current:
            {{ getSettings.fit }}

            <br/>
            <br/>
            Slide: {{ getActivePosition }}
        </button>

        <button 
            class="controls-panel__nav controls-panel__nav--right"
            @click="$emit('changePosition', '+')"
        >
            > <br/>
            {{ getActivePosition + 1 }}
        </button>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: "ControlsPanel",
    computed: {
        ...mapGetters(["getSettings", "getActivePosition"])
    }
}
</script>

<style lang="scss">
    .controls-panel {
        display: flex;
        align-items: center;

        width: 350px;
        height: 150px;

        position: fixed;
        bottom: 0;
        right: 0;

        z-index: 1000;
        
        background: #fff;
        border: 1px solid #f1f1f1; 

        &__toggle {
            height: 100%;
            min-width: 80px;

            background: grey;
            cursor: pointer;

            font-family: inherit;
            // font-size: 40px;
            color: #fff;

            // border: none;
        }
    
        &__nav {

            font-family: inherit;
            font-size: 40px;
            font-weight: 900;
            color: #fff;

            background: red;
            cursor: pointer;
            // border: none;
            width: 100%;
            height: 100%;

            &:disabled {
                opacity: .5; 
            }
        }
    }

</style>
