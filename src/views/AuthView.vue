<template>
    <div class="auth-page">

        <label>Name</label>
        <input type="text" v-model="email" />
        <label>Pass</label>
        <input type="text" v-model="password" />

        <button type="button" @click="login" :disabled="isRequestActive">AUTH</button>

        <span v-if="isRequestActive">Loading...</span>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "AuthView",
    data() {
        return {
            isRequestActive: false,
            email: '',
            password: '',
        }
    },
    methods: {
        ...mapActions(['auth']),
        async login() {
            try {
                this.isRequestActive = true;
                
                const response = await this.auth({email: this.email, password: this.password});

                if (response == true) {
                    this.$router.push("/");
                } else {
                    this.email = '';
                    this.password = '';
                    this.isRequestActive = false;
                }
            } catch(error) {
                this.email = '';
                this.password = '';
                this.isRequestActive = false;

                throw error;
            }
        }
    }
}
</script>

<style lang="scss">
    .auth-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 25px;

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>