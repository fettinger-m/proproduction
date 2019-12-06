<template>
  <div id="calender">
    <NavBar small-nav></NavBar>
    <b-card>
      <div class="card-body">
        <b-card-title>Project 1</b-card-title>
        <b-card-text>
          Some quick example text to build on the card title
          and make up the bulk of the card's content.
        </b-card-text>
        <router-link :to="{ name: 'project', params: { project: 'Vienna2019' }}">
          <b-button variant="outline-primary"> Project</b-button>
        </router-link>
      </div>
    </b-card>
  </div>
</template>

<script>

import NavBar from "../components/Layout/NavBar";

export default {
  name: 'calender',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
