<template>
    <div>
        <NavBar small-nav></NavBar>

        <div class="card-body">

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
                    v-bind:planning_r="planningr"
                    v-bind:filming_r="filmingr"
                    v-bind:editing_r="editingr"
                    v-bind:preview_r="previewr"
                    v-bind:done_r="doner"
                    v-bind:prioritysshown="prioritysshown"
            />

            <CalendarComp
                    v-bind:events="events"
            />


            <Footer/>

        </div>

    </div>
</template>

<script>
    import ProjectTable from "@/pages/ProjectsCalendar/ProjectTable";
    import NavBar from "../components/Layout/NavBar";
    import CalendarComp from "@/pages/ProjectsCalendar/CalendarComp";
    import Footer from "@/components/Layout/Footer";

    export default {
        name: 'projectcalendar',
        components: {
            Footer,
            ProjectTable,
            NavBar,
            CalendarComp
        },
        data() {
            return {

                //Get From Vuex Store
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
                    url: '',
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
                prioritysshown: '0',


                customFieldName1: 'Custom 1',
                customFieldName2: 'Custom 2',
            }
        }

    }
</script>

<style>

</style>
