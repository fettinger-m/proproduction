<template>
    <div>
        <VueFileAgent :uploadUrl="uploadUrl" v-model="filesData"></VueFileAgent>
    </div>
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