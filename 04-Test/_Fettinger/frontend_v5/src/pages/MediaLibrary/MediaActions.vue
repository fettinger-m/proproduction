<template>
    <div class="media-actions">
        <!-- DELETE modal -->
        <b-modal
                :title=titleDel
        >
            Confirm that you want to delete contact: {{rowData.name}}
        </b-modal>

        <!-- DOWNLOAD button -->
        <b-button
                variant="outline-primary"
                size="sm" class="mr-1"
                @click="downloadItemAction(rowData)"
        >
            <font-awesome-icon :icon="['fas', 'download']" fixed-width/>
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
    import axios from 'axios'

    const client = axios.create({
        baseURL: 'https://da-production.herokuapp.com/',
        json: true
    });

    export default {
        name: "MediaActions",
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                projId: '',
                titleDel: "Delete " + this.rowData.name,
            }
        },
        methods: {
            //Function for DELETE Modal
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
                    .then(value => {
                        if (value) {
                            client.post(`projects/${this.projId}/media/${data.name}/delete`).then(
                                this.$root.$emit('reloadMediaTable')
                            );

                        }
                    });


            },

            //Function for DOWNLOAD button
            downloadItemAction(data) {
                //Create a HTML link object ('a' Tag)
                const link = document.createElement('a');

                //set the HREF attribute to the download link
                link.href = data.downloadlink;

                /*
                link.setAttribute('download', "test.jpg");
                 */

                //Append link object to HTML body
                document.body.appendChild(link);

                //Click link object manually --> download gets executed
                link.click();
            }

        },
        mounted() {
            this.projId = sessionStorage.getItem('sessionProjectID');
        }
    }
</script>

<style scoped>

</style>