<template>
  <div class="login">
    <h1>Login und Registrierung</h1>
    <input id="email" v-model="userData.email" type="text" placeholder="Email"><br>
    <input id="password" v-model="userData.password" type="password" placeholder="Password">
    <div class="d-flex my-4 justify-content-center">
      <button @click="login" class="btn btn-outline-primary mx-4">Login</button>
      <button @click="clearData" class="btn btn-outline-secondary mx-4">Clear</button>
      <button @click="cancel" class="btn btn-outline-danger mx-4">Cancel</button>
    </div>
    <p class="lead">{{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import app from '../App'

const client = axios.create({
  baseURL: 'http://localhost:3000/login',
  json: true
})

export default {
  name: 'Login',
  data: function() {
    return {
      userData: {
        email: '',
        password: ''
      }
    }
  },
  props: {
    msg: ""
  },
  methods: {
    login() {
      client.post('/', {
        email: this.userData.email,
        password: this.userData.password
      }).then(response => {
        this.clearData()
        console.log(response);
        this.$router.push({ name: 'Projects' })
      }).catch(e => {
        console.log(e);
      });
    },
    clearData() {
      this.userData.email = ""
      this.userData.password = ""
    },
    cancel() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>