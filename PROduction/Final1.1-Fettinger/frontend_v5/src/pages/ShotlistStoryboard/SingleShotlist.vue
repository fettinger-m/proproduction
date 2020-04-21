<template>
    <div>
        <!-- Controls -->
        <div>
            <b-row align-h="end">
                <b-col cols="4">
                    <div class="float-right mb-3">

                        <!-- Shotlist download to Excel -->
                        <downloadexcel
                                class="btn btn-default"
                                :data="shots"
                                :fields="excel_fields"
                                worksheet="My Shotlist"
                                name="shotlist.xls">

                            <b-button variant="outline">
                                Export to Excel
                                <font-awesome-icon :icon="['fas', 'arrow-down']"/>
                            </b-button>

                        </downloadexcel>

                        <!-- Button "Add New Shot"-->
                        <b-button
                                @click="$bvModal.show('create'+shotlistId)"
                                type="button"
                                variant="outline-primary"
                                class="float-right"
                        >
                            <font-awesome-icon :icon="['fas', 'plus-square']"/>
                            Add New Shot
                        </b-button>

                        <!-- Modal Shot Creation-->
                        <b-modal
                                :id="'create'+shotlistId"
                                hide-footer
                        >
                            <template v-slot:modal-title>
                                <font-awesome-icon :icon="['fas', 'video']"/>
                                Create a new shot
                            </template>

                            <CreateShotModal
                                    v-bind:shotlist_tab="shotlist_tab"
                                    v-bind:modalindex="'create'+shotlistId"
                            />
                        </b-modal>

                    </div>
                </b-col>
            </b-row>
        </div>

        <b-row>
            <!-- Changing of Img size -->
            <b-col>
                <b-row cols="4">
                    <b-col>Image Size:</b-col>
                    <b-col>
                        <b-form-select
                                v-model="imgsize"
                                :options="imgsizeoptions"
                                size="sm"
                        ></b-form-select>
                    </b-col>
                </b-row>
            </b-col>
            <!-- Selection of culomns shown-->
            <b-col cols="10">
                <b-checkbox
                        v-for="field in fields"
                        :key="field.key"
                        v-model="field.visible"
                        inline
                        v-show="field.changeable"
                >
                    {{ field.label }}
                </b-checkbox>
            </b-col>
        </b-row>

        <!-- THE TABLE-->
        <!-- v-sortable="sortableOptions"-->
        <b-table
                striped hover
                :fields="visibleFields"
                :items="shots"
        >
            <template v-slot:cell(imageURL)="data">
                <!-- Wenn Element leer - icon anzeigen - ansonsten Bild -->
                <div v-if="data.item.downloadlink ===''">
                    <font-awesome-icon class="icon" :icon="['fas', 'image']"/>
                </div>
                <div v-else>
                    <!-- 16:9 Aspect Ratio, Cover -->
                        <img
                                :src="data.item.downloadlink"
                                :alt="data.item.downloadlink"
                                :height="imgsize"
                                :width="(imgsize/9)*16"
                                style="object-fit: cover"
                                class="shotImg"
                        />
                </div>

            </template>

            <!-- Number output -->
            <template v-slot:cell(id)="data">
                <div>
                    {{data.item.id}}
                </div>
            </template>

            <!-- Buttons die neben jeder Zeile stehen sollen -->
            <template v-slot:cell(actions)="data">
                <b-row>
                    <b-col>
                        <!-- Edit Button -->
                        <b-button
                                @click="$bvModal.show('edit'+data.item.id+shotlistId)"
                                variant="outline"
                        >
                            <font-awesome-icon :icon="['fas', 'pen']"/>
                        </b-button>
                        <b-modal :id="'edit'+data.item.id+shotlistId" hide-footer title="Make any changes">
                            <EditShotModal
                                    v-bind:currentshotID="data.item.id"
                                    v-bind:modalindex="'edit'+data.item.id+shotlistId"
                                    v-bind:shotlist_tab="shotlist_tab"
                                    v-bind:proj-id="id"
                            />
                        </b-modal>

                        <!-- Delete button -->
                        <b-button
                                @click="$bvModal.show('delete'+data.item.id+shotlistId)"
                                variant="outline"
                        >
                            <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                        </b-button>
                        <!-- Modal to open after click -->
                        <b-modal :id="'delete'+data.item.id+shotlistId" hide-footer title="Delete this shot?">
                            <b-button variant="outline-danger" block
                                      @click="deleteShotLocal(data.item.id); $bvModal.hide('delete'+data.item.id+shotlistId)">
                                Delete
                            </b-button>
                            <b-button variant="outline-warning" block
                                      @click="$bvModal.hide('delete'+data.item.id+shotlistId)">Cancle
                            </b-button>
                        </b-modal>

                    </b-col>
                </b-row>
            </template>
        </b-table>
    </div>
