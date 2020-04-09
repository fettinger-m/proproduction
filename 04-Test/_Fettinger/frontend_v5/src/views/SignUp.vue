<template>
    <div id="signup">
        <!--<NavBar small-nav=true></NavBar>-->

        <b-container>
            <b-row align-h="center" class="mt-5">
                <b-col>
                    <span class="display-3 logoOrange">PRO</span><span class="display-3 logoBlack">duction</span>
                </b-col>
            </b-row>
            <b-row class="mt-5">
                <b-col align-self="start" lg="5" md="6" sm="8">
                    <h3 class="font-italic text-left">SIGNUP</h3>
                    <b-form-group>
                        <b-form-input
                                class="mt-2"
                                type="text"
                                placeholder="first name"
                                v-model="form.first_name">
                        </b-form-input>
                        <b-form-input
                                class="mt-2"
                                type="text"
                                placeholder="last name"
                                v-model="form.last_name">
                        </b-form-input>
                        <b-form-input
                                class="mt-2"
                                type="email"
                                placeholder="email"
                                v-model="form.email">
                        </b-form-input>
                        <b-form-input
                                class="mt-2"
                                type="password"
                                placeholder="password"
                                v-model="form.password">
                        </b-form-input>

                        <b-button
                                class="mt-2 mr-1 float-left"
                                variant="outline-primary"
                                type="submit"
                                @click="register">
                            submit
                        </b-button>
                        <router-link :to="{name: 'login'}">
                            <b-button
                                    class="mt-2 float-left"
                                    variant="outline-primary">
                                or log in
                            </b-button>
                        </router-link>
                    </b-form-group>
                    <b-alert v-model="showAlert" variant="danger" dismissible>
                        {{errorMsg}}
                    </b-alert>
                </b-col>
                <b-col align-self="start">
                    <h3 class="text-right font-italic">CREATE TO <br>INSPIRE</h3>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>

    import axios from 'axios'

    const client = axios.create({
        baseURL: 'https://da-production.herokuapp.com/',
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
                },
                errorMsg: '',
                showAlert: false
            }
        },
        methods: {
            register() {
                client.post('/register', this.form)
                    .then((response) => {
                        if (response.data === 'login successful') {
                            this.$router.push('login')
                        } else {
                            this.errorMsg = response.data;
                            this.showAlert = true;
                        }
                    });
            }
        }
    }
</script>

<style scoped>
</style>
