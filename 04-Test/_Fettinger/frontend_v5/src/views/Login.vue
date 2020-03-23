<template>
    <div id="login">
        <!--<NavBar small-nav=true></NavBar>-->

        <b-container>
            <b-row align-h="center" class="mt-5">
                <b-col>
                    <h1 class="display-3">PRO PRODUCTION</h1>
                </b-col>
            </b-row>
            <b-row class="mt-5">
                <b-col align-self="start" lg="5" md="6" sm="8">
                    <b-form-group>
                        <b-form-input
                                class="mt-2"
                                type="email"
                                placeholder="Username"
                                v-model="form.email">
                        </b-form-input>
                        <b-form-input
                                class="mt-2"
                                type="password"
                                placeholder="Password"
                                v-model="form.password">
                        </b-form-input>
                        <b-row>
                            <b-col>
                                <!-- Sign In-->
                                <!--<router-link :to="{name: 'projects'}">-->
                                <b-button
                                        class="mt-2 mr-1 float-left"
                                        variant="outline-primary"
                                        type="submit"
                                        @click="onSubmit"
                                        :disabled="form.email == '' || form.password == ''"
                                >
                                    Login
                                </b-button>
                                <!--</router-link>-->

                                <!-- Sign Up -->
                                <router-link :to="{name: 'signup'}">
                                    <b-button
                                            class="mt-2 float-left"
                                            variant="outline-primary"
                                            type="submit"
                                            @click="onSubmit2">
                                        or Sign Up
                                    </b-button>
                                </router-link>
                            </b-col>
                        </b-row>
                    </b-form-group>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    //import NavBar from "../components/Layout/NavBar";
    import axios from 'axios'

    const client = axios.create({
        baseURL: 'https://da-production.herokuapp.com/',
        json: true
    });
    export default {
        name: 'login',
        components: {
            //NavBar
        },
        data() {
            return {
                form: {
                    email: '',
                    password: ''

                },
                status: ''
            }
        },
        methods: {
            onSubmit() {
                client.post('/login', this.form)
                    .then((response) => {
                        /*if (response.data === 'login successful') {
                            this.$router.push('projects')
                        } else*/ if (response.data === 'user not found') {
                            alert(response.data)
                        } else if (response.data === 'wrong password') {
                            alert(response.data)
                        } else if (response.data === 'wrong email address format') {
                            alert(response.data)
                        } else {
                            this.$router.push('projects');
                        }
                    }, (error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });

            },
            onSubmit2() {
                client.post('/logout', this.form)
                    .then((response) => {
                        // eslint-disable-next-line no-console
                        console.log(response);
                    }, (error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Heebo:900&display=swap');

    h1 {
        color: orangered;
        font-weight: bolder;
    }

</style>