</template>

<script>

    import CreateShotModal from "@/pages/ShotlistStoryboard/CreateShotModal";
    import EditShotModal from "@/pages/ShotlistStoryboard/EditShotModal";
    import downloadexcel from 'vue-json-excel'
    import {mapGetters, mapActions} from "vuex";


    export default {
        name: "SingleShotlist",
        components: {EditShotModal, CreateShotModal, downloadexcel},
        //directives: { sortable },
        data() {
            return {
                //VUEX ACTIONS
                ...mapActions(["deleteShot"]),

                imgsize: 70,

                imgsizeoptions: [
                    {value: '50', text: 'small'},
                    {value: '70', text: 'medium'},
                    {value: '90', text: 'big'},
                    {value: '120', text: 'extra big'},
                ],

                fields: [
                    {key: 'imageURL', label: 'Frame', sortable: false, visible: true, changeable: true},
                    {key: 'id', label: 'Number', sortable: true, visible: false, changeable: false},
                    {key: 'description', label: 'Description', sortable: true, visible: true, changeable: false},
                    {key: 'shotsize', label: 'Shotsize', visible: true, changeable: true},
                    {key: 'movement', label: 'Movement', visible: true, changeable: true},
                    {key: 'camera', label: 'Camera', sortable: true, visible: true, changeable: true},
                    {key: 'lens', label: 'Lens', sortable: true, visible: true, changeable: true},
                    {key: 'framerate', label: 'Framerate', visible: true, changeable: true},
                    {key: 'specialEquip', label: 'Special Equipment', visible: true, changeable: true},
                    {key: 'location', label: 'Location', sortable: true, visible: true, changeable: true},
                    {key: 'actions', label: '', visible: true, changeable: false},
                ],

                excel_fields: {
                    'Description': 'description',
                    'Shotsize': 'shotsize',
                    'Movement': 'movement',
                    'Camera': 'camera',
                    'Lens': 'lens',
                    'Framerate': 'framerate',
                    'Special Equipment': 'specialEquip',
                    'Location': 'location'
                },

            }
        },
        props: {
            shotlist_tab: {
                type: Object
            },
            shotlistId: {
                required: true
            }
        },
        methods: {
            deleteShotLocal(index) {

                let payload = {
                    projId: this.id,
                    shotlistId: this.shotlistId,
                    shotId: index
                }

                // eslint-disable-next-line no-console
                console.log(payload)

                this.deleteShot(payload)
            },

        },
        computed: {
            ...mapGetters(["getProjectByID"]),
            visibleFields() {
                return this.fields.filter(field => field.visible)
            },
            id() {
                return sessionStorage.getItem('sessionProjectID');
            },
            selectedproject() {
                if (this.getProjectByID(sessionStorage.getItem('sessionProjectID')) == null) {
                    this.fetchProjects();
                    return 0
                } else {
                    return this.getProjectByID(sessionStorage.getItem('sessionProjectID'));
                }
            },
            shots() {
                if (this.getProjectByID(sessionStorage.getItem('sessionProjectID')) == null) {
                    this.fetchProjects();
                    return 0
                } else {
                    // eslint-disable-next-line no-console
                    console.log(this.getProjectByID(sessionStorage.getItem('sessionProjectID')).shotlists.find(shotlist => shotlist.id === this.shotlistId).shots)

                    return this.getProjectByID(sessionStorage.getItem('sessionProjectID')).shotlists.find(shotlist => shotlist.id === this.shotlistId).shots

                }
            }
        },
    }
</script>

<style scoped>
    .icon {
        font-size: 35px;
    }

</style>