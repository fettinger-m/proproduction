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
                        />
                    </b-modal>
                </b-col>
            </b-row>

            <b-card no-body>
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
                                                    @click="doc.edit = false"
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
                                                              @click="deleteDocument(index, doc); $bvModal.hide(index.toString())">
                                                        Delete
                                                    </b-button>
                                                    <b-button variant="outline-warning" block
                                                              @click="$bvModal.hide(index.toString())">
                                                        Cancle
                                                    </b-button>
                                                </b-modal>
                                                <!-- Rename Button -->
                                                <b-button
                                                        variant="outline-secondary"
                                                >
                                                    <font-awesome-icon :icon="['fas', 'pen']"/>
                                                    Rename
                                                </b-button>
                                            </b-form>

                                        </b-dropdown>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </template>

                        <!-- Document Content -->
                        <div>
                            <DocumentEditor/>
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

    export default {
        name: "DocumentComp",
        components: {DocumentEditor, CreateEditDocumentModal},
        data() {
            return {
                docs: [{
                    doc_name: 'My Document',
                    edit: false,
                }]
            }
        },
        methods: {


            //---WONT NEED AFTER VUEX SWITCH

            //Deletes the selected Document
            deleteDocument(index, doc) {
                var idx = this.docs.indexOf(doc);
                // eslint-disable-next-line no-console
                console.log('Document deleted: ' + index);
                if (idx > -1) {
                    this.docs.splice(idx, 1);
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