<template>
    <div id="shotlist">
        <b-container>
            <!-- Add Shotlist Button & Modal -->
            <b-row align-h="end">
                <b-col cols="3">
                    <!-- Add Button-->
                    <b-button
                            type="button"
                            @click="$bvModal.show('listcreation')"
                            variant="outline-primary"
                            class="float-right"
                    >
                        <font-awesome-icon :icon="['fas', 'plus-square']"/>
                        Add New Shotlist
                    </b-button>

                    <!-- Add Shot Dialog-->
                    <b-modal id="listcreation" hide-footer>
                        <template v-slot:modal-title>
                            <font-awesome-icon :icon="['fas', 'clipboard-list']"/>
                            Create a new shotlist
                        </template>
                        <CreateShotListModal
                                v-bind:shotlist-tabs="getshotlistTabs"
                        />
                    </b-modal>
                </b-col>
            </b-row>

            <b-row v-if="getshotlistTabs==null">
                <b-col>
                    <b-card>
                        You don't have any shotlists yet.
                    </b-card>
                </b-col>
            </b-row>
            <!-- All tabs -->
            <b-tabs content-class="mt-3">

                <!-- ONE SHOTLIST TAB -->
                <b-tab
                        active
                        v-for="(shotlistTab, index) in getshotlistTabs"
                        v-bind:key="index"
                >
                    <template v-slot:title>

                        <b-container>
                            <b-row>

                                <!-- SHOTLIST NAME-->
                                <b-col>
                                    <div>
                                        <!-- Input file -->
                                        <b-input
                                                v-if="shotlistTab.edit"
                                                v-model="shotlistTab.listName"
                                                :state="shotlistTab.listName.length >= 4"
                                                placeholder="Enter at least 4 characters"

                                        ></b-input>
                                        <!-- Normal Label-->
                                        <div v-else>
                                            <label class="tabtitle"> {{shotlistTab.listName}} </label>
                                        </div>
                                    </div>
                                </b-col>

                                <!-- Edit & Save Button-->
                                <b-col cols="2">
                                    <!-- Save Button -->
                                    <div v-show="shotlistTab.edit">
                                        <b-button
                                                @click="saveNameChange(shotlistTab)"
                                                variant="outline"
                                                :disabled="shotlistTab.listName.length < 4"
                                        >
                                            <font-awesome-icon :icon="['fas', 'check']"/>
                                        </b-button>
                                    </div>
                                    <!-- Edit Button -->
                                    <div v-show="!shotlistTab.edit">
                                        <b-button
                                                @click="shotlistTab.edit = true;"
                                                variant="outline"
                                        >
                                            <font-awesome-icon :icon="['fas', 'pen']"/>
                                        </b-button>
                                    </div>
                                </b-col>

                                <!-- Dropdown Settings -->
                                <b-col cols="2">
                                    <b-dropdown variant="outline" toggle-class="text-decoration-none" no-caret>
                                        <template v-slot:button-content>
                                            <font-awesome-icon :icon="['fas', 'cog']"/>
                                        </template>

                                        <!-- Delete button -->
                                        <b-form>
                                            <b-button
                                                    @click="$bvModal.show(index.toString())"
                                                    variant="outline-danger"
                                            >
                                                <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                                                Delete List
                                            </b-button>

                                            <!-- Delete Dialog-->
                                            <b-modal :id="index.toString()" hide-footer title="Delete this shotlist?">
                                                <b-button variant="outline-danger" block
                                                          @click="deleteTab(shotlistTab); $bvModal.hide(index.toString())">
                                                    Delete
                                                </b-button>
                                                <b-button variant="outline-warning" block
                                                          @click="$bvModal.hide(index.toString())">
                                                    Cancle
                                                </b-button>
                                            </b-modal>
                                        </b-form>

                                    </b-dropdown>
                                </b-col>
                            </b-row>
                        </b-container>
                    </template>

                    <!-- Table Content -->
                    <div>
                        <SingleShotlist
                                v-bind:shotlist_tab="shotlistTab"
                                v-bind:shotlistTabs="getshotlistTabs"
                        />
                    </div>
                </b-tab>
            </b-tabs>
        </b-container>
    </div>
</template>

<script>
    import CreateShotListModal from "@/pages/ShotlistStoryboard/CreateShotListModal";
    import SingleShotlist from "@/pages/ShotlistStoryboard/SingleShotlist";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "ShotlistComp",
        components: {CreateShotListModal, SingleShotlist},
        data() {
            return {
            }
        },
        methods: {
            //VUEX ACTIONS
            ...mapActions(["updateShotlist","deleteShotlist"]),

            //Deletes the current Tab
            deleteTab(shotlist) {
                let payload = {
                    projId: this.id,
                    shotlistId: shotlist.id
                }
                // eslint-disable-next-line no-console
                console.log(payload)
                this.deleteShotlist(payload)
            },

            saveNameChange(shotlist) {
                let payload = {
                    projId: this.id,
                    updShotlist: shotlist
                }

                // eslint-disable-next-line no-console
                console.log(payload)
                this.updateShotlist(payload)

                shotlist.edit = false
            }
        },
        computed: {
            ...mapGetters(["getProjectByID"]),

            id(){
                return sessionStorage.getItem('sessionProjectID');
            },

            getshotlistTabs(){
                return this.getProjectByID(sessionStorage.getItem('sessionProjectID')).shotlists
            }
        },
    }
</script>

<style scoped>
    #shotlist {

    }

    .tabtitle {
        color: #FF6852;
        font-size: large;
    }
</style>