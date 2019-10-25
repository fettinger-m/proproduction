<template>
  <div id="app">
    <NavBarSimple></NavBarSimple>

    <!-- Projects Section -->
    <div>
      <div> Projects </div>



    </div>


    <!-- Calendar section -->
    <div>
      <div> Calendar </div>

    </div>

  </div>
</template>

<script>

import NavBarSimple from "@/components/Layout/NavBarSimple";

export default {
  name: 'app',
  components: {
    NavBarSimple
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
