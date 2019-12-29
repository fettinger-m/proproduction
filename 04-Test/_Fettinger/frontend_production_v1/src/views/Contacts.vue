<template>
    <div id="contacts">
        <NavBar current-page="contacts"></NavBar>
        <FilePath></FilePath>
        <ProjectNameTitle></ProjectNameTitle>
        <h2>Contacts</h2>
        <b-container>
            <b-row class="mb-3" align-h="end">
                <b-col cols="2">
                    <b-button size="sm" class="float-right" variant="primary">Add new contact</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <ContactsTable></ContactsTable>
                </b-col>
            </b-row>
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
