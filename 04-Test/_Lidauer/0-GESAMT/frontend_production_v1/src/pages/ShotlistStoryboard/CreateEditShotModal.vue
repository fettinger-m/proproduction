<template>
    <div>
        <b-container>
            <b-row>
                <!-- Image Upload -->
                <b-col class="m-1">
                    <b-form-file
                            v-model="shotlist_tab.shots.frame"
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
                            placeholder="shot description"
                            v-model="shotlist_tab.shots.description"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <!-- Shotsize -->
                <b-col class="m-1">
                    <b-form-select
                            v-model="shotlist_tab.shots.shotsize"
                            :options="shotsize_options"
                            required
                    ></b-form-select>
                </b-col>
                <!-- Movement -->
                <b-col class="m-1">
                    <b-form-input
                            placeholder="movement"
                            v-model="shotlist_tab.shots.movement"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <!-- Camera -->
                <b-col class="m-1">

                    <b-form-input
                            placeholder="camera"
                            v-model="shotlist_tab.shots.camera"
                    ></b-form-input>
                </b-col>
                <!-- Lens -->
                <b-col class="m-1">
                    <b-form-input
                            placeholder="lens"
                            v-model="shotlist_tab.shots.lens"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <!-- Framerate -->
                <b-col class="m-1">
                    <b-form-input
                            placeholder="framerate"
                            v-model="shotlist_tab.shots.framerate"
                    ></b-form-input>
                </b-col>
                <!-- Special Equipment -->
                <b-col class="m-1">
                    <b-form-input
                            placeholder="special equipment"
                            v-model="shotlist_tab.shots.specialEquip"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <!-- Location -->
                <b-col class="m-1">
                    <b-form-select
                            placeholder="Location"
                            :options="location_options"
                            v-model="shotlist_tab.shots.location"
                    ></b-form-select>
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
                                $bvModal.hide(shotlist_tab.addShot_modal_ID);
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
                          $bvModal.hide(shotlist_tab.addShot_modal_ID);
                          clearModalInputFields()">
                        Add Shot
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "CreateEditShotModal",
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

            // Clears all values in the Input fields
            clearModalInputFields() {
                this.shotlist_tab.shots.description = "";
                this.shotlist_tab.shots.shotsize = "";
                this.shotlist_tab.shots.movement = "";
                this.shotlist_tab.shots.camera = "";
                this.shotlist_tab.shots.lens = "";
                this.shotlist_tab.shots.framerate = "";
                this.shotlist_tab.shots.specialEquip = "";
                this.shotlist_tab.shots.location = "";
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

        }
    }
</script>

<style scoped>

</style>