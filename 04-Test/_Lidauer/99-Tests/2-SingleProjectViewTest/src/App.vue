<template>
    <div id="app">
        <NavBar></NavBar>
        <SingleProjectView
                v-bind:projectname="projectname"
        />
    </div>
</template>

<script>
    import NavBar from "@/components/NavBar";
    import SingleProjectView from "@/components/SingleProjectView";
    export default {
        name: 'app',
        components: {
            SingleProjectView,
            NavBar

            //DataTableTest,
        },
        data() {
            return {
                projectname: 'TestProject'
            }
        }
    }
</script>

<style>

    #app {
        text-align: center;
        color: #2c3e50;
    }
</style>
