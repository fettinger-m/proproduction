<template>
  <div id="contacts">
    <NavBar current-page="contacts"></NavBar>
    <h2 class="categorytitle">Contacts</h2>
    <b-container>
      <b-row class="mb-3" align-h="end">
        <b-col cols="2">
          <b-modal v-model="addContact" title="Add new Contact">
            <AddContact ref="addContactRef"></AddContact>

            <template v-slot:modal-footer="{ cancel, ok }">
              <b-button size="sm" @click="cancel()">
                Cancel
              </b-button>
              <b-button size="sm" @click="resetForm">
                Reset
              </b-button>
              <!-- Button with custom close trigger value -->
              <b-button size="sm" variant="primary" @click="onSubmit()">
                Submit
              </b-button>
            </template>
          </b-modal>
          <b-button size="sm" class="float-right" variant="primary" @click="contactBtnClick">Add new contact</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <ContactsTable ref="tableRef"></ContactsTable>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

  import NavBar from "../components/Layout/NavBar";
  import ContactsTable from "../pages/Contacts/ContactsTable";
  import AddContact from "../pages/Contacts/AddContact";

  export default {
    name: 'contacts',
    components: {
      AddContact,
      ContactsTable,
      NavBar,
    },
    data() {
      return {
        addContact: false
      }
    },
    methods: {
      contactBtnClick() {
        this.addContact = true;
      },
      resetForm: function() {
        this.$refs.addContactRef.onReset();
      },
      onSubmit: function() {
        this.$refs.addContactRef.onSubmit();
        this.addContact = false;
        this.$refs.tableRef.reloadData();
      }
    }
  }
</script>

<style>

</style>
