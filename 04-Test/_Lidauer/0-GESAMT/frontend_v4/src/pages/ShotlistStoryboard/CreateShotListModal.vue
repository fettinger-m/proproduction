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
    //todo: Index für Modal
    let i = 1;

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

            //TODO Wont need after vuex switch

            addNewTab(currentlistname) {
                i++;    //increment variable (defined at the top)

                this.shotlistTabs.push({
                    id: i,
                    listName: currentlistname,
                    edit: false,
                    shots: [{
                        id: 1,
                        frame: 'testbildwide.jpg',
                        description: 'Exapmle Shot',
                        shotsize: null,
                        movement: 'Forward',
                        camera: 'a7III',
                        lens: '50mm 1.4',
                        framerate: '23,976',
                        specialEquip: 'Gimbal',
                        location: null
                    }],

                });
            },
        }
    }
</script>

<style scoped>

</style>