<template>
    <div class="custom-actions">
        <b-modal v-model="deleteShow" :title=titleDel>Confirm that you want to delete contact: {{rowData.name}}
        </b-modal>
        <b-modal v-model="editShow" :title=titleEdit>
            <EditContact :row-data="rowData" :row-index="rowIndex" ref="editContactRef"></EditContact>

            <template v-slot:modal-footer="{ cancel, ok }">
                <b-button size="sm" @click="cancel()">
                    Cancel
                </b-button>
                <b-button size="sm" @click="resetForm">
                    Reset
                </b-button>
                <!-- Button with custom close trigger value -->
                <b-button size="sm" variant="primary" @click="onSubmit">
                    Submit
                </b-button>
            </template>
        </b-modal>

        <b-button variant="outline-primary" size="sm" class="mr-1" @click="editItemAction('edit-item', rowData, rowIndex)">
            <font-awesome-icon :icon="['fas', 'pen']" fixed-width/>
        </b-button>
        <b-button variant="outline-primary" size="sm" @click="deleteItemAction('delete-item', rowData, rowIndex)">
            <font-awesome-icon :icon="['fas', 'trash']" fixed-width/>
        </b-button>
    </div>
</template>

<script>
    import EditContact from "./EditContact";
    import {mapActions} from "vuex";

    export default {
        components: {
            EditContact
        },
        props: {
            rowData: {
                type: Object,
                required: true
            },
            rowIndex: {
                type: Number
            }
        },
        data() {
            return {
                editShow: false,
                deleteShow: false,
                titleDel: "Delete " + this.rowData.name,
                titleEdit: "Edit " + this.rowData.name,
            }
        },
        methods: {
            ...mapActions(["deleteContact"]),
            deleteItemAction(action, data, index) {
                // eslint-disable-next-line no-console
                console.log('custom-actions: ' + action, data.name, index);
                this.$bvModal.msgBoxConfirm('Please confirm that you want to delete '+this.rowData.name, {
                    title: 'Please Confirm',
                    buttonSize: 'sm',
                    okVariant: 'primary',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                    .then(value => {
                        if (value) {
                            this.deleteContact(data.id);
                            this.$root.$emit('reloadContactsTable');
                        }
                    });


            },
            editItemAction(action, data, index) {
                // eslint-disable-next-line no-console
                console.log('custom-actions: ' + action, data.name, index);
                this.editShow = true;

            },
            resetForm: function() {
                this.$refs.editContactRef.onReset();
            },
            onSubmit: function() {
                this.$refs.editContactRef.onSubmit();
                this.editShow = false;
                this.$root.$emit('reloadContactsTable');
            }
        }
    }
</script>

<style>
</style>