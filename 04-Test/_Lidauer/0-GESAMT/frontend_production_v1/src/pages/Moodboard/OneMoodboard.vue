<template>
    <div>
        <b-form-file
                v-model="file"
                accept="image/*"
                placeholder="Choose a image or drop it here..."
                drop-placeholder="Drop image here..."
        ></b-form-file>
    </div>
</template>

<script>
    export default {
        name: "OneMoodboard",
        data() {
            return {
                file: '',
            }
        }
    }
</script>

<style scoped>

</style>