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
                                type="text"
                                placeholder="Username">
                        </b-form-input>
                        <b-form-input
                                class="mt-2"
                                type="password"
                                placeholder="Password">
                        </b-form-input>
                        <b-row>
                            <b-col>
                                <!-- Sign In-->
                                <router-link :to="{name: 'projects'}">
                                    <b-button
                                            class="mt-2 float-left"
                                            variant="outline-primary"
                                            type="submit">
                                        Login
                                    </b-button>
                                </router-link>

                                <!-- Sign Up -->
                                <router-link :to="{name: 'signup'}">
                                    <b-button
                                            class="mt-2 float-left"
                                            variant="outline-primary"
                                            type="submit">
                                        Sign Up
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
    export default {
        name: 'login',
        components: {
            //NavBar
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
