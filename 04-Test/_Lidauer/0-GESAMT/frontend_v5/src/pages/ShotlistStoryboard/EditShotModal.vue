<template>
    <div>
        <b-container>
            <b-row>
                <!-- Image Upload -->
                <b-col class="m-1">
                    <b-form-file
                            v-model="shot.frame"
                            accept="image/*"
                            @change="onFileSelected"
                            placeholder="Choose a image or drop it here..."
                            drop-placeholder="Drop image here..."
                    ></b-form-file>
                </b-col>
            </b-row>
            <b-row>
                <!-- Description -->
                <b-col class="m-1">
                    <b-form-input
                            placeholder="shot description must be filled"
                            v-model="shot.description"

                    ></b-form-input>
                    <!-- :state="shot.description.length >= 1 " -->
                </b-col>
            </b-row>
            <b-row>
                <!-- Shotsize -->
                <b-col class="m-1">
                    <b-form-select
                            v-model="shot.shotsize"
                            :options="shotsize_options"
                            required
                    ></b-form-select>
                </b-col>
                <!-- Movement -->
                <b-col class="m-1">
                    <b-form-input
                            placeholder="movement"
                            v-model="shot.movement"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <!-- Camera -->
                <b-col class="m-1">
                    <b-form-input
                            placeholder="camera"
                            v-model="shot.camera"
                    ></b-form-input>
                </b-col>
                <!-- Lens -->
                <b-col class="m-1">
                    <b-form-input
                            placeholder="lens"
                            v-model="shot.lens"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <!-- Framerate -->
                <b-col class="m-1">
                    <b-form-input
                            placeholder="framerate"
                            v-model="shot.framerate"
                    ></b-form-input>
                </b-col>
                <!-- Special Equipment -->
                <b-col class="m-1">
                    <b-form-input
                            placeholder="special equipment"
                            v-model="shot.specialEquip"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <!-- Location -->
                <b-col class="m-1">
                    <b-form-select
                            placeholder="Location"
                            v-model="shot.location"
                    >
                        <!-- TODO: correct location name access-->
                        <div v-for="(location, index) in locations" v-bind:key="index">
                            <b-form-select-option :value="location.name">{{ location.name }}</b-form-select-option>
                        </div>


                    </b-form-select>
                </b-col>
                <!-- Empty Col -->
                <b-col class="m-1">
                </b-col>
            </b-row>
            <b-row>
                <!-- Cancle Button -->
                <b-col class="m-1">
                    <b-button
                            variant="outline-warning"
                            block
                            @click.prevent="
                                $bvModal.hide(modalindex);
                                clearModalInputFields()"
                            type="button"
                    >
                        Cancle
                    </b-button>
                </b-col>
                <!-- Add Shot Button -->
                <b-col class="m-1">
                    <b-button
                            variant="outline-primary"
                            type="submit"
                            block
                            @click="updateShot(shot);
                          $bvModal.hide(modalindex);
                          clearModalInputFields()"

                    >
                        Change
                    </b-button>
                    <!-- :disabled="shot.description.length < 1" -->
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "EditShotModal",
        data() {
            return {

                id: 0,
                selectedproject: [],

                //Local Shot Object
                shot: {
                    id: 0,
                    frame: null,
                    description: "",
                    shotsize: "",
                    movement: "",
                    camera: "",
                    lens: "",
                    framerate: "",
                    specialEquip: "",
                    location: ""
                },

                //Options to select
                shotsize_options: [{
                    text: 'shotsize...', value: null
                },
                    'Ultra Wide', 'Wide', 'Medium', 'CloseUp', 'Extreme CloseUp'],

                //All Locations from the selected project
                locations: [],
            }
        },

        props: {
            currentshotID: {
                type: Number,
                required: true
            },
            modalindex: {
                type: String
            },
            shotlist_tab: {
                type: Object,
                required: true
            }
        },

        methods: {
            onFileSelected(event) {
                this.selectedFile = event.target.files[0]
            },

            // Clears all values in the Input fields
            clearModalInputFields() {
                this.shot.description = "";
                this.shot.shotsize = "";
                this.shot.movement = "";
                this.shot.camera = "";
                this.shot.lens = "";
                this.shot.framerate = "";
                this.shot.specialEquip = "";
                this.shot.location = "";
            },
            updateShot() {

                this.shotlist_tab.shots.splice(this.shot.id, 1);
                // eslint-disable-next-line no-console
                console.log("old Shot deleted")

                this.shotlist_tab.shots.push({
                    id: this.shot.id,
                    frame: this.shot.frame,
                    description: this.shot.description,
                    shotsize: this.shot.shotsize,
                    movement: this.shot.movement,
                    camera: this.shot.camera,
                    lens: this.shot.lens,
                    framerate: this.shot.framerate,
                    specialEquip: this.shot.specialEquip,
                    location: this.shot.location,
                });
                // eslint-disable-next-line no-console
                console.log("shot updated")
            }
        },
        computed: {
            ...mapGetters(["allLocations", "getProjectByID"]),

        },
        mounted() {
            this.id = parseInt(sessionStorage.getItem('sessionProjectID'));
            this.selectedproject = this.getProjectByID(this.id);

            //Get Locations from Location Table
            /*
            this.locations = this.allLocations(this.selectedproject)
            */

            this.shot.id = this.shotlist_tab.shots[this.currentshotID].id;
            this.shot.frame = this.shotlist_tab.shots[this.currentshotID].frame;
            this.shot.description = this.shotlist_tab.shots[this.currentshotID].description;
            this.shot.shotsize = this.shotlist_tab.shots[this.currentshotID].shotsize;
            this.shot.movement = this.shotlist_tab.shots[this.currentshotID].movement;
            this.shot.camera = this.shotlist_tab.shots[this.currentshotID].camera;
            this.shot.lens = this.shotlist_tab.shots[this.currentshotID].lens;
            this.shot.framerate = this.shotlist_tab.shots[this.currentshotID].framerate;
            this.shot.specialEquip = this.shotlist_tab.shots[this.currentshotID].specialEquip;
            this.shot.location = this.shotlist_tab.shots[this.currentshotID].location;
            // eslint-disable-next-line no-console
            console.log("lokale variablen gesetzt")
        },
        created() {


        }
    }
</script>

<style scoped>

</style>