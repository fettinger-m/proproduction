<template>
    <div>
        <b-container>
            <b-row>
                <!-- Edit Profile section -->
                <b-col>
                    <b-card class="card-body">
                        <b-row class="card-title">
                            <div>Edit profile</div>
                        </b-row>

                        <b-row>
                            <!-- Firstname -->
                            <div class="m-1">
                                <b-col>
                                    <b-row>First Name:</b-row>
                                    <b-row>
                                        <b-input
                                                v-model="userdetails.first_name"
                                        ></b-input>
                                    </b-row>
                                </b-col>
                            </div>
                            <!-- Lastname-->
                            <div class="m-1">
                                <b-col>
                                    <b-row>Last Name:</b-row>
                                    <b-row>
                                        <b-input
                                                v-model="userdetails.last_name"
                                        ></b-input>
                                    </b-row>
                                </b-col>
                            </div>
                        </b-row>
                        <!-- Email -->
                        <div class="m-1">
                            <b-row>E-Mail:</b-row>
                            <b-row>
                                <b-input
                                        v-model="userdetails.email"
                                ></b-input>
                            </b-row>
                        </div>
                        <!-- Save Button-->
                        <div class="m-1">
                            <b-row>
                                <b-button
                                        variant="outline-primary"
                                        @click="updateVuexUserdetails"
                                        :disabled="userdetails.first_name === '' || userdetails.last_name === '' || userdetails.email === ''"
                                >
                                    Save
                                </b-button>
                            </b-row>
                        </div>
                    </b-card>
                </b-col>


                <!-- Change Password section-->
                <b-col>
                    <b-card class="card-body">
                        <b-row class="card-title">
                            <div>Change Password</div>
                        </b-row>

                        <div class="m-1">
                            <b-row>Current Password:</b-row>
                            <b-row>
                                <b-input></b-input>
                            </b-row>
                        </div>

                        <div class="m-1">
                            <b-row>New Password:</b-row>
                            <b-row>
                                <b-input></b-input>
                            </b-row>
                        </div>

                        <div class="m-1">
                            <b-row>Confirm Password:</b-row>
                            <b-row>
                                <b-input></b-input>
                            </b-row>
                        </div>
                        <div class="m-1">
                            <b-row>
                                <b-button variant="outline-primary">Change</b-button>
                            </b-row>
                        </div>
                    </b-card>
                </b-col>

            </b-row>
            <hr>

            <b-row align-h="end">
                <b-col cols="3">
                    <div class="float-right mb-3">
                        <router-link :to="{name: 'login'}">
                            <b-button
                                    class="mt-2 float-left"
                                    variant="outline-primary"
                                    type="submit"
                                    @click="onLogOut">
                                Log Out
                            </b-button>
                        </router-link>
                    </div>
                </b-col>
            </b-row>



        </b-container>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    import axios from 'axios'

    const client = axios.create({
        baseURL: 'https://da-production.herokuapp.com/',
        json: true
    });

    export default {
        name: "UserProfileComp",
        data() {
            return {
                userdetails: {},
            }
        },
        methods: {
            //VUEX ACTIONS
            ...mapActions(["fetchUserdetails", "updateUserdetails"]),

            setLocalUserdetails(value) {
                this.userdetails = Object.assign({}, value)
            },

            updateVuexUserdetails() {
                // eslint-disable-next-line no-console
                console.log("Update Vuex User details");
                this.updateUserdetails(this.userdetails)
            },

            onLogOut() {
                client.post('/logout', this.form)
                    .then((response) => {
                        // eslint-disable-next-line no-console
                        console.log(response);
                    }, (error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });
            }

        },
        computed: {
            ...mapGetters(["allUserdetails"]),
        },
        watch: {
            allUserdetails: 'setLocalUserdetails',
        },
        created() {
            this.fetchUserdetails();
            this.userdetails = Object.assign({}, this.allUserdetails)
        }
    }
</script>

<style scoped>

</style>