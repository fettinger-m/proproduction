<template>
    <div>
        <b-container>
            <b-row>
                <!-- Image Upload -->
                <b-col class="m-1">
                    <b-form-file
                            type="file"
                            accept="image/*"
                            @change="onFileSelected"
                            placeholder="Choose an image or drop it here..."
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
                        <b-form-select-option
                                v-for="(location, index) in locations"
                                v-bind:key="index"
                                :value="location.name">
                            {{ location.name }}
                        </b-form-select-option>
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
                <!-- Update Shot Button -->
                <b-col class="m-1">
                    <b-button
                            variant="outline-primary"
                            type="submit"
                            block
                            @click="updateThisShot(shot);
                          $bvModal.hide(modalindex);"
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
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "EditShotModal",
        data() {
            return {
                //Local Shot Object
                shot: {
                    imageURL: "",
                    image: null,
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
            },
            projId: {
                required: true
            }
        },

        methods: {
            //VUEX ACTIONS
            ...mapActions(["updateShot"]),

            onFileSelected(event) {
                const files = event.target.files
                this.shot.image = files[0]
            },

            // Clears all values in the Input fields
            clearModalInputFields() {
                this.shot.imageURL = "";
                this.shot.image = null;
                this.shot.description = "";
                this.shot.shotsize = "";
                this.shot.movement = "";
                this.shot.camera = "";
                this.shot.lens = "";
                this.shot.framerate = "";
                this.shot.specialEquip = "";
                this.shot.location = "";
            },

            updateThisShot(newshot) {
                let payload = {
                    projId: this.projId,
                    shotlistId: this.shotlist_tab.id,
                    updShot: newshot
                }
                // eslint-disable-next-line no-console
                console.log(payload)
                this.updateShot(payload)
            },

            setLocalLocations(value) {
                this.locations = Object.assign({}, value)
            },
        },
        computed: {
            ...mapGetters(["allLocations", "getProjectByID"]),
        },
        mounted() {
            this.shot = this.shotlist_tab.shots.find(shot => shot.id === this.currentshotID);
            // eslint-disable-next-line no-console
            console.log("lokale variablen gesetzt")
        },
        watch: {
            allLocations: 'setLocalLocations',
        },
        created() {
            //Get Locations from Location Table
            this.locations = Object.assign([], this.allLocations);

        }
    }
</script>

<style scoped>

</style>