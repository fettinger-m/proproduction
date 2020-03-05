<template>
  <div class="login">
    <h1>Login und Registrierung</h1>
    <input id="vorname" v-model="userDetails.vorname" type="text" placeholder="Vorname"><br>
    <input id="nachname" v-model="userDetails.nachname" type="text" placeholder="Nachname"><br>
    <input id="email" v-model="userData.email" type="text" placeholder="Email"><br>
    <input id="telefonnummer" v-model="userDetails.telefonnummer" type="number" placeholder="Telefonnummer"><br>
    <input id="anschrift" v-model="userDetails.anschrift" type="text" placeholder="Anschrift"><br>
    <input id="plz" v-model="userDetails.plz" type="number" placeholder="Postleitzahl"><br>
    <input id="ort" v-model="userDetails.ort" type="text" placeholder="Ort"><br>
    <input id="password" v-model="userData.password" type="password" placeholder="Password">
    <div class="d-flex my-4 justify-content-center">
      <button @click="register" class="btn btn-outline-primary mx-4">Register</button>
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
  baseURL: 'http://localhost:3000/register',
  json: true
})

export default {
  name: 'Login',
  data: function() {
    return {
      userData: {
        email: '',
        password: ''
      },
      userDetails: {
          vorname: '',
          nachname: '',
          telefonnummer: '',
          anschrift: '',
          plz: '',
          ort: '',
      }
    }
  },
  props: {
    msg: ""
  },
  methods: {
    register() {
      client.post('/', {
        email: this.userData.email,
        password: this.userData.password,

        vorname: this.userDetails.vorname,
        nachname: this.userDetails.nachname,
        telefonnummer: this.userDetails.telefonnummer,
        anschrift: this.userDetails.anschrift,
        plz: this.userDetails.plz,
        ort: this.userDetails.ort,
      })
        this.$router.push({ name: 'Projects' })
    },
    clearData() {
      this.userData.email = ""
      this.userData.password = ""

      this.userDetails.vorname = ""
      this.userDetails.nachname = ""
      this.userDetails.telefonnummer = ""
      this.userDetails.anschrift = ""
      this.userDetails.plz = ""
      this.userDetails.ort = ""
    },
    cancel() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>