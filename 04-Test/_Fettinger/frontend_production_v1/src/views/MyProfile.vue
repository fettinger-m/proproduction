<template>
  <div id="profile">
    <NavBarSimple></NavBarSimple>
    <h2>My Profile</h2>
  </div>
</template>

<script>

import NavBarSimple from "../components/Layout/NavBarSimple";

export default {
  name: 'profile',
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
  text-align: center;
  color: #2c3e50;
}
</style>
