<template>
    <div id="calender">
        <NavBar small-nav></NavBar>
        <b-card>
            <div class="card-body">
                <ProjectTable
                        v-bind:project_elements="project_elements"
                        v-bind:project_status="project_status"
                        v-bind:themac="themac"
                        v-bind:statusc="statusc"
                        v-bind:priorityc="priorityc"
                        v-bind:custom1c="custom1c"
                        v-bind:custom2c="custom2c"
                />

                <CalendarComp></CalendarComp>


            </div>
        </b-card>
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
                    hover: false,
                    //todo: maybe amount elements
                }],
                project_status: [{
                    text: 'selecte state', value: null
                },
                    'planning', 'filming', 'editing', 'preview', 'done'],

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
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
