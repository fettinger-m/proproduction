<template>
    <div>

        <div hidden>AddShot Modal ID: {{shotlist_tab.addShot_modal_ID}}</div>

        <!-- Controls -->
        <div>
            <b-row>
                <!-- Empty Col to align at right-->
                <b-col></b-col>

                <!-- Button "Add New Shot"-->
                <b-col cols="2">
                    <!-- Button "Add New Shot"-->
                    <b-button
                            @click="$bvModal.show(shotlist_tab.addShot_modal_ID)"
                            type="button"
                            variant="outline-primary"
                    >
                        <font-awesome-icon :icon="['fas', 'plus-square']"/>
                        Add New Shot
                    </b-button>
                    <!-- Button Shotlist download-->
                    <b-button
                            @click="downloadShotlist(shotlist_tab.listName)"
                            variant="outline"
                    >
                        <font-awesome-icon :icon="['fas', 'arrow-down']"/>
                    </b-button>
                </b-col>
            </b-row>
        </div>

        <!-- Modal Shot Creation-->
        <!-- TODO: .shots wird nicht angesprochen / falsches Element-->
        <b-modal
                :id="shotlist_tab.addShot_modal_ID"
                hide-footer
        >
            <template v-slot:modal-title>
                <font-awesome-icon :icon="['fas', 'video']"/> Create a new shot
            </template>
            <b-container>

                <b-row>
                    <b-col>
                        <!-- Image Upload -->
                        <div class="m-1">
                            <b-form-file
                                    v-model="shotlist_tab.shots.frame"
                                    :state="Boolean(shotlist_tab.shots.frame)"
                                    accept="image/*"
                                    @change="onFileSelected"
                                    placeholder="Choose a image or drop it here..."
                                    drop-placeholder="Drop image here..."
                            ></b-form-file>
                        </div>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col class="m-1">
                        <!-- Description -->
                        <b-form-input
                                placeholder="shot description"
                                v-model="shotlist_tab.shots.description"
                        ></b-form-input>
                    </b-col>
                </b-row>

                <b-row>

                    <b-col class="m-1">
                        <!-- Shotsize -->
                        <b-form-select
                                :options="shotsize_options"
                                v-model="shotlist_tab.shots.shotsize"
                                required
                        ></b-form-select>
                    </b-col>

                    <b-col class="m-1">
                        <!-- Movement -->
                        <b-form-input
                                placeholder="movement"
                                v-model="shotlist_tab.shots.movement"
                        ></b-form-input>
                    </b-col>

                </b-row>

                <b-row>

                    <b-col class="m-1">
                        <!-- Camera -->
                        <b-form-input
                                placeholder="camera"
                                v-model="shotlist_tab.shots.camera"
                        ></b-form-input>
                    </b-col>

                    <b-col class="m-1">
                        <!-- Lens -->
                        <b-form-input
                                placeholder="lens"
                                v-model="shotlist_tab.shots.lens"
                        ></b-form-input>
                    </b-col>

                </b-row>

                <b-row>

                    <b-col class="m-1">
                        <!-- Framerate -->
                        <b-form-input
                                placeholder="framerate"
                                v-model="shotlist_tab.shots.framerate"
                        ></b-form-input>
                    </b-col>

                    <b-col class="m-1">
                        <!-- Special Equipment -->
                        <b-form-input
                                placeholder="special equipment"
                                v-model="shotlist_tab.shots.specialEquip"
                        ></b-form-input>
                    </b-col>

                </b-row>

                <b-row>
                    <b-col class="m-1">
                        <!-- Location -->
                        <b-form-select
                                placeholder="Location"
                                :options="location_options"
                                v-model="shotlist_tab.shots.location"
                                id="input-4"
                        ></b-form-select>
                    </b-col>

                    <b-col class="m-1">

                    </b-col>

                </b-row>


                <b-row>
                    <b-col class="m-1">
                        <!-- Cancle Button -->
                        <b-button
                                variant="outline-warning"
                                block
                                @click="$bvModal.hide(shotlist_tab.addShot_modal_ID)"
                        >
                            Cancle
                        </b-button>
                    </b-col>

                    <b-col class="m-1">d
                        <!-- Add Shot Button -->
                        <b-button
                                variant="outline-primary"
                                block
                                @click="addNewShot(
                          shotlist_tab.shots.description,
                          shotlist_tab.shots.shotsize,
                          shotlist_tab.shots.movement,
                          shotlist_tab.shots.camera,
                          shotlist_tab.shots.lens,
                          shotlist_tab.shots.framerate,
                          shotlist_tab.shots.specialEquip,
                          shotlist_tab.shots.location
                          );
                          $bvModal.hide(shotlist_tab.addShot_modal_ID)">
                            Add Shot
                        </b-button>
                    </b-col>
                </b-row>


            </b-container>

        </b-modal>

        <!-- TODO:
           *wenn button geklickt - felder leeren
           *Options Text anders darstellen
           -->

        <!-- THE TABLE-->
        <b-table striped hover :items="shotlist_tab.shots"></b-table>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "SingleShotlist",
        components: {},
        data() {
            return {
                selectedFile: null,

                //Options to select
                shotsize_options: [{
                    text: 'shotsize...', value: null
                },
                    'Ultra Wide', 'Wide', 'Medium', 'CloseUp', 'Extreme CloseUp'],

                //Location Select-Option -- todo: only options from "location Section"
                location_options: [{
                    text: 'location...', value: null,
                },
                    'Location1', 'Dolomiten', 'Studio', 'A'],

            }
        },
        props: {
            shotlist_tab: {
                type: Object,
                required: true
            }
        },
        methods: {
            onFileSelected(event) {
                this.selectedFile = event.target.files[0]
            },

            //TODO Upload picture to firebase
            onUpload() {
                const fd = new FormData();
                fd.append('image', this.selectedFile, this.selectedFile.name);
                axios.post("URL", fd)
                    .then(res => {
                        // eslint-disable-next-line no-console
                        console.log(res)
                    })
            },

            //Push new Shot to Table
            addNewShot(descr, shotsize, movement, camera, lens, framerate, specEquip, location) {
                this.shotlist_tab.shots.push({
                    frame: 'picture',
                    nbr: 0,
                    description: descr,
                    shotsize: shotsize,
                    movement: movement,
                    camera: camera,
                    lens: lens,
                    framerate: framerate,
                    specialEquip: specEquip,
                    location: location,
                });
            },

            //Download Current Shotlist
            downloadShotlist(listName) {
                // eslint-disable-next-line no-console
                console.log("Download Shotlist: " + listName)
            }
        }
    }
</script>

<style scoped>

</style>