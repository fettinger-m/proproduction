<template>
  <!-- TODO Tutorials
  https://travishorn.com/creating-a-photo-gallery-with-vue-css-grid-3e0a3dd25285
  -->

  <div id="moodboard">
    <NavBar
            current-page="moodboard"
    ></NavBar>
    <h2 class="categorytitle">Moodboard</h2>
    <MoodboardComp></MoodboardComp>
    <!-- <InProgress></InProgress> -->
  </div>
</template>

<script>

import NavBar from "../components/Layout/NavBar";
import MoodboardComp from "@/pages/Moodboard/MoodboardComp";
//import InProgress from "@/pages/Moodboard/InProgress";

export default {
  name: 'moodboard',
  components: {
    //InProgress,
    MoodboardComp,
    NavBar,
  },
}
</script>

<style>
</style>
