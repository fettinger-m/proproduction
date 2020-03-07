<template>
    <div class="custom-actions">
        <b-modal v-model="deleteShow" :title=titleDel>Confirm that you want to delete contact: {{rowData.name}}
        </b-modal>
        <b-button variant="outline-primary" size="sm" @click="deleteItemAction('delete-item', rowData, rowIndex)">
            <font-awesome-icon :icon="['fas', 'trash']" fixed-width/>
        </b-button>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import {mapGetters} from "vuex";

    export default {
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
                projectId: '',
                selectedproject: {}
            }
        },
        methods: {
            ...mapActions(["deleteLocation"]),
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
                            let payload = {
                                projId: this.projectId,
                                locId: data.id
                            };

                            this.deleteLocation(payload);
                            this.$root.$emit('reloadLocationTable');
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
            }
        },
        mounted() {
            this.projectId = sessionStorage.getItem('sessionProjectID');
            this.selectedproject = this.getProjectByID(this.projectId);
        },
        computed: {
            ...mapGetters(["getProjectByID"]),
        },
    }
</script>

<style>
</style>