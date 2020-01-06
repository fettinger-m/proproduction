<template>
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

        <!-- for every document a new row -->
        <b-row v-for="(docuelem, index) in docs" v-bind:key="index" align-h="start">




            <b-col>
                <!-- One Document Card-->
                <b-card class="document">
                    <b-row>
                        <!-- Checkbox -->
                        <b-col cols="1">
                            <b-form-checkbox></b-form-checkbox>
                        </b-col>
                        <!-- Name -->
                        <b-col>
                            <b-button
                                    variant="outline"
                            >
                                {{docuelem.doc_name}}
                            </b-button>
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
                                    <b-modal :id="index.toString()" hide-footer title="Delete this document?">
                                        <b-button variant="outline-danger" block
                                                  @click="deleteDocument(index, docuelem); $bvModal.hide(index.toString())">
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
                </b-card>
            </b-col>



        </b-row>
    </b-container>
</template>

<script>
    import CreateEditDocumentModal from "@/pages/Documents/CreateEditDocumentModal";

    export default {
        name: "DocumentMenu",
        components: {CreateEditDocumentModal},
        data() {
            return {
                docs: [{
                    doc_name: 'My Document',
                }]
            }
        },
        methods: {
            //Deletes the selected Document
            deleteDocument(index, docelem) {
                var idx = this.docs.indexOf(docelem);
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
    .document {
        min-width: 100px;
        max-width: 300px;
    }

</style>