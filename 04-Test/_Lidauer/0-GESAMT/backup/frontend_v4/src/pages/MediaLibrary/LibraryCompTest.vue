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
                uploadUrl: 'https://example.com',

            };
        },
    }
</script>

<style scoped>

</style>