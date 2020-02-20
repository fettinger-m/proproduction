<template>
    <div id="project">
        <NavBar
                current-page="project"
        ></NavBar>

        <SingleProjectViewComp
        />
    </div>
</template>

<script>

    import SingleProjectViewComp from "@/pages/SingleProjectView/SingleProjectViewComp";
    import NavBar from "../components/Layout/NavBar";

    export default {
        name: 'project',
        components: {
            NavBar,
            SingleProjectViewComp
        },
    }
</script>

<style>
</style>
