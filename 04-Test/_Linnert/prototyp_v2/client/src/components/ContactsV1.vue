<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <input id="vorname" v-model="contactData.vorname" type="text" placeholder="Vorname">
    <input id="nachname" v-model="contactData.nachname" type="text" placeholder="Nachname">
    <input id="kuerzel" v-model="contactData.kuerzel" type="text" placeholder="Kürzel">
    <input id="telefonnummer" v-model="contactData.telefonnummer" type="number" placeholder="Telefonnummer">
    <div class="d-flex my-4 justify-content-center">
      <button @click="saveData" class="btn btn-outline-primary mx-4">Save</button>
      <button @click="showData" class="btn btn-outline-secondary mx-4">Show</button>
      <button @click="clearData" class="btn btn-outline-danger mx-4">Clear</button>
    </div>
    <p class="lead">{{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

const client = axios.create({
  baseURL: 'http://localhost:3000/contacts',
  json: true
})

export default {
  name: 'Contacts',
  data: function() {
    return {
      contactData: {
        vorname: "",
        nachname: "",
        kuerzel: "",
        telefonnummer: ""
      }
    }
  },
  props: {
    msg: ""
  },
  methods: {
    saveData() {
      client.post('/addContacts', {
        vorname: this.contactData.vorname,
        nachname: this.contactData.nachname,
        kuerzel: this.contactData.kuerzel,
        telefonnummer: this.contactData.telefonnummer
      }).then(response => {
        this.clearData()
        console.log(response);
      }).catch(e => {
        console.log(e);
      });
    },
    clearData() {
      this.contactData.vorname = ""
      this.contactData.nachname = ""
      this.contactData.kuerzel = ""
      this.contactData.telefonnummer = ""
    },
    showData() {
      client.get('/showContacts')
        .then(response => {
          console.log(response);
      });
    }
  }
}
</script>

