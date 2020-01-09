<template>
  <div id="library">
    <NavBar
            current-page="media"
            v-bind:project_element="project_element"
    ></NavBar>
    <h2 class="categorytitle">Media Library</h2>
    <LibraryCompTest/>
  </div>
</template>

<script>

import NavBar from "../components/Layout/NavBar";
import LibraryCompTest from "@/pages/MediaLibrary/LibraryCompTest";

export default {
  name: 'library',
  components: {
    LibraryCompTest,
    NavBar,
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
