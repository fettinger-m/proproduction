<template>
    <div id="app">
        <RouterView></RouterView>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "App",
        components:{
        },
        methods: {
            ...mapActions(["fetchProjects", "fetchEvents", "fetchTableview", "fetchUserdetails", "fetchLocations"]),
        },
        created() {
            this.fetchTableview();
            this.fetchProjects();
            this.fetchEvents();
            this.fetchUserdetails();

            //only used for testing
            this.fetchLocations();
        },
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