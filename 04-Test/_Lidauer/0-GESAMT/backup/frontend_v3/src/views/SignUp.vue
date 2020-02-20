<template>
  <div id="signup">
    <!--<NavBar small-nav=true></NavBar>-->

    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col>
          <h1 class="display-3">Signup to PROduction</h1>
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col align-self="start" lg="5" md="6" sm="8">
          <b-form-group>
            <b-form-input
                    class="mt-2"
                    type="text"
                    placeholder="Username">
            </b-form-input>
            <b-form-input
                    class="mt-2"
                    type="password"
                    placeholder="Password">
            </b-form-input>
            <router-link :to="{name: 'login'}">
              <b-button
                      class="mt-2 float-left"
                      variant="outline-primary"
                      type="submit">
                Sign Up
              </b-button>
            </router-link>
          </b-form-group>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>


export default {
  name: 'signup',
  components: {
  }
}
</script>

<style>
</style>
