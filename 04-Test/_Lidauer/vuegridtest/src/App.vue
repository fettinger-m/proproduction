<template>
  <div id="app">
    <DataTableTest/>
    <Calendar></Calendar>
  </div>
</template>

<script>
import DataTableTest from './components/DataTableTest.vue'
import Calendar from "@/components/Calendar";

export default {
  name: 'app',
  components: {
    Calendar,
    DataTableTest
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
  margin-top: 60px;
}
</style>
