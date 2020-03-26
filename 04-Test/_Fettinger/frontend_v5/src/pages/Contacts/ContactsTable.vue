<template>
    <div>
        <vuetable
                ref="contactsTableRef"
                :api-url=url
                :fields=fields
                :css="tableStyle"
                data-path=""
                pagination-path=""
        ></vuetable>
    </div>
</template>

<script>
    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import Vue from 'vue'
    import ContactActions from "./ContactActions";
    import tableStyle from "../../css/tableStyle";

    //Contact definition directly in the script because ESLint
    Vue.component('contact-actions', ContactActions);

    export default {
        components: {
            'vuetable': Vuetable,
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
                        callback: 'caseUp',
                        width: '14%',
                        dataClass: 'text-left'
                    },
                    {
                        name: 'role',
                        title: 'Role',
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
                        name: '__component:contact-actions',
                        title: 'Actions',
                        width: '12%'
                    }
                ],

                //Custom CSS for the Table
                tableStyle: tableStyle,

                projectId: '',
                url: '',
            }
        },
        methods: {
            //Group in Caps
            caseUp(value) {
                return value.toUpperCase()
            }
        },
        mounted() {
            //Collects the root emits and reloads the table
            this.$root.$on('reloadContactsTable', () => {
                this.$refs.contactsTableRef.reload();
            });
        },
        created() {
            this.projectId = sessionStorage.getItem('sessionProjectID');
            this.url = "https://da-production.herokuapp.com/projects/" + this.projectId + "/contacts"
        }
    }
</script>

<style scoped>

</style>