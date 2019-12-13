<template>
  <div id="location">
    <NavBar
            current-page="location"
            v-bind:project_element="project_element"
    ></NavBar>
    <FilePath></FilePath>
    <ProjectNameTitle
            v-bind:project_element="project_element"
    ></ProjectNameTitle>
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
  },
  props: {
    project_element: {
      type: Object,
      required: true
    }
  },
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
