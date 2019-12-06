<template>
  <div id="location">
    <NavBar current-page="location"></NavBar>
    <FilePath></FilePath>
    <ProjectNameTitle></ProjectNameTitle>
    <h2>Locations</h2>
  </div>
</template>

<script>

import NavBar from "../components/Layout/NavBar";
import FilePath from "../components/Layout/FilePath";
import ProjectNameTitle from "../components/Layout/ProjectNameTitle";

export default {
  name: 'location',
  components: {
    NavBar,
    FilePath,
    ProjectNameTitle
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
