<template>
    <div id="contacts">
        <NavBar current-page="contacts"></NavBar>
        <FilePath></FilePath>
        <ProjectNameTitle></ProjectNameTitle>
        <h2>Contacts</h2>
        <b-container>
            <ContactsTable></ContactsTable>
        </b-container>
    </div>
</template>

<script>

    import NavBar from "../components/Layout/NavBar";
    import FilePath from "../components/Layout/FilePath";
    import ProjectNameTitle from "../components/Layout/ProjectNameTitle";
    import ContactsTable from "../components/ContactsTable";

    export default {
        name: 'contacts',
        components: {
            ContactsTable,
            NavBar,
            FilePath,
            ProjectNameTitle,
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
