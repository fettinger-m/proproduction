<template>
    <div>
        <b-container>
            <b-row>
                <!-- Edit Profile section -->
                <b-col>
                    <b-card class="card-body">
                        <b-row class="card-title" >
                            <div>Edit profile</div>
                        </b-row>

                        <b-row>Username:</b-row>
                        <b-row>
                            <b-input
                                    v-model="userdetails.username"
                            ></b-input>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row>First Name:</b-row>
                                <b-row>
                                    <b-input
                                            v-model="userdetails.firstname"
                                    ></b-input>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row>Last Name:</b-row>
                                <b-row>
                                    <b-input
                                            v-model="userdetails.lastname"
                                    ></b-input>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>E-Mail:</b-row>
                        <b-row>
                            <b-input
                                    v-model="userdetails.email"
                            ></b-input>
                        </b-row>
                        <b-row>
                            <b-button
                                    variant="outline-primary"
                                    @click="updateVuexUserdetails"
                                    :disabled="userdetails.username.toString() === '' || userdetails.firstname.toString() === '' || userdetails.lastname.toString() === '' || userdetails.email.toString() === ''"
                            >
                                Save
                            </b-button>
                        </b-row>
                    </b-card>
                </b-col>


                <!-- Change Password section-->
                <b-col>
                    <b-card class="card-body">
                        <b-row class="card-title">
                            <div>Change Password</div>
                        </b-row>

                        <b-row>Current Password:</b-row>
                        <b-row>
                            <b-input></b-input>
                        </b-row>

                        <b-row>New Password:</b-row>
                        <b-row>
                            <b-input></b-input>
                        </b-row>

                        <b-row>Confirm Password:</b-row>
                        <b-row>
                            <b-input></b-input>
                        </b-row>
                        <b-row>
                            <b-button variant="outline-primary">Change</b-button>
                        </b-row>
                    </b-card>
                </b-col>

            </b-row>
            <hr>

            <b-row align-h="end">
                <b-col cols="3">
                    <div class="float-right mb-3">
                        <b-button variant="outline-primary">Log Out</b-button>
                    </div>
                </b-col>
            </b-row>

        </b-container>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

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

        },
        computed: {
            ...mapGetters(["allUserdetails"]),
        },
        watch: {
            allUserdetails: 'setLocalUserdetails',
        },
        created() {
            this.userdetails = Object.assign({}, this.allUserdetails)
        }
    }
</script>

<style scoped>

</style>