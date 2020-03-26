export default {
    table: {
        tableWrapper: '',
        tableHeaderClass: 'mb-0',
        tableBodyClass: 'mb-0',
        tableClass: ' table table-stripped table-bordered table-hover',
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