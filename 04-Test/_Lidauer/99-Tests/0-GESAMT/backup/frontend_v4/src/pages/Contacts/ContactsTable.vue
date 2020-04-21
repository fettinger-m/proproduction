<template>
    <div>
        <vuetable ref="vuetable"
                  api-url="http://localhost:3000/contacts"
                  :fields=fields
                  :css="table"
                  :per-page="5"
                  data-path=""
                  pagination-path=""
                  @vuetable:pagination-data="onPaginationData"
        ></vuetable>
        <vuetable-pagination
                ref="pagination"
                :css="pagination"
                @vuetable-pagination:change-page="onChangePage">
        </vuetable-pagination>
    </div>
</template>

<script>
    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
    import Vue from 'vue'
    import CustomActions from "../Contacts/CustomActions";



    Vue.component('custom-actionsC', CustomActions);

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
                        name: 'group',
                        title: 'Group',
                        width: '14%',
                        dataClass: 'text-left'
                    },
                    {
                        name: 'role',
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
                        name: 'phone',
                        title: 'Phone',
                        width: '20%',
                        dataClass: 'text-left'
                    },
                    {
                        name: '__component:custom-actionsC',
                        title: 'Actions',
                        width: '12%'
                    }
                ],
                table: {
                    tableWrapper: '',
                    tableHeaderClass: 'mb-0',
                    tableBodyClass: 'mb-0',
                    tableClass: ' table table-bordered table-striped table-hover',
                    loadingClass: 'loading',
                    ascendingIcon: 'fa fa-chevron-up',
                    descendingIcon: 'fa fa-chevron-down',
                    ascendingClass: 'sorted-asc',
                    descendingClass: 'sorted-desc',
                    sortableIcon: 'fa fa-sort',
                    detailRowClass: 'vuetable-detail-row',
                    handleIcon: 'fa fa-bars text-secondary',
                    /*renderIcon(classes, options) {
                        return `<i class="${classes.join(' ')}"></span>`
                    }*/
                },
                pagination: {
                    wrapperClass: "pagination pull-right",
                    activeClass: "btn-primary",
                    disabledClass: "disabled",
                    pageClass: "page-link",
                    linkClass: "page-link",
                    icons: {
                        first: "",
                        prev: "",
                        next: "",
                        last: ""
                    }
                }
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