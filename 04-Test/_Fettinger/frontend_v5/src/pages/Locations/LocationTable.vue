<template>
    <vuetable ref="locationTableRef"
              :api-url=url
              :fields="fields"
              :css="tableStyle"
              data-path=""
              pagination-path=""
              @vuetable:row-clicked="onRowClicked"
    >
    </vuetable>

</template>

<script>
    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import Vue from 'vue'
    import LocationActions from "./LocationActions";

    import tableStyle from "../../css/tableStyle";

    Vue.component('location-actions', LocationActions);

    export default {
        name: "LocationTable",
        components: {
            'vuetable': Vuetable
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
                tableStyle: tableStyle,

                projectId: '',
                url: ''
            }
        },
        methods: {
            onRowClicked(e) {
                this.$root.$emit('changeCenter', e.marker)
            }
        },
        mounted() {
            //Collects the root emits and reloads the table
            this.$root.$on('reloadLocationTable', () => {
                this.$refs.locationTableRef.reload();
                this.$refs.locationTableRef.reload();
                this.$refs.locationTableRef.reload();
                this.$refs.locationTableRef.reload();
                this.$refs.locationTableRef.reload();
                this.$refs.locationTableRef.reload();

            });
        },
        created() {
            this.projectId = sessionStorage.getItem('sessionProjectID');

            this.url = "https://da-production.herokuapp.com/projects/" + this.projectId + "/locations"

            // eslint-disable-next-line no-console
            console.log(this.url)
        }
    }
</script>

<style scoped>

</style>