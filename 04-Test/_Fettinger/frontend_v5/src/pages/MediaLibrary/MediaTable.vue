<template>
    <vuetable
            ref="mediaTableRef"
            :api-url=url
            :fields=fields
            :css="table"
            data-path=""
            pagination-path=""
    >
    </vuetable>
</template>

<script>
    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import Vue from 'vue';
    import MediaActions from "./MediaActions";
    import tableStyle from "../../css/tableStyle";

    Vue.component('media-actions', MediaActions);

    export default {
        name: "MediaTable",
        components: {
            'vuetable': Vuetable
        },
        data() {
            return {
                fields: [
                    {
                        name: 'name',
                        title: 'File Name',
                        width: '70%',
                        dataClass: 'text-left'
                    },
                    {
                        name: 'size',
                        title: 'File Size',
                        callback: 'humanFileSize',
                        width: '20%',
                        dataClass: 'text-left'
                    },
                    {
                        name: '__component:media-actions',
                        title: 'Actions',
                        width: '10%'
                    }
                ],
                table: tableStyle,

                projectId: '',
                url: 'https://da-production.herokuapp.com/',
            }
        },
        methods: {
            //Converts file size to human readable string
            humanFileSize: function (bytes) {
                if (Math.abs(bytes) < 1000) {
                    return bytes + ' B';
                }
                let units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

                let u = -1;
                do {
                    bytes /= 1000;
                    ++u;
                } while (Math.abs(bytes) >= 1000 && u < units.length - 1);
                return bytes.toFixed(1) + ' ' + units[u];
            }
        },
        mounted() {
            this.$root.$on('reloadMediaTable', () => {
                this.$refs.mediaTableRef.reload();
            });
        },

        created() {
            this.projectId = sessionStorage.getItem('sessionProjectID');
            this.url = "https://da-production.herokuapp.com/projects/" + this.projectId + "/media"
        }
    }
</script>

<style scoped>

</style>