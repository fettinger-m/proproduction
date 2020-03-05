<template>
  <div class="projects">
    <h1>Documents</h1>
    <div class="d-flex my-4 justify-content-center">
      <button @click="showDocuments" class="btn btn-outline-secondary mx-4">Show</button>
    </div>
    <p class="lead">{{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import app from '../App'

const client = axios.create({
  baseURL: 'http://localhost:3000/projects/Project1/documents',
  json: true
})

export default {
  name: 'Documents',
  data: function() {
    return {
      documents: []
    }
  },
  props: {
    msg: ""
  },
  methods: {
    showDocuments() {
    client.get('/')
    .then(response => {
        //console.log(response);
        this.documents = response
    });
    }
  }
}
</script>