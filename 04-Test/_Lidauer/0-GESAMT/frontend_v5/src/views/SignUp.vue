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
                    placeholder="First Name"
                    v-model="form.first_name">
            </b-form-input>
            <b-form-input
                    class="mt-2"
                    type="text"
                    placeholder="Last Name"
                    v-model="form.last_name">
            </b-form-input>
            <b-form-input
                    class="mt-2"
                    type="email"
                    placeholder="E-Mail"
                    v-model="form.email">
            </b-form-input>
            <b-form-input
                    class="mt-2"
                    type="password"
                    placeholder="Password"
                    v-model="form.password">
            </b-form-input>

            <b-button
                    class="mt-2 mr-1 float-left"
                    variant="outline-primary"
                    type="submit"
                    @click="register">
              Sign Up
            </b-button>
            <router-link :to="{name: 'login'}">
              <b-button
                      class="mt-2 float-left"
                      variant="outline-primary">
                or Log In
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

  import axios from 'axios'

  const client = axios.create({
    baseURL: 'http://localhost:3000',
    json: true
  });

  export default {
    name: 'signup',
    components: {},
    data() {
      return {
        form: {
          first_name: '',
          last_name: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      register() {
        client.post('/register', this.form)
                .then((response) => {
                  /*if (response.data === 'login successful') {
                      this.$router.push('projects')
                  } else*/
                  if (response.data === 'weak password') {
                    alert(response.data)
                  } else if (response.data === 'email already in use') {
                    alert(response.data)
                  } else if (response.data === 'wrong email format') {
                    alert(response.data)
                  } else {
                    this.$router.push('login');
                    //alert(response.data);
                    // eslint-disable-next-line no-console
                    console.log(response.data)
                  }
                }, (error) => {
                  // eslint-disable-next-line no-console
                  console.log(error);
                });
      }
    }
  }
</script>

<style>
</style>
