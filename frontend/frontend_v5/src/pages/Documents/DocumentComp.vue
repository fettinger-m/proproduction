<template>
    <div>
        <b-container>
            <!-- Button to add a new Document -->
            <b-row align-h="end">
                <b-col cols="3">
                    <!-- Button -->
                    <b-button
                            type="button"
                            @click="$bvModal.show('doccreation')"
                            variant="outline-primary"
                            class="float-right"
                    >
                        <font-awesome-icon :icon="['fas', 'plus-square']"/>
                        Add New Document
                    </b-button>

                    <!-- Add Shot Dialog-->
                    <b-modal id="doccreation" hide-footer>
                        <template v-slot:modal-title>
                            <font-awesome-icon :icon="['fas', 'file-alt']"/>
                            Create a new document
                        </template>
                        <CreateEditDocumentModal
                                v-bind:docs="docs"
                                v-bind:projId="id"
                        />
                    </b-modal>
                </b-col>
            </b-row>

            <b-row v-if="docs==null">
                <b-col>
                    <b-card>
                        You don't have any documents yet.
                    </b-card>
                </b-col>
            </b-row>
            <b-card v-else no-body>

                <!-- All tabs -->
                <b-tabs
                        content-class="mt-3"
                        pills card vertical
                >

                    <!-- ONE SHOTLIST TAB -->
                    <b-tab
                            active
                            v-for="(doc, index) in docs"
                            v-bind:key="index"
                    >
                        <template v-slot:title>

                            <b-container>
                                <b-row>
                                    <!-- DOCUMENT NAME-->
                                    <b-col>
                                        <div>
                                            <!-- Input file -->
                                            <b-input
                                                    v-if="doc.edit"
                                                    v-model="doc.doc_name"
                                                    :state="doc.doc_name.length >= 4"
                                                    placeholder="Enter at least 4 characters"

                                            ></b-input>
                                            <!-- Normal Label-->
                                            <div v-else>
                                                <label class="tabtitle"> {{doc.doc_name}} </label>
                                            </div>
                                        </div>
                                    </b-col>

                                    <!-- Edit & Save Button-->
                                    <b-col cols="2">
                                        <!-- Save Button -->
                                        <div v-show="doc.edit">
                                            <b-button
                                                    @click="saveNameChange(doc); doc.edit = false"
                                                    variant="outline"
                                                    :disabled="doc.doc_name.length < 4"
                                            >
                                                <font-awesome-icon :icon="['fas', 'check']"/>
                                            </b-button>
                                        </div>
                                        <!-- Edit Button -->
                                        <div v-show="!doc.edit">
                                            <b-button
                                                    @click="doc.edit = true;"
                                                    variant="outline"
                                            >
                                                <font-awesome-icon :icon="['fas', 'pen']"/>
                                            </b-button>
                                        </div>
                                    </b-col>

                                    <!-- Option Dropdown  -->
                                    <b-col cols="2">
                                        <b-dropdown variant="outline" toggle-class="text-decoration-none" no-caret>
                                            <template v-slot:button-content>
                                                <font-awesome-icon :icon="['fas', 'ellipsis-v']"/>
                                            </template>

                                            <b-form>
                                                <!-- Delete button -->
                                                <b-button
                                                        @click="$bvModal.show(index.toString())"
                                                        variant="outline-danger"
                                                >
                                                    <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                                                    Delete
                                                </b-button>
                                                <!-- Delete Dialog-->
                                                <b-modal :id="index.toString()" hide-footer
                                                         title="Delete this document?">
                                                    <b-button variant="outline-danger" block
                                                              @click="deleteDocumentLocal(doc); $bvModal.hide(index.toString())">
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

                        <!-- Document Content -->
                        <div>
                            <DocumentEditor
                                    v-bind:document="doc"
                                    v-bind:proj-id="id"
                            />
                        </div>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-container>
    </div>
</template>

<script>
    import CreateEditDocumentModal from "@/pages/Documents/CreateEditDocumentModal";
    import DocumentEditor from "@/pages/Documents/DocumentEditor";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "DocumentComp",
        components: {DocumentEditor, CreateEditDocumentModal},
        data() {
            return {
                id: "",
                selectedproject: [],
                docs: []
            }
        },
        methods: {
            //VUEX ACTIONS
            ...mapActions(["updateDocument", "deleteDocument"]),

            //Deletes the selected Document
            deleteDocumentLocal(document) {
                let payload = {
                    projId: this.id,
                    docId: document.id
                }
                // eslint-disable-next-line no-console
                console.log(payload)
                this.deleteDocument(payload)
            },

            saveNameChange(document) {
                let payload = {
                    projId: this.id,
                    updDocument: document
                }
                // eslint-disable-next-line no-console
                console.log(payload)
                this.updateDocument(payload)
            }
        },
        computed: {
            ...mapGetters(["getProjectByID"]),
        },
        watch: {},
        mounted() {
            this.id = sessionStorage.getItem('sessionProjectID');
            this.selectedproject = this.getProjectByID(this.id);
            this.docs = this.selectedproject.documents
        },
        created() {

        }
    }
</script>

<style scoped>

    .tabtitle {
        color: #FF6852;
        font-size: large;
    }

</style>