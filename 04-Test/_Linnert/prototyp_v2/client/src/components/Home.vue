<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="d-flex my-4 justify-content-center">
        <router-link to="/login"><button @click="login" class="btn btn-outline-secondary mx-4">Login</button></router-link>
        <router-link to="/register"><button @click="clearData" class="btn btn-outline-secondary mx-4">Register</button></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Hello',
    data () {
      return {
        msg: 'Welcome to Production'
      }
    }
  }
</script>