<template>
    <b-form @submit="onSubmit" v-if="show">
        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
                    id="input-1"
                    v-model="form.name"
                    :placeholder=rowData.name
            ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Group:" label-for="input-2">
            <b-form-input
                    id="input-2"
                    v-model="form.group"
                    :placeholder=rowData.group
            ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Role:" label-for="input-3">
            <b-form-input
                    id="input-3"
                    v-model="form.role"
                    :placeholder=rowData.role
            ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="E-Mail:" label-for="input-4">
            <b-form-input
                    id="input-4"
                    v-model="form.email"
                    type="email"
                    required
                    :placeholder=rowData.email
            ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-5" label="Phone:" label-for="input-5">
            <b-form-input
                    id="input-5"
                    v-model="form.phone"
                    :placeholder=rowData.phone
            ></b-form-input>
        </b-form-group>
    </b-form>
</template>

<script>
    import {mapActions} from "vuex";
    import {mapGetters} from "vuex";
    import axios from "axios"

    const client = axios.create({
        //baseURL: 'http://172.17.74.80:3000',
        baseURL: 'http://localhost:3000',
        json: true
    });

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
                form: {
                    name: '',
                    group: '',
                    role: '',
                    email: '',
                    phone: '',
                    id: ''
                },
                show: true,
                projectId: '',
                selectedproject: {}

            }
        },
        methods: {
            ...mapActions(["updateContact"]),
            onSubmit() {
                if (this.form.name === '') {
                    this.form.name = this.rowData.name
                }
                if (this.form.group === '') {
                    this.form.group = this.rowData.group
                }
                if (this.form.role === '') {
                    this.form.role = this.rowData.role
                }
                if (this.form.email === '') {
                    this.form.email = this.rowData.email
                }
                if (this.form.phone === '') {
                    this.form.phone = this.rowData.phone
                }
                this.form.id = this.rowData.id;

                // eslint-disable-next-line no-console
                console.log(this.form);

                /*
                let payload = {
                    proJId: this.projectId,
                    updContact: this.form
                };
                 */

                // eslint-disable-next-line no-console
                console.log(`/projects/${this.projectId}/contacts/${this.form.id}/update`);

                client.post(`/projects/${this.projectId}/contacts/${this.form.id}/update`, this.form);

                //this.updateContact(payload);

            },
            onReset() {
                this.form.name = '';
                this.form.group = '';
                this.form.role = '';
                this.form.email = '';
                this.form.phone = '';
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        },
        computed: {
            ...mapGetters(["getProjectByID"]),
        },
        mounted() {
            this.projectId = sessionStorage.getItem('sessionProjectID');
            this.selectedproject = this.getProjectByID(this.projectId);
        }
    }
</script>

<style scoped>

</style>