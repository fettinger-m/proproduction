<template>
    <b-container>
        <!--<VueFileAgent
                :uploadUrl="uploadUrl"
                v-model="filesData"
                ref="vueFileAgent"
        ></VueFileAgent>-->
        <vue-dropzone id="drop1" :options="dropOptions"></vue-dropzone>
    </b-container>
</template>

<script>
    import vueDropzone from "vue2-dropzone";


    export default {
        name: "LibraryCompTest",
        components: {
            vueDropzone
        },
        data() {
            return {

                filesData: [],
                uploadUrl: 'https://da-production.herokuapp.com/projects/test',
                dropOptions: {
                    url: "https://httpbin.org/post"
                }

            };
        }
    }
</script>

<style scoped>

</style>