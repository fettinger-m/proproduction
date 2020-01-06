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
                <b-button size="sm" variant="primary" @click="ok()">
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
            deleteItemAction(action, data, index) {
                // eslint-disable-next-line no-console
                console.log('custom-actions: ' + action, data.name, index);

                this.boxTwo = ''
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
                        this.boxTwo = value
                    })
            },
            editItemAction(action, data, index) {
                // eslint-disable-next-line no-console
                console.log('custom-actions: ' + action, data.name, index);
                this.editShow = true;

            },
            resetForm: function() {
                this.$refs.editContactRef.onReset();
            }
        }
    }
</script>

<style>
</style>