<template>
    <div id="app">
        <NavBarSimple></NavBarSimple>
        <AnotherDataTable
                v-bind:project_elements="project_elements"
                v-bind:project_status="project_status"
                v-bind:themac="themac"
                v-bind:statusc="statusc"
                v-bind:priorityc="priorityc"
                v-bind:custom1c="custom1c"
                v-bind:custom2c="custom2c"
        />
        <hr>
        <!-- <DataTableTest/> -->
        <Calendar></Calendar>
    </div>
</template>

<script>
    //import DataTableTest from './components/DataTableTest.vue'
    import Calendar from "@/components/Calendar";
    import AnotherDataTable from "@/components/AnotherDataTable";
    import NavBarSimple from "@/components/NavBarSimple";

    export default {
        name: 'app',
        components: {
            NavBarSimple,
            AnotherDataTable,
            Calendar,
            //DataTableTest,
        },
        data() {
            return {
                project_elements: [{
                    project_nbr: '',
                    project_name: '',
                    project_theme: '',
                    project_state:null,
                    customfield1: '',
                    customfield2: '',
                    priority_stars: 0,
                    deletedialog: false,
                    read_only: false,
                    hover: false,
                }],
                project_status: [{
                    text: 'selecte state', value: null
                },
                    'planning','filming','editing','preview', 'done'],

                //booleans if the specific column shows
                themac: true,
                statusc: true,
                priorityc: true,
                custom1c: true,
                custom2c: true,

                //todo: vielleicht andere aufteilung
            }
        }
    }
</script>

<style>

    #app {
        text-align: center;
        color: #2c3e50;
    }
</style>
