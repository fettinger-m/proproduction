<template>
  <div class="projects">
    <h1>Scriptdetails</h1>
    <!--<div class="d-flex my-4 justify-content-center">
      <button @click="showScript" class="btn btn-outline-secondary mx-4">Show</button>
    </div>-->
    <p class="lead">{{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import app from '../App'

const client = axios.create({
  baseURL: 'http://localhost:3000/projects/Project1/scripts',
  json: true
})

export default {
  name: 'Contacts',
  data: function() {
    return {
      scriptDetails: []
    }
  },
  props: {
    msg: ""
  },
  methods: {
    showScript() {
    client.get('/scriptDetails')
    .then(response => {
        //console.log(response);
        console.log('axios')
        this.scriptDetails = response
    });
    }
  },
  created() {
    this.showScript()
  }
}
</script>