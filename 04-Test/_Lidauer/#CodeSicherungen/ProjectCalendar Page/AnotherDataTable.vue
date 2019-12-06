<!-- Tutorial: https://www.youtube.com/watch?v=Nr5P8_GDDlk -->

<template>
    <div id="app">

        <b-container>
            <b-row align-h="between">
                <!-- TITLE -->
                <b-col><h1>Projects</h1></b-col>

                <!-- ADD BUTTON -->
                <b-col>
                    <button type="button" @click="addNewRow" id="addproject">
                        <font-awesome-icon :icon="['fas', 'plus-square']"/>
                        Add New Project
                    </button>
                </b-col>

                <!-- SETTINGS BUTTON -->
                <b-col>
                    <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
                        <template v-slot:button-content>
                            <font-awesome-icon :icon="['fas', 'cog']"/>
                        </template>
                        <b-form-checkbox v-model="themac">Thema</b-form-checkbox>
                        <b-form-checkbox v-model="statusc">Status</b-form-checkbox>
                        <b-form-checkbox>ToDo</b-form-checkbox>
                        <b-form-checkbox v-model="priorityc">Priority</b-form-checkbox>
                        <b-form-checkbox v-model="custom1c">Custom 1</b-form-checkbox>
                        <b-form-checkbox v-model="custom2c">Custom 2</b-form-checkbox>
                        <div class="dropdown-divider"></div>
                        <b-dropdown-item>something else</b-dropdown-item>
                    </b-dropdown>
                </b-col>
            </b-row>

        </b-container>

        <table>
            <!-- COLUMN NAMES -->
            <thead>
            <tr>
                <th>Nbr
                    <font-awesome-icon :icon="['fas', 'sort']"/>
                </th>
                <th>Name</th>
                <th v-show="themac">Thema</th>
                <th v-show="statusc">Status</th>
                <th v-show="custom1c">CustomField1</th>
                <th v-show="custom2c">CustomField2</th>
                <th v-show="priorityc">Priority</th>
                <th></th>
                <th></th>
            </tr>
            </thead>

            <!-- INPUT FIELDS -->
            <tr v-for="(project_element, index)  in project_elements" v-bind:key="index">

                <!-- Nummer -->
                <td>
                    <b-form-group id="input-group-1" label-for="input-1">
                        <b-form-input
                                id="input-1"
                                type="number"
                                required
                                placeholder="number"
                                :state="validation"
                                v-model="project_element.project_nbr"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="validation">
                            The number must be unique.
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback :state="validation">
                            Looks Good.
                        </b-form-valid-feedback>
                    </b-form-group>

                </td>

                <!-- Name -->
                <td>
                    <b-form-group id="input-group-2" label-for="input-2">
                        <b-form-input
                                id="input-2"
                                type="text"
                                required
                                placeholder="name"
                                v-model="project_element.project_name"
                        ></b-form-input>
                    </b-form-group>

                </td>

                <!-- Thema  -->
                <td v-show="themac">
                    <b-form-group id="input-group-3" label-for="input-3">
                        <b-form-input
                                id="input-3"
                                type="text"
                                required
                                placeholder="thema"
                                v-model="project_element.project_theme"
                        ></b-form-input>
                    </b-form-group>
                </td>

                <!-- Status -->
                <td v-show="statusc">
                    <b-form-group id="input-group-4" label-for="input-3">
                        <b-form-select
                                id="input-4"
                                v-model="project_element.project_state"
                                :options="project_status"
                                required
                        ></b-form-select>
                    </b-form-group>
                </td>

                <!-- Custom1  -->
                <td v-show="custom1c">
                    <b-form-group id="input-group-5" label-for="input-3">
                        <b-form-input
                                id="input-5"
                                type="text"
                                required
                                placeholder="custom"
                                v-model="project_element.customfield1"
                        ></b-form-input>
                    </b-form-group>
                </td>

                <!-- Custom2  -->
                <td v-show="custom2c">
                    <b-form-group id="input-group-6" label-for="input-3">
                        <b-form-input
                                id="input-6"
                                type="text"
                                required
                                placeholder="custom"
                                v-model="project_element.customfield2"
                        ></b-form-input>
                    </b-form-group>
                </td>


                <!-- Priority -->
                <td v-show="priorityc">
                    <div>
                        <PriorityStars></PriorityStars>
                    </div>
                </td>


                <!-- NAVIGATION SECTION -->

                <!-- Save Button -->
                <td v-show="!edit_mode">
                    <b-button>
                        <font-awesome-icon :icon="['fas', 'check']"/>
                    </b-button>
                </td>

                <!-- Edit Button -->
                <td v-show="edit_mode">
                    <b-button>
                        <font-awesome-icon :icon="['fas', 'pen']"/>
                    </b-button>
                </td>

                <!-- Delete button -->
                <td>
                    <!-- OLD Delete Button
                    <b-button @click="deleteRow(index, project_element)">
                        <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                    </b-button>
                    -->

                    <!-- NEW BUTTON WITH DIALOG-->
                    <b-button @click="project_element.deletedialog = true">
                        <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                    </b-button>

                    <b-modal v-model="project_element.deletedialog" hide-footer title="Delete entire project?">
                        <b-button variant="outline-danger" block @click="deleteRow(index, project_element)">Delete
                        </b-button>
                        <b-button variant="outline-warning" block @click="project_element.deletedialog = false">Cancle
                        </b-button>
                    </b-modal>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import PriorityStars from "@/components/PriorityStars";

    export default {
        name: "AnotherDataTable",
        components: {PriorityStars},

        props: {
            project_elements: {
                type: Array,
                required: true
            },
            edit_mode: {
                type: Boolean,
                required: true
            },
            project_status: {
                type: Array,
                required: true
            },
            themac: {
                type: Boolean,
                required: true
            },
            statusc: {
                type: Boolean,
                required: true
            },
            priorityc: {
                type: Boolean,
                required: true
            },
            custom1c: {
                type: Boolean,
                required: true
            },
            custom2c: {
                type: Boolean,
                required: true
            },
        },
        methods: {
            addNewRow() {
                this.project_elements.push({
                    project_nbr: 0,
                    project_name: '',
                    project_theme: '',
                    project_status: ''
                });
            },
            deleteRow(index, project_element) {
                var idx = this.project_elements.indexOf(project_element);
                // eslint-disable-next-line no-console
                console.log(idx, index);
                if (idx > -1) {
                    this.project_elements.splice(idx, 1);
                }
            },
            columnsEdit() {
                //Select which colums are shown
            },
            saveSettings() {
                //check the input values
                //save the data into the json file
                //change the view to a normal table
                //change the "edit_mode"
            },
        },
        computed: {}
    }
</script>

<style scoped>
    table {
        width: 100%;
        max-width: 1200px;
        margin: 40px auto;
        padding: 0 20px;
        box-sizing: border-box;
        background: lightgrey;
    }

    #addproject {
        max-width: 200px;
        max-height: 30px;
    }

</style>