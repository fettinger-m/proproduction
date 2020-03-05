<template>
  <div class="projects">
    <h1>Contactdetails</h1>
    <!--<div class="d-flex my-4 justify-content-center">
      <button @click="showContact" class="btn btn-outline-secondary mx-4">Show</button>
    </div>-->
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
      contactDetails: []
    }
  },
  props: {
    msg: ""
  },
  methods: {
    showContact() {
    client.get('/contactDetails')
    .then(response => {
        //console.log(response);
        console.log('axios')
        this.contactDetails = response
    });
    }
  },
  created() {
    this.showContact()
  }
}
</script>