<template>
    <div class="panel-page">

        <controls-panel 
            @changePosition="changePosition"
            @changeFit="changeFit"
        ></controls-panel>

    </div>
</template>

<script>
import dataFetchMixin from '@/mixins/dataFetch.mixin';


export default {
    name: "PanelView",
    mixins: [ dataFetchMixin ]
}
</script>

<style lang="scss">
    .panel-page {
        .controls-panel {
            width: 100%;
            height: 100%;

            max-width: 100%;
            max-height: 100%;
        }
    }
</style>