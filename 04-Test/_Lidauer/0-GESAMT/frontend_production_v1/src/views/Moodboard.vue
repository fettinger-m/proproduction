<template>
  <!-- TODO Tutorials
  https://travishorn.com/creating-a-photo-gallery-with-vue-css-grid-3e0a3dd25285
  -->

  <div id="moodboard">
    <NavBar
            current-page="moodboard"
            v-bind:project_element="project_element"
    ></NavBar>
    <FilePath></FilePath>
    <ProjectNameTitle
            v-bind:project_element="project_element"
    ></ProjectNameTitle>
    <h2>Moodboard</h2>
    <MoodboardComp></MoodboardComp>
  </div>
</template>

<script>

import NavBar from "../components/Layout/NavBar";
import FilePath from "../components/Layout/FilePath";
import ProjectNameTitle from "../components/Layout/ProjectNameTitle";
import MoodboardComp from "@/pages/Moodboard/MoodboardComp";

export default {
  name: 'moodboard',
  components: {
    MoodboardComp,
    NavBar,
    FilePath,
    ProjectNameTitle,
  },
  props: {
    project_element: {
      type: Object,
      required: false
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
