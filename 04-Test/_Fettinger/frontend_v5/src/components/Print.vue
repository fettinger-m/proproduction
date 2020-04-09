<template>
    <div class="custom-actions">
        <a href="DOWNLOADLINK" download="DATEINAME"></a>
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
    import {mapActions} from "vuex";

    export default {
        methods: {
            async addShot({commit}, payload) {
                //1. POST the shot object WITHOUT image

                //2. IF a image was attached the image gets posted (seperately)
                if (payload.shotObject.imageAttached) {

                    //POST Image FormData

                    //set download link of shot object
                    payload.shotObject.downloadlink = res.data.downloadlink;
                } else {
                    payload.shotObject.downloadlink = '';
                }

                //commit mutation with payload object
                commit('addShotMut', payload);
            },
        }
    }
</script>
