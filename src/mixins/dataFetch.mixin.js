import ControlsPanel from '@/components/ControlsPanel.vue';
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            isLoading: true,
            isError: false,
        }
    },
    components: {
        ControlsPanel
    },
    computed: {
        ...mapGetters(["getSlides", "getSettings", "getActivePosition"]),
    },
    methods: {
        ...mapActions(['fetchSlides', 'updateSlide', 'updateFit']),
        async changePosition(direction) {
            try {
                await this.updateSlide(direction);
            } catch(error) {
                throw error;
            }
        },
        async changeFit(currentSetting) {
            try {
                await this.updateFit(currentSetting);
            } catch(error) {
                throw error;
            }
        }
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