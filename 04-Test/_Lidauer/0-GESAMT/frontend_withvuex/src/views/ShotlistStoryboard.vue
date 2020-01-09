<template>
    <div id="shotlist">
        <NavBar
                current-page="shotlist"
        ></NavBar>
        <h2 class="categorytitle">Shotlist & Storyboard</h2>
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
    }
</script>

<style>

</style>
