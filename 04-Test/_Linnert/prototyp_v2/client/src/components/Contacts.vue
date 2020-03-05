<template>
  <div class="projects">
    <h1>Contacts</h1>
    <div class="d-flex my-4 justify-content-center">
      <input id="name" v-model="contactData.name" type="text" placeholder="Name">
      <button @click="saveContact" class="btn btn-outline-primary mx-4">Save</button>
      <button @click="clearData" class="btn btn-outline-danger mx-4">Clear</button>
      <button @click="showContacts" class="btn btn-outline-secondary mx-4">Show</button>
    </div>
    <p class="lead">{{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import app from '../App'

const client = axios.create({
  baseURL: 'http://localhost:3000/projects/Project1/contacts',
  json: true
})

export default {
  name: 'Contacts',
  data: function() {
    return {
      contacts: [],
      contactData: {
        name: ""
      }
    }
  },
  props: {
    msg: ""
  },
  methods: {
    showContacts() {
    client.get('/')
    .then(response => {
        //console.log(response);
        this.contacts = response
    });
    },
    saveContact() {
      client.post('/', {
        name: this.contactData.name
      }).then(response => {
        this.clearData()
        console.log(response);
      }).catch(e => {
        console.log(e);
      });
    },
    clearData() {
      this.contactData.name = ""
    }
  },
  created() {
    this.showContacts()
  }
}
</script>