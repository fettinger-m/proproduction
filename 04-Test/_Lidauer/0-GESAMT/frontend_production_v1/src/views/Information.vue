<template>
    <div id="information">
        <NavBar></NavBar>
        <h2 class="categorytitle">Information</h2>
    </div>
</template>

<script>

    import NavBar from "../components/Layout/NavBar";

    export default {
        name: 'information',
        components: {
            NavBar,
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
