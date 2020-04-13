<template>
    <div>
        <b-container>
            <!-- Add Moodboard Button & Modal -->
            <b-row align-h="end">
                <b-col cols="3">
                    <!-- Add Button-->
                    <b-button
                            type="button"
                            @click="$bvModal.show('boardcreation')"
                            variant="outline-primary"
                            class="float-right"
                    >
                        <font-awesome-icon :icon="['fas', 'plus-square']"/>
                        Add New Moodboard
                    </b-button>

                    <!-- Add Shot Dialog-->
                    <b-modal id="boardcreation" hide-footer >
                        <template v-slot:modal-title>
                            <font-awesome-icon :icon="['fas', 'clipboard-list']"/>
                            Create a new Moodboard
                        </template>
                        <CreateEditMoodboardModal
                                v-bind:moodboards="moodboards"
                        />
                    </b-modal>
                </b-col>
            </b-row>

            <!-- All tabs -->
            <b-tabs content-class="mt-3">

                <!-- ONE SHOTLIST TAB -->
                <b-tab
                        active
                        v-for="(board, index) in moodboards"
                        v-bind:key="index"
                >
                    <template v-slot:title>

                        <b-container>
                            <b-row>

                                <!-- SHOTLIST NAME-->
                                <b-col>
                                    <div>
                                        <!-- Input file -->
                                        <b-input
                                                v-if="board.edit"
                                                v-model="board.boardname"
                                                :state="board.boardname.length >= 4"
                                                placeholder="Enter at least 4 characters"

                                        ></b-input>
                                        <!-- Normal Label-->
                                        <div v-else>
                                            <label class="tabtitle"> {{board.boardname}} </label>
                                        </div>
                                    </div>
                                </b-col>

                                <!-- Edit & Save Button-->
                                <b-col cols="2">
                                    <!-- Save Button -->
                                    <div v-show="board.edit">
                                        <b-button
                                                @click="saveNameChange(moodboards, board)"
                                                variant="outline"
                                                :disabled="board.boardname.length < 4"
                                        >
                                            <font-awesome-icon :icon="['fas', 'check']"/>
                                        </b-button>
                                    </div>
                                    <!-- Edit Button -->
                                    <div v-show="!board.edit">
                                        <b-button
                                                @click="board.edit = true;"
                                                variant="outline"
                                        >
                                            <font-awesome-icon :icon="['fas', 'pen']"/>
                                        </b-button>
                                    </div>
                                </b-col>

                                <!-- Dropdown Settings -->
                                <b-col cols="2">
                                    <b-dropdown variant="outline" toggle-class="text-decoration-none" no-caret>
                                        <template v-slot:button-content>
                                            <font-awesome-icon :icon="['fas', 'cog']"/>
                                        </template>

                                        <!-- Delete button -->
                                        <b-form>
                                            <b-button
                                                    @click="$bvModal.show(index.toString())"
                                                    variant="outline-danger"
                                            >
                                                <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                                                Delete Board
                                            </b-button>

                                            <!-- Delete Dialog-->
                                            <b-modal :id="index.toString()" hide-footer title="Delete this moodboard?">
                                                <b-button variant="outline-danger" block
                                                          @click="deleteTab(index, board); $bvModal.hide(index.toString())">
                                                    Delete
                                                </b-button>
                                                <b-button variant="outline-warning" block
                                                          @click="$bvModal.hide(index.toString())">
                                                    Cancle
                                                </b-button>
                                            </b-modal>
                                        </b-form>

                                    </b-dropdown>
                                </b-col>
                            </b-row>
                        </b-container>
                    </template>

                    <!-- Table Content -->
                    <div>
                        <OneMoodboard/>
                    </div>
                </b-tab>
            </b-tabs>
        </b-container>
    </div>
</template>

<script>
    import CreateEditMoodboardModal from "@/pages/Moodboard/CreateEditMoodboardModal";
    import OneMoodboard from "@/pages/Moodboard/OneMoodboard";
    export default {
        name: "MoodboardComp",
        components: {OneMoodboard, CreateEditMoodboardModal},
        data() {
            return {
                moodboards: [{
                    boardname: 'First Moodboard',
                    edit: false,

                    //ToDo - Array of Pictures

                }]
            }
        },
        methods: {
            //Deletes the current Tab
            deleteTab(index, board) {
                var idx = this.moodboards.indexOf(board);
                // eslint-disable-next-line no-console
                console.log('Tab deleted: ' + index);
                if (idx > -1) {
                    this.moodboards.splice(idx, 1);
                }
            },

            saveNameChange(moodboards, board) {
                //CHECK IF ID AND NAME FILLED
                if (board.boardname != null) {

                    if (board.boardname.length > 0) {

                        // eslint-disable-next-line no-console
                        console.log('change to read_only where NBR: ' + board.boardname)
                        board.edit = false;
                        // eslint-disable-next-line no-console
                        console.log('Edit Mode is now: ' + board.edit)
                    } else {
                        // eslint-disable-next-line no-console
                        console.log('Name not filled - State is false')
                    }
                } else {
                    // eslint-disable-next-line no-console
                    console.log('Name not filled - State is false 2')
                }
            },
        }
    }
</script>

<style scoped>
    .tabtitle {
        color: #FF6852;
        font-size: large;
    }
</style>