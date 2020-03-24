<template>
    <vuetable ref="locationTableRef"
              :api-url=url
              :fields="fields"
              :css="tableStyle.table"
              data-path=""
              pagination-path=""
              @vuetable:row-clicked="onRowClicked"
    >
    </vuetable>

</template>

<script>
    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import TableStyle from "../../css/TableStyle";
    import Vue from 'vue'
    import LocationActions from "./LocationActions";
    import {mapGetters} from "vuex";

    Vue.component('location-actions', LocationActions);

    export default {
        name: "LocationTable",
        components: {
            Vuetable
        },
        data() {
            return {
                fields: [
                    {
                        name: 'name',
                        title: 'Name',
                        width: '30%',
                    },
                    {
                        name: 'route',
                        title: 'Route',
                        width: '30%',
                    },
                    {
                        name: 'street_number',
                        title: 'Nr',
                        width: '5%',
                    },
                    {
                        name: 'locality',
                        title: 'City',
                        width: '20%',
                    },
                    {
                        name: 'postal_code',
                        title: 'ZIP',
                        width: '5%',
                    },
                    {
                        name: 'country',
                        title: 'Country',
                        width: '10%',
                    },
                    {
                        name: '__component:location-actions',
                        title: 'Actions',
                        width: '12%'
                    }
                ],
                tableStyle: TableStyle,
                selectedproject: {},
                projectId: '',
                url: 'https://da-production.herokuapp.com/'
            }
        },
        methods: {
            onRowClicked(e) {
                this.$root.$emit('changeCenter', e.marker)
            }
        },
        computed: {
            ...mapGetters(["getProjectByID"]),
        },
        mounted() {
            this.$root.$on('reloadLocationTable', () => {
                //this.reloadData();
                this.$refs.locationTableRef.reload();
            });

            this.projectId = sessionStorage.getItem('sessionProjectID');
            this.selectedproject = this.getProjectByID(this.projectId);

            this.url = "https://da-production.herokuapp.com/projects/" + this.projectId + "/locations"
        }
    }
</script>

<style scoped>

</style>