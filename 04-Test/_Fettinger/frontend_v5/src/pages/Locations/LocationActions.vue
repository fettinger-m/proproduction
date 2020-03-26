<template>
    <div class="custom-actions">
        <!-- DELETE modal -->
        <b-modal
                :title=titleDel
        >
            Confirm that you want to delete contact: {{rowData.name}}
        </b-modal>

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
    import {mapActions} from "vuex";

    export default {
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                deleteShow: false,
                titleDel: "Delete " + this.rowData.name,
                projectId: ''
            }
        },
        methods: {
            ...mapActions(["deleteLocation"]),

            //Function for DELETE Modal
            deleteItemAction(data) {
                this.$bvModal.msgBoxConfirm(
                    'Please confirm that you want to delete '+this.rowData.name,
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
                                let payload = {
                                    projId: this.projectId,
                                    locId: data.id
                                };
                                this.deleteLocation(payload);
                                this.$root.$emit('reloadLocationTable');
                            }
                        }
                    );


            },

        },
        mounted() {
            this.projectId = sessionStorage.getItem('sessionProjectID');
        }
    }
</script>