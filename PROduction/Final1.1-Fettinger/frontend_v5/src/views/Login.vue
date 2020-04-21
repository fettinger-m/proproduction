<template>
    <div id="login">
        <b-container>
            <b-row align-h="center" class="mt-5">
                <b-col>
                    <span class="display-3 logoOrange">PRO</span><span class="display-3 logoBlack">duction</span>
                </b-col>
            </b-row>
            <b-row class="mt-5">
                <b-col align-self="start" lg="5" md="6" sm="8">
                    <h3 class="font-italic text-left lightVersion">LOGIN</h3>
                    <b-form-group>
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
                                variant="primary"
                                type="submit"
                                @click="onSubmit"
                                :disabled="form.email === '' || form.password === ''"
                        >
                            submit
                        </b-button>

                            <b-button
                                    class="mt-2 float-left"
                                    variant="primary"
                                    type="submit"
                                    @click="onSignUp"
                            >
                                or sign up
                            </b-button>

                    </b-form-group>
                    <b-alert v-model="showAlert" variant="danger">
                        {{errorMsg}}
                    </b-alert>
                </b-col>
                <b-col align-self="start">
                    <h3 class="text-right font-italic lightVersion">CREATE TO <br>INSPIRE</h3>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    import axios from 'axios'
    import background from "../css/background";


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
                status: '',
                showAlert: false,
                errorMsg: ''
            }
        },
        methods: {
            onSubmit() {
                client.post('/login', this.form)
                    .then((response) => {
                        // eslint-disable-next-line no-console
                        console.log(response);
                        if (response.data === 'login successful') {
                            this.unsetBg();
                            this.$router.push('projects')
                        } else {
                            this.errorMsg = response.data;
                            this.showAlert = true;
                        }
                    })
            },
            onSignUp() {
                this.unsetBg();
                this.$router.push('signup');
            },
            setBg() {
                document.body.style.backgroundImage = this.background;
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundRepeat = "no-repeat";
                document.body.style.backgroundAttachment = "fixed";
            },
            unsetBg() {
                document.body.style.backgroundImage = ""
            }

        },
        created() {
            this.setBg()
        },
        computed: {
            background() {
                let start = "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(\"";
                let end = "\")";
                let rand = Math.floor(Math.random() * 6);
                let url = background.backgrounds[rand];

                return start + url + end
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Heebo:900&display=swap');

    .logoBlack {
        color: white;
    }

    .lightVersion {
        color: white;
    }

    .form-control {
        background: transparent !important;
        color: white;
        font-weight: bold;
        border: 2px solid white;
    }

    .form-control::placeholder {
        color: #cccccc;
    }

    .form-control:focus {
        background: transparent !important;
        color: white;
    }
    .alert-danger {
        color: #dddddd;
        background-color: rgba(114, 28, 37, 0.3);
        border: 2px solid #721c24 !important;
    }
     .alert {
         position: relative;
         padding: 0.3rem 1rem;
         margin-bottom: 1rem;
         border: 2px solid;
         border-radius: 0;
         text-align: left;
     }

    .close {
        text-shadow: none !important;
    }


</style>
