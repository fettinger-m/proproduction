<template>
  <div id="app">
    <NavBarSimpleSimple></NavBarSimpleSimple>
    <h2>Login</h2>

  </div>
</template>

<script>



import NavBarSimpleSimple from "@/components/Layout/NavBarSimpleSimple";
export default {
  name: 'app',
  components: {
    NavBarSimpleSimple


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
