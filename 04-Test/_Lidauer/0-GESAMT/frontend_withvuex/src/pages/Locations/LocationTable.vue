<template>
    <vuetable ref="vuetable"
              :api-mode="false"
              :data="this.locations"
              :fields="fields"
              :css="tableStyle.table"
              @vuetable:row-clicked="onRowClicked"
    >

    </vuetable>

</template>

<script>
    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import TableStyle from "../../css/TableStyle";

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
        methods:{
            onRowClicked(e) {
                // eslint-disable-next-line no-console
                this.$emit('change-center', e)
            }
        }
    }
</script>

<style scoped>

</style>