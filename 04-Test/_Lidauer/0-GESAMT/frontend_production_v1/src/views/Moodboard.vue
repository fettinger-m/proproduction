<template>
  <!-- TODO Tutorials
  https://travishorn.com/creating-a-photo-gallery-with-vue-css-grid-3e0a3dd25285
  -->

  <div id="moodboard">
    <NavBar
            current-page="moodboard"
            v-bind:project_element="project_element"
    ></NavBar>
    <h2>Moodboard</h2>
    <MoodboardComp></MoodboardComp>
  </div>
</template>

<script>

import NavBar from "../components/Layout/NavBar";
import MoodboardComp from "@/pages/Moodboard/MoodboardComp";

export default {
  name: 'moodboard',
  components: {
    MoodboardComp,
    NavBar,
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
</style>
