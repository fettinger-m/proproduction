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
                                :data="shotlist_tab.shots"
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
                                @click="$bvModal.show('create'+shotlist_tab.id)"
                                type="button"
                                variant="outline-primary"
                                class="float-right"
                        >
                            <font-awesome-icon :icon="['fas', 'plus-square']"/>
                            Add New Shot
                        </b-button>

                        <!-- Modal Shot Creation-->
                        <b-modal
                                :id="'create'+shotlist_tab.id"
                                hide-footer
                        >
                            <template v-slot:modal-title>
                                <font-awesome-icon :icon="['fas', 'video']"/>
                                Create a new shot
                            </template>

                            <CreateShotModal
                                    v-bind:shotlist_tab="shotlist_tab"
                                    v-bind:modalindex="'create'+shotlist_tab.id"
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
                :items="shotlist_tab.shots"
        >
            <template v-slot:cell(frame)="data">
                <!-- Wenn Element leer - icon anzeigen - ansonsten Bild -->
                <div v-if="data.value == null || data.value === ''">
                    <font-awesome-icon class="icon" :icon="['fas', 'image']"/>
                </div>
                <div v-else>
                    <img :src="require(`@/assets/${data.item.frame}`)" :height="imgsize" :alt="data.item.frame"/>
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
                                @click="$bvModal.show('edit'+data.item.id+shotlist_tab.id)"
                                variant="outline"
                        >
                            <font-awesome-icon :icon="['fas', 'pen']"/>
                        </b-button>
                        <b-modal :id="'edit'+data.item.id+shotlist_tab.id" hide-footer title="Make any changes">
                            <EditShotModal
                                    v-bind:currentshotID="data.item.id"
                                    v-bind:modalindex="'edit'+data.item.id+shotlist_tab.id"
                                    v-bind:shotlist_tab="shotlist_tab"
                            />
                        </b-modal>

                        <!-- Delete button -->
                        <b-button
                                @click="$bvModal.show('delete'+data.item.id+shotlist_tab.id)"
                                variant="outline"
                        >
                            <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                        </b-button>
                        <!-- Modal to open after click -->
                        <b-modal :id="'delete'+data.item.id+shotlist_tab.id" hide-footer title="Delete this shot?">
                            <b-button variant="outline-danger" block
                                      @click="deleteShot(data.item.id); $bvModal.hide('delete'+data.item.id+shotlist_tab.id)">
                                Delete
                            </b-button>
                            <b-button variant="outline-warning" block
                                      @click="$bvModal.hide('delete'+data.item.id+shotlist_tab.id)">Cancle
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

    /*
    const createSortable = (el, options) => {
        return Sortable.create(el, {
            ...options
        });
    };

    const sortable = {
        name: 'sortable',
        bind(el, binding, vnode) {
            const table = el;
            table._sortable = createSortable(table.querySelector("tbody"), binding.value, vnode);
        }
    };

     */

    export default {
        name: "SingleShotlist",
        components: {EditShotModal, CreateShotModal, downloadexcel},
        //directives: { sortable },
        data() {
            return {

                imgsize: 70,

                imgsizeoptions: [
                    {value: '50', text: 'small'},
                    {value: '70', text: 'medium'},
                    {value: '90', text: 'big'},
                    {value: '120', text: 'extra big'},
                ],

                fields: [
                    {key: 'frame', label: 'Frame', sortable: false, visible: true, changeable: true},
                    {key: 'id', label: 'Number', sortable: true, visible: true, changeable: false},
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

                /*
                sortableOptions: {
                    chosenClass: 'is-selected'
                },
                 */
            }
        },
        computed: {
            visibleFields() {
                return this.fields.filter(field => field.visible)
            }
        },
        props: {
            shotlist_tab: {
                type: Object
            },
            shotlistTabs: {
                type: Array
            }
        },
        methods: {
            deleteShot(index) {
                //ID of the shotlist
                let id = this.shotlist_tab.id;
                // eslint-disable-next-line no-console
                console.log(this.shotlistTabs[id]);

                if (index > -1) {
                    this.shotlistTabs[id].shots.splice(index, 1);
                }
            },

            getImgUrl(pic) {
                let image = '../../assets/' + pic;
                return image;
            }
        }
    }
</script>

<style scoped>
    .icon {
        font-size: 35px;
    }

</style>