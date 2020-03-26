<template>
    <div class="custom-actions">
        <!-- EDIT modal -->
        <b-modal
                :title=titleEdit
                v-model="editShow"
        >
            <!-- edit contact component -->
            <EditContact :row-data="rowData" ref="editContactRef"></EditContact>

            <!-- Edit standard template of the modal footer -->
            <template v-slot:modal-footer="{ cancel, ok }">
                <b-button size="sm" @click="cancel()">
                    Cancel
                </b-button>
                <b-button size="sm" @click="resetForm">
                    Reset
                </b-button>
                <b-button size="sm" variant="primary" @click="onSubmit">
                    Submit
                </b-button>
            </template>
        </b-modal>

        <!-- DELETE modal -->
        <b-modal
                :title=titleDel
        >
            Confirm that you want to delete contact: {{rowData.name}}
        </b-modal>

        <!-- EDIT button -->
        <b-button
                variant="outline-primary"
                size="sm"
                class="mr-1"
                @click="editItemAction(rowData)"
        >
            <font-awesome-icon :icon="['fas', 'pen']" fixed-width/>
        </b-button>

        <!-- DELETE button -->
        <b-button
                variant="outline-primary"
                size="sm"
                @click="deleteItemAction(rowData)"
        >
            <font-awesome-icon :icon="['fas', 'trash']" fixed-width/>
        </b-button>
    </div>
</template>

<script>
    import EditContact from "./EditContact";
    import axios from 'axios'

    //Define axios client
    const client = axios.create({
        baseURL: 'https://da-production.herokuapp.com/',
        json: true
    });

    export default {
        components: {
            EditContact
        },
        props: {
            rowData: {
                type: Object,
                required: true
            },
        },

        data() {
            return {
                projId: "",

                editShow: false,

                //Title creation for both modals
                titleDel: "Delete " + this.rowData.name,
                titleEdit: "Edit " + this.rowData.name,
            }
        },

        methods: {
            //Function for DELETE modal
            deleteItemAction(data) {
                this.$bvModal.msgBoxConfirm(
                    'Please confirm that you want to delete ' + this.rowData.name,
                    {
                        title: 'Please Confirm',
                        buttonSize: 'sm',
                        okVariant: 'primary',
                        okTitle: 'YES',
                        cancelTitle: 'NO',
                        footerClass: 'p-2',
                        hideHeaderClose: false,
                        centered: true
                    }
                )
                    .then(
                        value => {
                            if (value) {
                                client.post(`projects/${this.projId}/contacts/${data.id}/delete`)
                                    .then(
                                        this.$root.$emit('reloadContactsTable')
                                    );
                        }
                    });


            },

            //Function for EDIT Modal
            editItemAction() {
                this.editShow = true;
            },

            //Reset function of the edit Modal
            resetForm: function () {
                //Triggers the reset in the component over reference
                this.$refs.editContactRef.onReset();
            },

            //Submit function of the edit Modal
            onSubmit: function () {
                //Triggers the submit in the component over reference
                this.$refs.editContactRef.onSubmit();
                this.editShow = false;

            }
        },
        mounted() {
            this.projId = sessionStorage.getItem('sessionProjectID');
        }
    }
</script>