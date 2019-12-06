<template>
  <div id="moodboard">
    <NavBar current-page="moodboard"></NavBar>
    <FilePath></FilePath>
    <ProjectNameTitle></ProjectNameTitle>
  </div>
</template>

<script>

import NavBar from "../components/Layout/NavBar";
import FilePath from "../components/Layout/FilePath";
import ProjectNameTitle from "../components/Layout/ProjectNameTitle";

export default {
  name: 'moodboard',
  components: {
    NavBar,
    FilePath,
    ProjectNameTitle,
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
