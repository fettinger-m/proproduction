<template>
    <b-container>
        <VueFileAgent :uploadUrl="uploadUrl" v-model="filesData"></VueFileAgent>
    </b-container>
</template>

<script>
    export default {
        name: "LibraryCompTest",
        data() {
            return {

                filesData: [],
                uploadUrl: 'https://console.cloud.google.com/storage/browser/production-test-1',

            };
        },
    }
</script>

<style scoped>

</style>