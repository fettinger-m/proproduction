<template>
    <div>
        <b-container>
            <b-row>
                <b-col class="m-1">
                    <label>Shotlist Name:</label>
                    <b-form-input
                            placeholder="Enter at least 4 characters"
                            v-model="shotlist.listName"
                            :state="shotlist.listName.length >= 4"
                    ></b-form-input>
                </b-col>
            </b-row>

            <b-row>
                <b-col class="m-1">
                    <b-button variant="outline-warning" block
                              @click="$bvModal.hide('listcreation')">
                        Cancle
                    </b-button>
                </b-col>
                <b-col class="m-1">
                    <b-button variant="outline-primary" block
                              @click="addNewTab(); $bvModal.hide('listcreation');"
                              :disabled="shotlist.listName.length < 4"
                    >
                        Add shotlist
                    </b-button>
                </b-col>
            </b-row>

        </b-container>
    </div>

</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "CreateEditShotListModal",
        data() {
            return {
                shotlist: {
                    listName: '',
                    edit: false,
                    shots: [{
                    }],
                }
            }
        },
        props: {
            shotlistTabs: {
                type: Array,
                required: true
            },
            projId: {
                required: true
            }
        },
        methods: {
            //VUEX ACTIONS
            ...mapActions(["addShotlist"]),

            addNewTab() {
                let payload = {
                    projId: this.projId,
                    shotlist: this.shotlist
                }
                // eslint-disable-next-line no-console
                console.log(payload)
                this.addShotlist(payload)
            },
        }
    }
</script>

<style scoped>

</style>