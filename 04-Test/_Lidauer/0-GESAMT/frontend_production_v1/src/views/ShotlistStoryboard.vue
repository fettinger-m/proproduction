<template>
    <div id="shotlist">
        <NavBar
                current-page="shotlist"
                v-bind:project_element="project_element"
        ></NavBar>
        <FilePath></FilePath>
        <ProjectNameTitle
                v-bind:project_element="project_element"
        ></ProjectNameTitle>
        <h2>Shotlist & Storyboard</h2>
        <b-container>
            <ShotlistComp></ShotlistComp>
        </b-container>
    </div>
</template>

<script>

    import NavBar from "../components/Layout/NavBar";
    import FilePath from "../components/Layout/FilePath";
    import ProjectNameTitle from "../components/Layout/ProjectNameTitle";
    import ShotlistComp from "@/pages/ShotlistStoryboard/ShotlistComp";

    export default {
        name: 'shotlist',
        components: {
            ShotlistComp,
            NavBar,
            FilePath,
            ProjectNameTitle
        },

        props: {
            project_element: {
                type: Object,
                required: true
            }
        },
    }
</script>

<style>

</style>
