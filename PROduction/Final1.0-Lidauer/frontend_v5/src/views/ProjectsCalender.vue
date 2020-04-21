<template>
    <div>
        <NavBar small-nav></NavBar>

        <div class="card-body">

            <ProjectTable/>
            <CalendarComp/>
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
    }
</script>

<style>

</style>
