<template>
    <div id="app">
        <NavBarSimple></NavBarSimple>
        <AnotherDataTable
                v-bind:project_elements="project_elements"
                v-bind:edit_mode="edit_mode"
                v-bind:project_status="project_status"
                v-bind:themac="themac"
                v-bind:statusc="statusc"
                v-bind:priorityc="priorityc"
                v-bind:custom1c="custom1c"
                v-bind:custom2c="custom2c"
        />
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
                    project_nbr: 0,
                    project_name: '',
                    project_theme: '',
                    project_state:null,
                    customfield1: '',
                    customfield2: '',
                }],
                project_status: [{
                    text: 'selecte state', value: null
                },
                    'planning','filming','editing','preview', 'done'],
                edit_mode: false,
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
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
