<template>
    <div>

        <div hidden>AddShot Modal ID: {{shotlist_tab.addShot_modal_ID}}</div>

        <!-- Controls -->
        <div>
            <b-row align-h="end">


                <b-col cols="3">
                    <div class="float-right mb-3">

                        <!-- Button Shotlist download-->
                        <b-button
                                @click="downloadShotlist(shotlist_tab.listName)"
                                variant="outline"

                        >
                            <font-awesome-icon :icon="['fas', 'arrow-down']"/>
                        </b-button>

                        <!-- Button "Add New Shot"-->
                        <b-button
                                @click="$bvModal.show(shotlist_tab.addShot_modal_ID)"
                                type="button"
                                variant="outline-primary"
                                class="float-right"
                        >
                            <font-awesome-icon :icon="['fas', 'plus-square']"/>
                            Add New Shot
                        </b-button>

                    </div>

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
                <font-awesome-icon :icon="['fas', 'video']"/>
                Create a new shot
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
                                v-model="shotlist_tab.shots.shotsize"
                                :options="shotsize_options"
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
                                @click.prevent="
                                $bvModal.hide(shotlist_tab.addShot_modal_ID);
                                clearModalInputFields()"
                                type="button"
                        >
                            Cancle
                        </b-button>
                    </b-col>

                    <b-col class="m-1">
                        <!-- Add Shot Button -->
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

        </b-modal>

        <!-- THE TABLE-->
        <b-table
                striped hover
                :fields="shotlist_tab.fields"
                :items="shotlist_tab.shots">

            <template v-slot:cell(actions)>
                Buttons
            </template>

        </b-table>

        <!-- Buttons die neben jeder Zeile stehen sollen -->
        <div>


            <!-- Edit Button -->
            <div>
                <b-button
                        @click="$bvModal.show('todo1')"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'pen']"/>
                </b-button>

                <!-- TODO Extra Component for modal -->
                <!-- Modal to open after click -->
                <b-modal id="todo1" hide-footer title="Make any changes">

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

                        <!-- Buttons -->
                        <b-row>
                            <!-- Button Cancel-->
                            <b-col>
                                <b-button variant="outline-warning" block @click="$bvModal.hide('todo1')">Cancle
                                </b-button>
                            </b-col>
                            <!-- Button Save Changes-->
                            <b-col>
                                <b-button variant="outline-danger" block
                                          @click="editShot(); $bvModal.hide('todo1')">
                                    <font-awesome-icon :icon="['fas', 'check']"/>
                                    Save Changes
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-modal>
            </div>


            <!-- Delete button -->
            <div>
                <b-button
                        @click="$bvModal.show('todo2')"
                        variant="outline"
                >
                    <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                </b-button>

                <!-- Modal to open after click -->
                <b-modal id="todo2" hide-footer title="Delete this shot?">
                    <b-button variant="outline-danger" block
                              @click="deleteShot(); $bvModal.hide('todo2')">Delete
                    </b-button>
                    <b-button variant="outline-warning" block @click="$bvModal.hide('todo2')">Cancle
                    </b-button>
                </b-modal>
            </div>


        </div>


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

            //Download Current Shotlist
            downloadShotlist(listName) {
                // eslint-disable-next-line no-console
                console.log("Download Shotlist: " + listName)
            },

            //ToDo: Edits the selected shot
            editShot() {
            },

            //ToDo: Deletes the selected shot
            deleteShot() {

            }
        }
    }
</script>

<style scoped>

</style>