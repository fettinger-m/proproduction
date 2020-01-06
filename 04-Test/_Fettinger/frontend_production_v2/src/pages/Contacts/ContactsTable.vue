<template>
    <div>
        <vuetable ref="vuetable"
                  api-url="https://vuetable.ratiw.net/api/users"
                  :fields=fields
                  :css="tableStyle.table"
                  :per-page="5"
                  data-path="data"
                  pagination-path=""
                  @vuetable:pagination-data="onPaginationData"
        ></vuetable>
        <vuetable-pagination
                ref="pagination"
                :css="tableStyle.pagination"
                @vuetable-pagination:change-page="onChangePage">
        </vuetable-pagination>
    </div>
</template>

<script>
    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
    import Vue from 'vue'
    import CustomActions from './CustomActions'
    import TableStyle from "../../css/TableStyle";



    Vue.component('custom-actions', CustomActions);

    export default {
        components: {
            Vuetable,
            VuetablePagination
        },
        name: "ContactsTable",
        data() {
            return {
                fields: [
                    {
                        name: 'name',
                        width: '20%',
                        dataClass: 'text-left'
                    },
                    {
                        name: 'group.description',
                        title: 'Group',
                        width: '14%',
                        dataClass: 'text-left'
                    },
                    {
                        name: 'nickname',
                        title: 'Role',
                        callback: 'caseUp',
                        width: '14%',
                        dataClass: 'text-left'
                    },
                    {
                        name: 'email',
                        title: 'E-Mail',
                        width: '20%',
                        dataClass: 'text-left'
                    },
                    {
                        name: 'address.mobile',
                        title: 'Phone',
                        width: '20%',
                        dataClass: 'text-left'
                    },
                    {
                        name: '__component:custom-actions',
                        title: 'Actions',
                        width: '12%'
                    }
                ],
                tableStyle: TableStyle

            }
        },
        methods: {
            caseUp(value) {
                return value.toUpperCase()
            },
            onPaginationData(paginationData) {
                this.$refs.pagination.setPaginationData(paginationData)
            },
            onChangePage(page) {
                this.$refs.vuetable.changePage(page)
            }
        }
    }
</script>

<style scoped>

</style>