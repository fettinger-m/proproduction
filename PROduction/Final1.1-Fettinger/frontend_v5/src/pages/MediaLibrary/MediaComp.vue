<template>
    <b-container>
        <!-- Auto Upload doesnt work with our backend -> so manual upload -->
        <vue-dropzone
                :options="dropOptions"
                @vdropzone-complete="afterComplete"
                id="drop">
        </vue-dropzone>
        <MediaTable></MediaTable>
    </b-container>
</template>

<script>
    import vueDropzone from "vue2-dropzone";
    import axios from 'axios'
    import MediaTable from "./MediaTable";

    const client = axios.create({
        baseURL: 'https://da-production.herokuapp.com/',
        json: true
    });


    export default {
        name: "MediaComp",
        components: {
            MediaTable,
            vueDropzone
        },
        data() {
            return {
                projId: '',
                dropOptions: {
                    url: 'https://httpbin.org/post'
                }

            };
        },
        methods: {
            afterComplete(file) {
                const formData = new FormData();

                formData.append('file', file);

                client.post(`projects/${this.projId}/media/add`, formData)
                    .then(this.$root.$emit('reloadMediaTable'));
            }
        },
        mounted() {
            this.projId = sessionStorage.getItem('sessionProjectID');
        }
    }
</script>

<style scoped>

</style>