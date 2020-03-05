<template>
  <div class="projects">
    <h1>Scripts</h1>
    <div class="d-flex my-4 justify-content-center">
      <button @click="showScripts" class="btn btn-outline-secondary mx-4">Show</button>
    </div>
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
  name: 'Scripts',
  data: function() {
    return {
      scripts: []
    }
  },
  props: {
    msg: ""
  },
  methods: {
    showScripts() {
    client.get('/')
    .then(response => {
        //console.log(response);
        this.scripts = response
    });
    }
  },
  created() {
    this.showScripts()
  }
}
</script>