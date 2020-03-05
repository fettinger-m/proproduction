<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <input id="kuerzel" v-model="locationData.kuerzel" type="text" placeholder="Kürzel">
    <input id="strasse" v-model="locationData.strasse" type="text" placeholder="Straße">
    <input id="hausnummer" v-model="locationData.hausnummer" type="number" placeholder="Hausnummer">
    <input id="plz" v-model="locationData.plz" type="number" placeholder="Postleitzahl">
    <input id="ort" v-model="locationData.ort" type="text" placeholder="Ort">
    <input id="land" v-model="locationData.land" type="text" placeholder="Land">
    <div class="d-flex my-4 justify-content-center">
      <button @click="saveData" class="btn btn-outline-primary mx-4">Save</button>
      <button @click="showData" class="btn btn-outline-secondary mx-4">Show</button>
      <button @click="clearData" class="btn btn-outline-danger mx-4">Clear</button>
    </div>
    <p class="lead">{{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

const client = axios.create({
  baseURL: 'http://localhost:3000/locations',
  json: true
})

export default {
  name: 'Locations',
  data: function() {
    return {
      locationData: {
        kuerzel: "",
        strasse: "",
        hausnummer: "",
        plz: "",
        ort: "",
        land: ""
      }
    }
  },
  props: {
    msg: ""
  },
  methods: {
    saveData() {
      client.post('/addLocations', {
          kuerzel: this.locationData.kuerzel,
          strasse: this.locationData.strasse,
          hausnummer: this.locationData.hausnummer,
          plz: this.locationData.plz,
          ort: this.locationData.ort,
          land: this.locationData.land
        }).then(response => {
            this.clearData()
              console.log(response);
          }).catch(e => {
              console.log(e);
      });
    },
    clearData() {
      this.locationData.kuerzel = ""
      this.locationData.strasse = ""
      this.locationData.hausnummer = ""
      this.locationData.plz = ""
      this.locationData.ort = ""
      this.locationData.land = ""
    },
    showData() {
      client.get('/showLocations')
        .then(response => {
          console.log(response);
      });
    }
  }
}
</script>