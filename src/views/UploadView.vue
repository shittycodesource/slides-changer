<template>
    <div class="upload-page">
        

        Upload <br/><br/>

        <input type="file">

        <br/><br/>

        List of uploaded:

        <div class="uploaded">

            <div 
                class="uploaded__card" 
                
                v-for="(item, index) in getSlides"
                :key="index" 
            >
                <img :src="item.url"  class="uploaded__img"/>
                <div class="uploaded__number">{{ item.position + 1 }}</div>

                <button class="uploaded__delete" type="button">x</button>
                <div class="uploaded__arrows">
                    <button class="uploaded__left" type="button" @click="move(item, '-')">&lt;</button>
                    <button class="uploaded__right" type="button" @click="move(item, '+')">></button>
                </div>
            </div>

        </div>

        <br/><br/>

        <button type="button" @click="saveOrder">Save order</button>
    


    </div>
</template>

<script>
import dataFetchMixin from '@/mixins/dataFetch.mixin';

import { mapActions } from 'vuex';

export default {
    name: "UploadView",
    mixins: [ dataFetchMixin ],
    data() {
        return {
            isRequestActive: false
        }
    },
    methods: {
        ...mapActions(['moveSlide', 'slidesUpdatePositions']),

        move(data, direction) {
            this.moveSlide({ slide: data, direction });
        },

        async saveOrder() {
            try {
                this.isRequestActive = true;
                
                await this.slidesUpdatePositions();

                this.isRequestActive = false;
            } catch(error) {
                console.error('save order error: ', error);
                throw error;
            }
        }

    }
}
</script>

<style lang="scss">
    .uploaded {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;

        width: 100%;

        &__card {
            position: relative;            
        }

        &__img {
            object-fit: cover;
            width: 100%;
            display: block;
            height: auto;
        }

        &__number,
        &__left,
        &__right,
        &__delete {
            width: 50px;
            height: 50px;

            background: #000;
            border: none;
            border-radius: 8px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            font-size: 18px;
            color: #fff; 
            font-weight: 900;
            text-align: center;
        }

        &__left,
        &__right,
        &__delete {
            cursor: pointer;

            &:hover {
                background: #fff;
                color: #000;
            }
        }
        
        &__number {
            position: absolute;
            bottom: 5px;
            left: 5px;
        }
        
        &__delete {
            position: absolute;
            background: red;

            bottom: 5px;
            right: 5px;
        }

        &__arrows {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;

            width: 100%;

            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__left,
        &__right {

        }
    }
</style>