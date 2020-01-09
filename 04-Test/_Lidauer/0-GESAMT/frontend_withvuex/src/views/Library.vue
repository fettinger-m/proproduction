<template>
  <div id="library">
    <NavBar
            current-page="media"
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
