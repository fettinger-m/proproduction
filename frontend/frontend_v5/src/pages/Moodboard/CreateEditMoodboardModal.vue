<template>
    <div>
        <b-container>
            <b-row>
                <b-col class="m-1">
                    <label>Moodboard Name:</label>
                    <b-form-input
                            placeholder="Enter at least 4 characters"
                            v-model="currentboardname"
                            :state="currentboardname.length >= 4"
                    ></b-form-input>
                </b-col>
            </b-row>

            <b-row>
                <b-col class="m-1">
                    <b-button variant="outline-warning" block
                              @click="$bvModal.hide('boardcreation')">
                        Cancle
                    </b-button>
                </b-col>
                <b-col class="m-1">
                    <b-button variant="outline-primary" block
                              @click="addNewBoard(currentboardname); $bvModal.hide('boardcreation'); currentboardname='';"
                              :disabled="currentboardname.length < 4"
                    >
                        Add Board
                    </b-button>
                </b-col>
            </b-row>

        </b-container>
    </div>
</template>

<script>

    export default {
        name: "CreateEditMoodboardModal",
        data() {
            return {
                currentboardname: '',
            }
        },
        props: {
            moodboards: {
                type: Array,
                required: true
            }
        },
        methods: {
            addNewBoard(currentboardname) {

                this.moodboards.push({
                    boardname: currentboardname,
                    edit: false,

                });
            },
        }
    }
</script>

<style scoped>

</style>