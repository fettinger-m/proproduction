<template>
  <div class="projects">
    <h1>Locationdetails</h1>
    <!--<div class="d-flex my-4 justify-content-center">
      <button @click="showLocation" class="btn btn-outline-secondary mx-4">Show</button>
    </div>-->
    <p class="lead">{{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import app from '../App'

const client = axios.create({
  baseURL: 'http://localhost:3000/projects/Project1/locations',
  json: true
})

export default {
  name: 'Location',
  data: function() {
    return {
      locationDetails: []
    }
  },
  props: {
    msg: ""
  },
  methods: {
    showLocation() {
    client.get('/locationDetails')
    .then(response => {
        //console.log(response);
        console.log('axios')
        this.locationDetails = response
    });
    }
  },
  created() {
    this.showLocation()
  }
}
</script>