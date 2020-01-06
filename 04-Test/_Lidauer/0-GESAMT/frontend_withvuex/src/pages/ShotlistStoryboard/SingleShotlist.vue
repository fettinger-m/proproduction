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

            <CreateEditShotModal
                    v-bind:shotlist_tab="shotlist_tab"
            />
        </b-modal>

        <!-- THE TABLE-->
        <b-table
                striped hover
                :fields="shotlist_tab.fields"
                :items="shotlist_tab.shots">

            <template v-slot:cell(frame)>

                <font-awesome-icon class="icon" :icon="['fas', 'image']"/>
                <!--
                <img src="../../assets/logo.png" height="50" width="50" alt="frame"/>
                -->
            </template>

            <!-- Buttons die neben jeder Zeile stehen sollen -->
            <template v-slot:cell(actions)>

                <b-row>
                    <!-- Edit Button -->
                    <b-col>
                        <b-button
                                @click="$bvModal.show('todo1')"
                                variant="outline"
                        >
                            <font-awesome-icon :icon="['fas', 'pen']"/>
                        </b-button>

                        <b-modal id="todo1" hide-footer title="Make any changes">
                            <CreateEditShotModal
                                    v-bind:shotlist_tab="shotlist_tab"
                            />
                        </b-modal>


                        <!-- Delete button -->
                        <b-button
                                @click="$bvModal.show(component_index)"
                                variant="outline"
                        >
                            <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                        </b-button>
                        <!-- Modal to open after click -->
                        <b-modal :id="component_index" hide-footer title="Delete this shot?">
                            <b-button variant="outline-danger" block
                                      @click="deleteShot(); $bvModal.hide(component_index)">Delete
                            </b-button>
                            <b-button variant="outline-warning" block @click="$bvModal.hide(component_index)">Cancle
                            </b-button>
                        </b-modal>

                    </b-col>
                </b-row>
            </template>
        </b-table>

    </div>
</template>

<script>

    import CreateEditShotModal from "@/pages/ShotlistStoryboard/CreateEditShotModal";
    export default {
        name: "SingleShotlist",
        components: {CreateEditShotModal},
        data() {
            return {
            }
        },
        props: {
            shotlist_tab: {
                type: Object,
                required: true
            },
            component_index: {
                type: Number,
                required: true
            }
        },
        methods: {
            //Download Current Shotlist
            downloadShotlist(listName) {
                // eslint-disable-next-line no-console
                console.log("Download Shotlist: " + listName)
            },

            //ToDo: Edits the selected shot
            editShot() {
            },

            //ToDo: Deletes the selected shot
            deleteShot(index, shot) {
                var idx = this.shots.indexOf(shot);
                // eslint-disable-next-line no-console
                console.log('Shot deleted: ' + index);
                if (idx > -1) {
                    this.shots.splice(idx, 1);
                }
            },
        }
    }
</script>

<style scoped>
    .icon {
        font-size: 35px;
    }

</style>