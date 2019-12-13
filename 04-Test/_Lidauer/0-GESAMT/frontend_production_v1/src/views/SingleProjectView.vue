<template>
    <div id="project">
        <NavBar
                current-page="project"
                v-bind:project_element="project_element"

        ></NavBar>

        <FilePath></FilePath>


        <ProjectNameTitle
                v-bind:project_element="project_element"
        ></ProjectNameTitle>

        <!--
        <h1>ProjectName (todo)</h1>
        <h2>send props from 'ProjectTable' to 'SingleProjectView'</h2>
        -->

        <SingleProjectViewComp
                v-bind:project_element="project_element"
        />
    </div>
</template>

<script>

    import SingleProjectViewComp from "@/pages/SingleProjectView/SingleProjectViewComp";
    import NavBar from "../components/Layout/NavBar";
    import FilePath from "../components/Layout/FilePath";
    import ProjectNameTitle from "../components/Layout/ProjectNameTitle";

    export default {
        name: 'project',
        components: {
            NavBar,
            FilePath,
            ProjectNameTitle,
            SingleProjectViewComp
        },
        props: {
            project_element: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
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
