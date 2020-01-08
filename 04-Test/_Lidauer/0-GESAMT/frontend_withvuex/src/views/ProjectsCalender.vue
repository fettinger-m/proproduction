<template>
    <div>
        <NavBar small-nav></NavBar>

        <div class="card-body">

            <ProjectTable
                    v-bind:themac="themac"
                    v-bind:statusc="statusc"
                    v-bind:priorityc="priorityc"
                    v-bind:custom1c="custom1c"
                    v-bind:custom2c="custom2c"
                    v-bind:custom_field_name1="customFieldName1"
                    v-bind:custom_field_name2="customFieldName2"
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

                //GET FROM VUEX STORE - to ProjectTable

                events: [{
                }],


                //booleans if the specific column shows
                themac: true,
                statusc: true,
                priorityc: true,
                custom1c: true,
                custom2c: true,

                customFieldName1: 'Custom 1',
                customFieldName2: 'Custom 2',
            }
        }

    }
</script>

<style>

</style>
