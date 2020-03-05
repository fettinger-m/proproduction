<template>
  <div class="projects">
    <h1>Shotlists</h1>
    <div class="d-flex my-4 justify-content-center">
      <button @click="showShotlists" class="btn btn-outline-secondary mx-4">Show</button>
    </div>
    <p class="lead">{{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import app from '../App'

const client = axios.create({
  baseURL: 'http://localhost:3000/projects/Project1/shotlists',
  json: true
})

export default {
  name: 'Shotlist',
  data: function() {
    return {
      shotlists: []
    }
  },
  props: {
    msg: ""
  },
  methods: {
    showShotlists() {
    client.get('/')
    .then(response => {
        //console.log(response);
        this.shotlists = response
    });
    }
  },
  created() {
    this.showShotlists()
  }
}
</script>