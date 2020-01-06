<template>
    <div>
        <b-container>
            <b-row>
                <b-col class="m-1">
                    <label>Document Name:</label>
                    <b-form-input
                            placeholder="Enter at least 4 characters"
                            v-model="currentname"
                            :state="currentname.length >= 4"
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
                              @click="addNewDocument(currentname); $bvModal.hide('doccreation'); currentname='';"
                              :disabled="currentname.length < 4"
                    >
                        Add Document
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "CreateEditDocumentModal",
        data(){
            return {
                currentname: '',
            }
        },
        props: {
            docs: {
                type: Array,
                required: true
            }
        },
        methods: {
            //Adds a new Document
            addNewDocument(documentnname) {
                this.docs.push({
                    doc_name: documentnname,
                    edit: false
                });
            },
        }
    }
</script>

<style scoped>

</style>