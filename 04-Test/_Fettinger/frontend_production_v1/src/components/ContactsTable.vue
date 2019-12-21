<template>
    <div>
        <vuetable ref="vuetable"
                  api-url="https://vuetable.ratiw.net/api/users"
                  :fields=fields
                  :css="table"
                  :per-page="5"
                  data-path="data"
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
    import Vue from 'vue'
    import CustomActions from './CustomActions'



    Vue.component('custom-actions', CustomActions);

    export default {
        components: {
            Vuetable
        },
        name: "ContactsTable",
        data() {
            return {
                fields: [
                    {
                        name: '__sequence',   // <----
                        title: '#',
                        titleClass: 'center aligned',
                        dataClass: 'right aligned'
                    },
                    'name', 'email',
                    {
                        name: 'birthdate',
                        titleClass: 'center aligned',
                        dataClass: 'center aligned',
                    },
                    {
                        name: 'nickname',
                        callback: 'caseUp'
                    },
                    {
                        name: 'gender',
                        titleClass: 'center aligned',
                        dataClass: 'center aligned',
                    },
                    {
                        name: 'salary',
                        title: 'gehoit',
                        titleClass: 'center aligned',
                        dataClass: 'right aligned'
                    },
                    {
                        name: '__component:custom-actions',
                        title: 'Actions',
                        titleClass: 'center aligned',
                        dataClass: 'center aligned'
                    }
                ],
                table: {
                    tableWrapper: '',
                    tableHeaderClass: 'mb-0',
                    tableBodyClass: 'mb-0',
                    tableClass: ' table table-sm table-borderless table-striped table-hover',
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
                    wrapperClass: 'pagination float-right',
                    activeClass: 'active',
                    disabledClass: 'disabled',
                    pageClass: 'page-link',
                    linkClass: 'page-link',
                    paginationClass: 'pagination',
                    paginationInfoClass: 'float-left',
                    dropdownClass: 'form-control',
                    icons: {
                        first: 'fas fa-chevron-left',
                        prev: 'fas fa-chevron-left',
                        next: 'fas fa-chevron-right',
                        last: 'fas fa-chevron-right',
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