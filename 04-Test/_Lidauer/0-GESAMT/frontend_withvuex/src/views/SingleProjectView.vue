<template>
    <div id="project">
        <NavBar
                current-page="project"
                v-bind:project_element="project_element"
        ></NavBar>

        <ProjectNameTitle
                v-bind:project_element="project_element"
        ></ProjectNameTitle>

        <SingleProjectViewComp
                v-bind:project_element="project_element"
        />
    </div>
</template>

<script>

    import SingleProjectViewComp from "@/pages/SingleProjectView/SingleProjectViewComp";
    import NavBar from "../components/Layout/NavBar";
    import ProjectNameTitle from "../components/Layout/ProjectNameTitle";

    export default {
        name: 'project',
        components: {
            NavBar,
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
</style>
