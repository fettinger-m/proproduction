<template>
  <div id="profile">
    <NavBar small-nav></NavBar>
    <h2 class="categorytitle">My Profile</h2>
  </div>
</template>

<script>

import NavBar from "@/components/Layout/NavBar";

export default {
  name: 'profile',
  components: {
    NavBar,
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
