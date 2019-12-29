<template>
    <div id="calender">
        <NavBar small-nav></NavBar>

        <div class="card-body">

            <!-- TODO:
            * Projekte sortieren
            * Projekte mit gewissem Status / Priorität ausblenden
            * v-show Booleans in computed section setzen
            -->
            <ProjectTable
                    v-bind:project_elements="project_elements"
                    v-bind:project_status="project_status"
                    v-bind:themac="themac"
                    v-bind:statusc="statusc"
                    v-bind:priorityc="priorityc"
                    v-bind:custom1c="custom1c"
                    v-bind:custom2c="custom2c"
                    v-bind:custom_field_name1="customFieldName1"
                    v-bind:custom_field_name2="customFieldName2"
                    v-bind:editing_custom1="editingCustom1"
                    v-bind:editing_custom2="editingCustom2"
                    v-bind:planning_r="planningr"
                    v-bind:filming_r="filmingr"
                    v-bind:editing_r="editingr"
                    v-bind:preview_r="previewr"
                    v-bind:done_r="doner"
                    v-bind:pr0="pr0"
                    v-bind:pr1="pr1"
                    v-bind:pr2="pr2"
                    v-bind:pr3="pr3"
                    v-bind:pr4="pr4"
                    v-bind:pr5="pr5"
            />

            <hr>

            <!-- TODO:
            * ID erstellen
            * erstes ungwolltes Element nicht erstellen
            * ...
            -->
            <CalendarComp
                    v-bind:events="events"
            />


        </div>

    </div>
</template>

<script>
    import ProjectTable from "@/pages/ProjectsCalendar/ProjectTable";
    import NavBar from "../components/Layout/NavBar";
    import CalendarComp from "@/pages/ProjectsCalendar/CalendarComp";

    export default {
        name: 'projectcalendar',
        components: {
            ProjectTable,
            NavBar,
            CalendarComp
        },
        data() {
            return {

                project_elements: [{
                    project_nbr: '',
                    project_name: '',
                    project_theme: '',
                    project_state: null,
                    customfield1: '',
                    customfield2: '',
                    star1: false,
                    star2: false,
                    star3: false,
                    star4: false,
                    star5: false,
                    deletedialog: false,
                    read_only: false,
                    //todo: maybe amount elements
                }],
                project_status: [{
                    text: 'selecte state', value: null
                },
                    'planning', 'filming', 'editing', 'preview', 'done'],

                events: [{
                    id: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    title: '',
                    description: '',
                }],

                //booleans if the specific column shows
                themac: true,
                statusc: true,
                priorityc: true,
                custom1c: true,
                custom2c: true,

                //Values that define if a project is shown
                //Sate
                planningr: true,
                filmingr: true,
                editingr: true,
                previewr: true,
                doner: true,
                //priority
                pr0: true,
                pr1: false,
                pr2: false,
                pr3: false,
                pr4: false,
                pr5: false,


                customFieldName1: 'Custom 1',
                customFieldName2: 'Custom 2',

                editingCustom1: false,
                editingCustom2: false,


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
    }
</style>
