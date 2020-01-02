<template>
    <div id="shotlist">
        <NavBar
                current-page="shotlist"
                v-bind:project_element="project_element"
        ></NavBar>
        <h2>Shotlist & Storyboard</h2>
        <ShotlistComp></ShotlistComp>
    </div>
</template>

<script>

    import NavBar from "../components/Layout/NavBar";
    import ShotlistComp from "@/pages/ShotlistStoryboard/ShotlistComp";

    export default {
        name: 'shotlist',
        components: {
            ShotlistComp,
            NavBar,
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
