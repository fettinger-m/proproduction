<template>
    <vuetable ref="locationTableRef"
              api-url="http://localhost:3000/locations"
              data-path=""
              :fields="fields"
              :css="tableStyle.table"
              @vuetable:row-clicked="onRowClicked"
    >
    </vuetable>

</template>

<script>
    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import TableStyle from "../../css/TableStyle";
    import Vue from 'vue'
    import CustomActions from "../Locations/CustomActions";
    Vue.component('custom-actionsL', CustomActions);



    import { mapGetters, mapActions, mapMutations } from "vuex";

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
                        name: '__component:custom-actionsL',
                        title: 'Actions',
                        width: '12%'
                    }
                ],
                tableStyle: TableStyle
            }
        },
        props: {
            locations: {
                type: Object,
                default: null
            }
        },
        methods: {
            ...mapActions(["fetchLocations"]),
            ...mapMutations(['addProjectRow']),
            onRowClicked(e) {
                // eslint-disable-next-line no-console
                this.$emit('change-center', e.marker)
            },
            reloadData: function () {
                this.$refs.contactsTableRef.reload();
                this.$refs.contactsTableRef.reload();
                this.$refs.contactsTableRef.reload();
                this.$refs.contactsTableRef.reload();
                this.$refs.contactsTableRef.reload();
                this.$refs.contactsTableRef.reload();
                this.$refs.contactsTableRef.reload();
                this.$refs.contactsTableRef.reload();
                this.$refs.contactsTableRef.reload();

            },
        },
        computed: {
            ...mapGetters(["allLocations"]),
        },
        created() {
            this.fetchLocations();
        },
    }
</script>

<style scoped>

</style>