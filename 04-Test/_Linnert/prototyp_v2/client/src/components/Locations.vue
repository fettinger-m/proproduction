<template>
  <div class="projects">
    <h1>Locations</h1>
    <div class="d-flex my-4 justify-content-center">
      <input id="name" v-model="locationData.name" type="text" placeholder="Name">
      <button @click="saveLocation" class="btn btn-outline-primary mx-4">Save</button>
      <button @click="clearData" class="btn btn-outline-danger mx-4">Clear</button>
      <button @click="showLocations" class="btn btn-outline-secondary mx-4">Show</button>
    </div>
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
  name: 'Locations',
  data: function() {
    return {
      locations: [],
      locationData: {
        name: ""
      }
    }
  },
  props: {
    msg: ""
  },
  methods: {
    showLocations() {
    client.get('/')
    .then(response => {
        //console.log(response);
        this.locations = response
    });
    },
    saveLocation() {
      client.post('/', {
        name: this.locationData.name
      }).then(response => {
        this.clearData()
        console.log(response);
      }).catch(e => {
        console.log(e);
      });
    },
    clearData() {
      this.locationData.name = ""
    }
  },
  created() {
    this.showLocations()
  }
}
</script>