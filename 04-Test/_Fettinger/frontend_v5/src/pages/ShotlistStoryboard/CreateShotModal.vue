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
                            v-model="shot.image"
                    ></b-form-file>
                </b-col>
            </b-row>
            <b-row>
                <!-- Description -->
                <b-col class="m-1">
                    <b-form-input
                            placeholder="shot description must be filled"
                            v-model="shot.description"
                            :state="shot.description.length >= 1 "
                    ></b-form-input>
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
                <!-- Add Shot Button -->
                <b-col class="m-1">
                    <b-button
                            variant="outline-primary"
                            type="submit"
                            block
                            @click="addNewShot();
                          $bvModal.hide(modalindex); "
                            :disabled="shot.description.length < 1"
                    >
                        Add Shot
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "CreateShotModal",
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
                    location: "",
                },
                //Options to select
                shotsize_options: [{
                    text: 'shotsize...', value: null
                },
                    'Ultra Wide', 'Wide', 'Medium', 'CloseUp', 'Extreme CloseUp'],

            }
        },

        props: {
            shotlist_tab: {
                type: Object,
                required: true
            },
            modalindex: {
                type: String
            },
        },

        methods: {
            //VUEX ACTIONS
            ...mapActions(["addShot", "fetchProjects"]),

            onFileSelected(event) {
                const files = event.target.files
                /*
                let filename = files[0].name
                if(filename.lastIndexOf('.') <= 0) {
                    return alert('Please add a valid file!')
                }
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.shot.imageURL = fileReader.result
                })
                fileReader.readAsDataURL(files[0])
                */
                this.shot.image = files[0]
            },

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

            //Push new Shot to Table
            addNewShot() {
                let payload = {
                    projId: this.id,
                    shotlistId: this.shotlist_tab.id,
                    shot: this.shot
                }
                this.addShot(payload)
            },
        },
        computed: {
            ...mapGetters(["getProjectByID"]),

            locations() {
                return this.getProjectByID(sessionStorage.getItem('sessionProjectID')).locations
            },

            id(){
                return sessionStorage.getItem('sessionProjectID');
            },
        },
    }
</script>

<style scoped>

</style>