<template>
    <div>
        <b-container>
            <b-row>
                <b-col class="m-1">
                    <label>Document Name:</label>
                    <b-form-input
                            placeholder="Enter at least 4 characters"
                            v-model="document.doc_name"
                            :state="document.doc_name.length >= 4"
                    ></b-form-input>
                </b-col>
            </b-row>

            <b-row>
                <b-col class="m-1">
                    <b-button variant="outline-warning" block
                              @click="$bvModal.hide('doccreation')">
                        Cancle
                    </b-button>
                </b-col>
                <b-col class="m-1">
                    <b-button variant="outline-primary" block
                              @click="addNewDocument(); $bvModal.hide('doccreation'); "
                              :disabled="document.doc_name.length < 4"
                    >
                        Add Document
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "CreateEditDocumentModal",
        data(){
            return {

                document: {
                    doc_name: "",
                    edit: false,
                    documentcontent: ""
                }
            }
        },
        props: {
            docs: {
                type: Array,
                required: true
            },
            projId: {
                required: true
            }
        },
        methods: {
            //VUEX ACTIONS
            ...mapActions(["addDocument","updateDocument"]),

            //Adds a new Document
            addNewDocument() {
                let payload = {
                    projId: this.projId,
                    document: this.document
                }
                // eslint-disable-next-line no-console
                console.log(payload)
                this.addDocument(payload)
                document.doc_name='';
            },
        }
    }
</script>

<style scoped>

</style>