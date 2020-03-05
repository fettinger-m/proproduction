<template>
  <div class="projects">
    <h1>Projects</h1>
    <div class="d-flex my-4 justify-content-center">
      <input id="name" v-model="projectData.name" type="text" placeholder="Name">
      <button @click="saveProject" class="btn btn-outline-primary mx-4">Save</button>
      <button @click="clearData" class="btn btn-outline-danger mx-4">Clear</button>
      <button @click="showProjects" class="btn btn-outline-secondary mx-4">Show</button>
    </div>
    <p class="lead">{{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import app from '../App'

const client = axios.create({
  baseURL: 'http://localhost:3000/projects',
  json: true
})

export default {
  name: 'Projects',
  data: function() {
    return {
      projects: [],
      projectData: {
        name: ""
      }
    }
  },
  props: {
    msg: ""
  },
  methods: {
    showProjects() {
    client.get('/')
    .then(response => {
        //console.log(response);
        this.projects = response
    });
    },
    saveProject() {
      client.post('/', {
        name: this.projectData.name,
      }).then(response => {
        this.clearData()
        console.log(response);
      }).catch(e => {
        console.log(e);
      });
    },
    clearData() {
      this.projectData.name = ""
    }
  },
  created() {
    this.showProjects()
  }
}
</script>