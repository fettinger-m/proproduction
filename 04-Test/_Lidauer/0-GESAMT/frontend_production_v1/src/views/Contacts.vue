<template>
  <div id="contacts">
    <NavBar current-page="contacts"></NavBar>
    <h2 class="categorytitle">Contacts</h2>
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
  import ContactsTable from "../pages/Contacts/ContactsTable";

  export default {
    name: 'contacts',
    components: {
      ContactsTable,
      NavBar,
    },
  }
</script>

<style>

</style>
