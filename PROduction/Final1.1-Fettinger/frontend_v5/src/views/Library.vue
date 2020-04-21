<template>
  <div id="library">
    <NavBar
            current-page="media"
    ></NavBar>
    <h2 class="categorytitle">Media Library</h2>
    <MediaComp/>
  </div>
</template>

<script>

import NavBar from "../components/Layout/NavBar";
import MediaComp from "../pages/MediaLibrary/MediaComp";

export default {
  name: 'library',
  components: {
    MediaComp,
    NavBar,
  },
}
</script>

<style>

</style>
