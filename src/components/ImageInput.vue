<template>
    <input 
        type="file" 
        accept=".jpeg,.jpg,.png,.webp,.gif"
        multiple

        @change="input"
    />
</template>

<script>
export default {
    name: "ImageInput",
    props: {
        array: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        async input(event) {
            try {
                const images = [];

                for (let i = 0; i <= event.target.files.length - 1; i++) {
                    const b64 = await this.toBase64(event.target.files[i]);
    
                    images.push(b64);
                }

                this.$emit("upload", images);
            } catch(error) {
                console.error("Image input error", error);
                throw error;
            }
        },
        toBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
            });
        }
    }
}
</script>