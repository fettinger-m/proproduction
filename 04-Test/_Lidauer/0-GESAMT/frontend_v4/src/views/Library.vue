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

</style>
