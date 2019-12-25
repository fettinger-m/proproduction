<template>
    <div id="shotlist">

        <b-row>
            <b-col>

            </b-col>
            <!-- Button to add a new shotlisttab-->
            <b-col sm="2">
                <b-button
                        type="button"
                        @click="addNewTab()"
                        id="addListTabButton"
                        variant="outline-primary"
                >
                    <font-awesome-icon :icon="['fas', 'plus-square']"/>
                    Add New Shotlist
                </b-button>
            </b-col>
        </b-row>


        <!-- All tabs -->
        <b-tabs content-class="mt-3">

            <!-- ONE SHOTLIST TAB -->
            <b-tab active v-for="(shotlistTab, index) in shotlistTabs" v-bind:key="index">
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
                                        <label> {{shotlistTab.listName}} </label>
                                    </div>
                                </div>
                            </b-col>

                            <!-- Edit & Save Button-->
                            <b-col cols="2">
                                <!-- Save Button -->
                                <div v-show="shotlistTab.edit">
                                    <b-button
                                            @click="saveNameChange(shotlistTabs, shotlistTab)"
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
                                    <b-form-checkbox
                                            v-model="frame_c"
                                    >Frame
                                    </b-form-checkbox>

                                    <b-form-checkbox
                                            v-model="shotsize_c"
                                    >Shotsize
                                    </b-form-checkbox>

                                    <b-form-checkbox
                                            v-model="movement_t"
                                    >Movement
                                    </b-form-checkbox>

                                    <b-form-checkbox
                                            v-model="camera_c"
                                    >Camera
                                    </b-form-checkbox>

                                    <b-form-checkbox
                                            v-model="lens_c"
                                    >Lens
                                    </b-form-checkbox>

                                    <b-form-checkbox
                                            v-model="framerate_r"
                                    >Framerate
                                    </b-form-checkbox>

                                    <b-form-checkbox
                                            v-model="specialEquip_c"
                                    >Special Equipment
                                    </b-form-checkbox>

                                    <b-form-checkbox
                                            v-model="location_c"
                                    >Location
                                    </b-form-checkbox>

                                </b-dropdown>
                            </b-col>

                        </b-row>
                    </b-container>
                </template>

                <!-- Table Content -->
                <div>
                    <SingleShotlist
                            v-bind:shotlist_tab="shotlistTab"
                    />
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    //Index for modal
    //todo: Index für Modal - andere Lösung finden
    let i = 0;

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

                    //IDs for Modals
                    addShot_modal_ID: 'addShotID',    //auto generated

                    shots: [{
                        frame: 'picture',          //picture to upload
                        nbr: 0,             //auto generated number
                        description: 'descr',    //free text
                        shotsize: null,       //options: Ultra Wide; Wide; Medium; CloseUp; Extreme Close Up
                        movement: 'Forward',       //free text
                        camera: 'a7III',         //free text
                        lens: '50mm 1.4',           //free text
                        framerate: '23,976',      //free double nbr
                        specialEquip: 'Gimbal',   //free text
                        location: null,          //only the locations that are on the location page
                    }],

                    //Booleans if the specific column is shown
                    frame_c: true,
                    shotsize_c: true,
                    movement_c: true,
                    camera_c: true,
                    lens_c: true,
                    framerate_c: true,
                    specialEquip_c: true,
                    location_c: true
                }],
            }
        },
        methods: {
            addNewTab() {
                i++;    //increment variable (defined at the top)

                this.shotlistTabs.push({
                    listName: 'New Shotlist',
                    edit: false,

                    addShot_modal_ID: 'addShotID' + i,    //append incremented index

                    shots: [{
                        frame: 'picture',
                        nbr: 0,
                        description: 'Exapmle Shot',
                        shotsize: null,
                        movement: 'Forward',
                        camera: 'a7III',
                        lens: '50mm 1.4',
                        framerate: '23,976',
                        specialEquip: 'Gimbal',
                        location: null
                    }],

                    //Booleans if the specific column is shown
                    frame_c: true,
                    shotsize_c: true,
                    movement_c: true,
                    camera_c: true,
                    lens_c: true,
                    framerate_c: true,
                    specialEquip_c: true,
                    location_c: true
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

            saveNameChange(shotlistTabs, shotlistTab) {
                //CHECK IF ID AND NAME FILLED
                if (shotlistTab.listName != null) {

                    if (shotlistTab.listName.length > 0) {

                        // eslint-disable-next-line no-console
                        console.log('change to read_only where NBR: ' + shotlistTab.listName)
                        shotlistTab.edit = false;
                        // eslint-disable-next-line no-console
                        console.log('Edit Mode is now: ' + shotlistTab.edit)
                    } else {
                        // eslint-disable-next-line no-console
                        console.log('Name not filled - State is false')
                    }
                } else {
                    // eslint-disable-next-line no-console
                    console.log('Name not filled - State is false 2')
                }
            },
        },
        directives: {
            focus: {}
        }
    }
</script>

<style scoped>
    #shotlist {
        margin: px;
    }
</style>