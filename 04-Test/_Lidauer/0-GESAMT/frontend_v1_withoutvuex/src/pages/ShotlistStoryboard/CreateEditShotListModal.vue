<template>
    <div>
        <b-container>
            <b-row>
                <b-col class="m-1">
                    <label>Shotlist Name:</label>
                    <b-form-input
                            placeholder="Enter at least 4 characters"
                            v-model="currentlistname"
                            :state="currentlistname.length >= 4"
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
                              @click="addNewTab(currentlistname); $bvModal.hide('listcreation'); currentlistname='';"
                              :disabled="currentlistname.length < 4"
                    >
                        Add shotlist
                    </b-button>
                </b-col>
            </b-row>

        </b-container>
    </div>

</template>

<script>
    //todo: Index für Modal - andere Lösung finden
    let i = 0;

    export default {
        name: "CreateEditShotListModal",
        data() {
            return {
                currentlistname: '',
            }
        },
        props: {
            shotlistTabs: {
                type: Array,
                required: true
            }
        },
        methods: {
            addNewTab(currentlistname) {
                i++;    //increment variable (defined at the top)

                this.shotlistTabs.push({
                    listName: currentlistname,
                    edit: false,

                    addShot_modal_ID: 'addShotID' + i,    //append incremented index

                    fields: [
                        {key: 'frame', label: 'Frame'},
                        {key: 'nbr', label: 'Number'},
                        {key: 'description', label: 'Description'},
                        {key: 'shotsize', label: 'Shotsize'},
                        {key: 'movement', label: 'Movement'},
                        {key: 'camera', label: 'Camera'},
                        {key: 'lens', label: 'Lens'},
                        {key: 'framerate', label: 'Framerate'},
                        {key: 'specialEquip', label: 'Special Equipment'},
                        {key: 'location', label: 'Location'},
                        {key: 'actions', label: ''},
                    ],

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
        }
    }
</script>

<style scoped>

</style>