<template>
    <div id="shotlist">

        <!-- Button to add a new shotlisttab-->
        <button type="button" @click="addNewTab()" id="addListTabButton">
            <font-awesome-icon :icon="['fas', 'plus-square']"/>
            Add New Shotlist
        </button>

        <!-- All tabs -->
        <b-tabs content-class="mt-3">

            <!-- ONE SHOTLIST TAB -->
            <b-tab active v-for="(shotlistTab, index) in shotlistTabs" v-bind:key="index">
                <template v-slot:title>

                    <b-container>
                        <b-row>

                            <!-- SHOTLIST NAME-->
                            <b-col cols="12" md="auto">
                                <!-- todo:  space in textfield-->
                                <div>
                                    <!-- Input file -->
                                    <b-input
                                            v-if="shotlistTab.edit"
                                            v-model="shotlistTab.listName"
                                            :state="shotlistTab.listName.length >= 4"
                                            placeholder="Enter at least 4 characters"
                                            v-focus
                                    ></b-input>
                                    <!-- @blur="shotlistTab.edit = false; $emit('update')"
                                            @keyup.enter="shotlistTab.edit=false; $emit('update')"-->
                                    <!-- Normal view-->
                                    <div v-else>
                                        <label> {{shotlistTab.listName}} </label>
                                    </div>
                                </div>
                            </b-col>

                            <!-- Edit & Save Button-->
                            <b-col>
                                <!-- Save Button -->
                                <div v-show="shotlistTab.edit">
                                    <b-button
                                            @click="saveNameChange(shotlistTabs, shotlistTab)"
                                            variant="outline-dark"
                                    >
                                        <font-awesome-icon :icon="['fas', 'check']"/>
                                    </b-button>
                                </div>
                                <!-- Edit Button -->
                                <div v-show="!shotlistTab.edit">
                                    <b-button
                                            @click="shotlistTab.edit = true;"
                                            variant="outline-dark"
                                    >
                                        <font-awesome-icon :icon="['fas', 'pen']"/>
                                    </b-button>
                                </div>
                            </b-col>

                            <!-- Dropdown Settings -->
                            <b-col>
                                <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                                    <template v-slot:button-content>
                                        <font-awesome-icon :icon="['fas', 'cog']"/>
                                    </template>

                                    <!-- Delete button -->
                                    <b-form>
                                        <b-button @click="$bvModal.show(index.toString())">
                                            <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                                            Delete List
                                        </b-button>

                                        <!-- Delete Dialog-->
                                        <b-modal :id="index.toString()" hide-footer title="Delete this shotlist?">
                                            <b-button variant="outline-danger" block
                                                      @click="deleteTab(index, shotlistTab); $bvModal.hide(index.toString())">
                                                Delete
                                            </b-button>
                                            <b-button variant="outline-warning" block
                                                      @click="$bvModal.hide(index.toString())">
                                                Cancle
                                            </b-button>
                                        </b-modal>
                                    </b-form>

                                    <!-- Columns that will be shown -->
                                    <b-form-checkbox>Frame</b-form-checkbox>
                                    <b-form-checkbox>Shotsize</b-form-checkbox>
                                    <b-form-checkbox>Movement</b-form-checkbox>
                                    <b-form-checkbox>Camera</b-form-checkbox>
                                    <b-form-checkbox>Lens</b-form-checkbox>
                                    <b-form-checkbox>Framerate</b-form-checkbox>
                                    <b-form-checkbox>Special Equipment</b-form-checkbox>
                                    <b-form-checkbox>Location</b-form-checkbox>
                                </b-dropdown>
                            </b-col>
                        </b-row>
                    </b-container>
                </template>

                <!-- Table Content -->
                <!-- todo: here comes the shotlist / component-->
                <div>
                    <SingleShotlist></SingleShotlist>
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    import SingleShotlist from "@/pages/ShotlistStoryboard/SingleShotlist";
    export default {
        name: "ShotlistComp",
        components: {SingleShotlist},
        data() {
            return {
                //Array of all Shotlists
                shotlistTabs: [{
                    listName: 'First Shotlist',
                    edit: false,

                    //todo list inside
                }],
                editedListName: null,
            }
        },
        methods: {
            addNewTab() {
                this.shotlistTabs.push({
                    listName: 'New Shotlist',
                    edit: false
                });
            },

            //Deletes the current Tab
            deleteTab(index, shotlistTab) {
                var idx = this.shotlistTabs.indexOf(shotlistTab);
                // eslint-disable-next-line no-console
                console.log('Tab deleted: ' + index);
                if (idx > -1) {
                    this.shotlistTabs.splice(idx, 1);
                }
            },

            editListName: function (shotlistTab) {
                this.editedListName = shotlistTab
            },

            saveNameChange(shotlistTabs, shotlistTab) {
                var state = false;

                //CHECK IF ID AND NAME FILLED
                if (shotlistTab.listName != null) {

                    if (shotlistTab.listName.length > 0) {

                        // eslint-disable-next-line no-console
                        console.log('change to read_only where NBR: ' + shotlistTab.listName)
                        shotlistTab.edit = false;
                        // eslint-disable-next-line no-console
                        console.log('Edit Mode is now: ' + shotlistTab.edit)


                    } else {
                        state = false;
                        // eslint-disable-next-line no-console
                        console.log('Name not filled - State is false')
                        this.dismissCountDown = this.dismissSecs
                    }
                } else {
                    state = false;
                    // eslint-disable-next-line no-console
                    console.log('Name not filled - State is false 2')
                    this.dismissCountDown = this.dismissSecs
                }

                return state
            },
        },
        directives: {
            focus: {
                inserted(el) {
                    el.focus()
                }
            }
        }
    }
</script>

<style scoped>
    #shotlist {
        margin: 50px;
    }
</style>