<template>
    <div id="project">
        <NavBar
                current-page="project"
        ></NavBar>

        <ProjectNameTitle
        ></ProjectNameTitle>

        <SingleProjectViewComp
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
        data() {
            return {
            }
        }
    }
</script>

<style>
</style>
