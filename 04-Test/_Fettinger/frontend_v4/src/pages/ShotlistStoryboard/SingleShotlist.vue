<template>
    <div>
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

        <!-- Selection of culomns shown-->
        <div>
            <b-checkbox
                    v-for="field in fields"
                    :key="field.key"
                    v-model="field.visible"
                    inline
                    v-show="field.changeable"
            >
                {{ field.label }}
            </b-checkbox>
        </div>


        <!-- THE TABLE-->
        <b-table
                striped hover
                :fields="visibleFields"
                :items="shotlist_tab.shots"

        >
            <!-- v-sortable="sortableOptions" -->

            <template v-slot:cell(frame)="data">
                <!-- Wenn Element leer - icon anzeigen - ansonsten Bild -->
                <div v-if="data.value == null || data.value === ''">
                    <font-awesome-icon class="icon" :icon="['fas', 'image']"/>
                </div>
                <div v-else>
                    <img :src="getImgUrl(data.item.frame)" :alt="data.item.frame"/>

                </div>

            </template>

            <!-- Number output -->
            <template v-slot:cell(id)="data">
                <div>
                    ID after Vuex Switch
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
                                    v-bind:modalindex="'edit'+data.item.id+shotlist_tab.id"
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
                                      @click="deleteShot(data.item.id); $bvModal.hide('delete'+data.item.id+shotlist_tab.id)">Delete
                            </b-button>
                            <b-button variant="outline-warning" block @click="$bvModal.hide('delete'+data.item.id+shotlist_tab.id)">Cancle
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

    /*
    import Sortable from 'vue-sortable';

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
        components: {EditShotModal, CreateShotModal},
        /*directives: { sortable },*/
        data() {
            return {
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
                type: Object,
                required: true
            },
            shotlistTabs: {
                type: Array,
                required: true
            }
        },
        methods: {
            //Download Current Shotlist
            downloadShotlist(listName) {
                // eslint-disable-next-line no-console
                console.log("Download Shotlist: " + listName)
            },

            deleteShot(index) {
                //ID of the shotlist
                let id = this.shotlist_tab.id;
                // eslint-disable-next-line no-console
                console.log(this.shotlistTabs[id]);

                if(index > -1) {
                    this.shotlistTabs[id].shots.splice(index, 1);
                }
            },

            getImgUrl(pic) {
                let image = '../../assets/'+ pic;
                // eslint-disable-next-line no-console
                console.log(image)
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