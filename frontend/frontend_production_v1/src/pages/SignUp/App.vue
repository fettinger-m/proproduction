<template>
  <div id="app">
    <NavBar></NavBar>
    <FilePath></FilePath>
    <h2>Sign Up</h2>
  </div>
</template>

<script>

import NavBar from "@/components/Layout/NavBar";
import FilePath from "@/components/Layout/FilePath";

export default {
  name: 'app',
  components: {
    NavBar,
    FilePath
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
