<template>
    <div>
        <!-- TITLE -->
        <h1>Projects</h1>

        <div>
            <b-row align-h="between">

                <!-- Empty Col for layout -->
                <b-col>
                </b-col>

                <!-- ADD BUTTON -->
                <b-col cols="2">
                    <b-button
                            type="button"
                            @click="addNewRow"
                            id="addprojectButton"
                            variant="outline-primary"
                    >
                        <font-awesome-icon :icon="['fas', 'plus-square']"/>
                        Add New Project
                    </b-button>
                </b-col>

                <!-- SETTINGS BUTTON -->
                <b-col cols="2">
                    <b-dropdown variant="outline" no-caret>
                        <template v-slot:button-content>
                            <font-awesome-icon :icon="['fas', 'cog']"/>
                        </template>
                        <b-form-checkbox v-model="themac">Thema</b-form-checkbox>
                        <b-form-checkbox v-model="statusc">Status</b-form-checkbox>
                        <b-form-checkbox v-model="priorityc">Priority</b-form-checkbox>

                        <!-- Custom Textfield 1 - Input or Display-->
                        <b-form-checkbox v-model="custom1c">
                            {{custom_field_name1}}
                        </b-form-checkbox>

                        <b-form-checkbox v-model="custom2c">
                            {{custom_field_name2}}
                        </b-form-checkbox>

                    </b-dropdown>
                </b-col>
            </b-row>
        </div>


        <!-- Result to project saving -->
        <div id="wrongInputAlert">
            <b-alert
                    :show="dismissCountDown"
                    dismissible
                    variant="danger"
                    @dismissed="dismissCountDown=0"
                    @dismiss-count-down="countDownChanged"
            >
                No Number or Name.
            </b-alert>
        </div>

        <table id="projecttable">

            <!-- COLUMN NAMES -->
            <thead>
            <tr>
                <th>Nbr
                    <font-awesome-icon :icon="['fas', 'sort']"/>
                </th>
                <th>Name</th>
                <th v-show="themac">Thema</th>
                <th v-show="statusc">Status</th>
                <th v-show="custom1c">
                    <b-row>
                        <!-- Input / Label -->
                        <b-col>
                            <!-- Input Field-->
                            <b-input
                                    v-if="editing_custom1"
                                    v-model="custom_field_name1"
                                    :state="custom_field_name1.length >= 4"
                                    placeholder="Enter at least 4 characters"
                            ></b-input>
                            <!-- Label -->
                            <div v-else>
                                {{custom_field_name1}}
                            </div>
                        </b-col>

                        <!-- Button Edit / Save -->
                        <b-col>
                            <!-- Save Button -->
                            <div v-show="editing_custom1">
                                <b-button
                                        @click="editing_custom1 = saveFieldNameChange(custom_field_name1)"
                                        variant="outline"
                                        :disabled="custom_field_name1.length < 4"
                                        size="sm"
                                >
                                    <font-awesome-icon :icon="['fas', 'check']"/>
                                </b-button>
                            </div>
                            <!-- Edit Button -->
                            <div v-show="!editing_custom1">
                                <b-button
                                        @click="editing_custom1 = true;"
                                        variant="outline"
                                        size="sm"
                                >
                                    <font-awesome-icon :icon="['fas', 'pen']"/>
                                </b-button>
                            </div>
                        </b-col>
                    </b-row>
                </th>
                <th v-show="custom2c">
                    <b-row>
                        <!-- Input / Label -->
                        <b-col>
                            <!-- Input Field-->
                            <b-input
                                    v-if="editing_custom2"
                                    v-model="custom_field_name2"
                                    :state="custom_field_name2.length >= 4"
                                    placeholder="Enter at least 4 characters"
                            ></b-input>
                            <!-- Label -->
                            <div v-else>
                                {{custom_field_name2}}
                            </div>
                        </b-col>

                        <!-- Button Edit / Save -->
                        <b-col>
                            <!-- Save Button -->
                            <div v-show="editing_custom2">
                                <b-button
                                        @click="editing_custom2 = saveFieldNameChange(custom_field_name2)"
                                        variant="outline"
                                        :disabled="custom_field_name2.length < 4"
                                        size="sm"
                                >
                                    <font-awesome-icon :icon="['fas', 'check']"/>
                                </b-button>
                            </div>
                            <!-- Edit Button-->
                            <div v-show="!editing_custom2">
                                <b-button
                                        @click="editing_custom2 = true;"
                                        variant="outline"
                                        size="sm"
                                >
                                    <font-awesome-icon :icon="['fas', 'pen']"/>
                                </b-button>
                            </div>
                        </b-col>
                    </b-row>
                </th>
                <th v-show="priorityc">Priority</th>
                <th></th>
                <th></th>
            </tr>
            </thead>

            <!-- INPUT FIELDS -->
            <tr v-for="(project_element, index)  in project_elements" v-bind:key="index">

                <!-- Nummer -->
                <td>
                    <!-- INPUT -->
                    <div>
                        <b-form-group id="input-group-1" label-for="input-1">
                            <b-form-input
                                    id="input-1"
                                    type="text"
                                    required
                                    v-model="project_element.project_nbr"
                                    placeholder="number"
                                    :readonly="project_element.read_only"
                            ></b-form-input>
                        </b-form-group>
                    </div>

                </td>

                <!-- Name -->
                <td>
                    <b-form-group id="input-group-2" label-for="input-2">

                        <!-- Wenn im Editing Modus-->
                        <div v-if="!project_element.read_only">
                            <b-form-input
                                    id="input-2"
                                    type="text"
                                    required
                                    placeholder="name"
                                    v-model="project_element.project_name"
                                    :readonly="project_element.read_only"
                            ></b-form-input>

                        </div>

                        <!-- Wenn im ReadOnly Modus-->
                        <div v-if="project_element.read_only">

                            <router-link
                                    :to="{ name: 'project', params: { project_url: project_element.project_name, project_element: project_element} }">
                                <b-button id="openProjectButton" variant="outline-primary">
                                    {{project_element.project_name}}
                                </b-button>
                            </router-link>
                        </div>
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
                                :readonly="project_element.read_only"
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
                                :disabled="project_element.read_only"
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
                                :readonly="project_element.read_only"
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
                                :readonly="project_element.read_only"
                        ></b-form-input>
                    </b-form-group>
                </td>


                <!-- Priority -->
                <td v-show="priorityc">
                    <div>
                        <font-awesome-icon
                                :icon="['fas', 'star']"
                                @click="starClicked(1, project_element)"
                                v-model="project_element.star1"
                                v-bind:class="{starON: project_element.star1}"
                        />
                        <font-awesome-icon
                                :icon="['fas', 'star']"
                                @click="starClicked(2, project_element)"
                                v-model="project_element.star2"
                                v-bind:class="{starON: project_element.star2}"
                        />
                        <font-awesome-icon
                                :icon="['fas', 'star']"
                                @click="starClicked(3, project_element)"
                                v-model="project_element.star3"
                                v-bind:class="{starON: project_element.star3}"
                        />
                        <font-awesome-icon
                                :icon="['fas', 'star']"
                                @click="starClicked(4, project_element)"
                                v-model="project_element.star4"
                                v-bind:class="{starON: project_element.star4}"
                        />
                        <font-awesome-icon
                                :icon="['fas', 'star']"
                                @click="starClicked(5, project_element)"
                                v-model="project_element.star5"
                                v-bind:class="{starON: project_element.star5}"
                        />
                    </div>
                </td>


                <!-- NAVIGATION SECTION -->

                <!-- Save Button -->
                <td v-show="!project_element.read_only">
                    <b-button
                            @click="saveSettings(project_elements, project_element)"
                            variant="outline"
                    >
                        <font-awesome-icon :icon="['fas', 'check']"/>
                    </b-button>
                </td>

                <!-- Edit Button -->
                <td v-show="project_element.read_only">
                    <b-button
                            @click="editColumn(project_element)"
                            variant="outline"
                    >
                        <font-awesome-icon :icon="['fas', 'pen']"/>
                    </b-button>
                </td>

                <!-- Delete button -->
                <td>
                    <b-button
                            @click="$bvModal.show(index.toString())"
                            variant="outline"
                    >
                        <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                    </b-button>

                    <b-modal :id="index.toString()" hide-footer title="Delete entire project?">
                        <b-button variant="outline-danger" block
                                  @click="deleteRow(index, project_element); $bvModal.hide(index.toString())">Delete
                        </b-button>
                        <b-button variant="outline-warning" block @click="$bvModal.hide(index.toString())">Cancle
                        </b-button>
                    </b-modal>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>

    export default {
        name: "ProjectTable",
        components: {},
        data() {
            return {
                dismissSecs: 10,
                dismissCountDown: 0,
                showDismissibleAlert: false,
            }
        },
        props: {
            project_elements: {
                type: Array,
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
            custom_field_name1: {
                type: String,
                required: true
            },
            custom_field_name2: {
                type: String,
                required: true
            },
            editing_custom1: {
                type: Boolean,
                required: true
            },
            editing_custom2: {
                type: Boolean,
                required: true
            }
        },
        watch: {
            project_elements: function () {

            }
        },
        //TODO
        computed: {
            editing_custom1_comp: function () {
                return this.editing_custom1
            }

        },
        methods: {
            //Creates a new Row
            addNewRow() {
                this.project_elements.push({
                    project_nbr: '',
                    project_name: '',
                    project_theme: '',
                    project_state: null,
                    customfield1: '',
                    customfield2: '',
                    star1: false,
                    star2: false,
                    star3: false,
                    star4: false,
                    star5: false,
                    deletedialog: false,
                    read_only: false,
                });
            },

            //Deletes the current row
            deleteRow(index, project_element) {
                var idx = this.project_elements.indexOf(project_element);
                // eslint-disable-next-line no-console
                console.log('Column deleted: ' + index);
                if (idx > -1) {
                    this.project_elements.splice(idx, 1);
                }
            },

            //Is called after the user clicks on the "Edit" Button
            editColumn(project_element) {
                //make read_only false
                project_element.read_only = false

            },


            saveSettings(project_elements, project_element) {
                var state = false;

                //CHECK IF ID AND NAME FILLED
                if ((project_element.project_nbr != null) && (project_element.project_name != null)) {

                    if ((project_element.project_nbr.length > 0) && (project_element.project_name.length > 0)) {

                        //TODO check if nbr is unique
                        /*
                        // eslint-disable-next-line no-console
                        console.log('check if id is unique')

                        // CHECK if ID is unique
                        project_elements.forEach(element => {
                            if (element.project_nbr === project_element.project_nbr) {    //if nbr already exists
                                state = false;
                                // eslint-disable-next-line no-console
                                console.log('Nbr not unique - State is false ---- Current' + (element.project_nbr) + '')
                            } else if (element.project_nbr !== project_element.project_nbr) { //if number is unique
                                state = true;
                                // eslint-disable-next-line no-console
                                console.log('Nbr is unique - State is true')
                            }
                        });
                         */

                        //Save to json file
                        //TODO


                        //change to read_only
                        // eslint-disable-next-line no-console
                        console.log('change to read_only where NBR: ' + project_element.project_nbr + ' and NAME: ' + project_element.project_name)
                        project_element.read_only = true;
                        // eslint-disable-next-line no-console
                        console.log('read_only is now: ' + project_element.read_only)


                    } else {
                        state = false;
                        // eslint-disable-next-line no-console
                        console.log('Nbr or Name not filled - State is false')
                        this.dismissCountDown = this.dismissSecs
                    }
                } else {
                    state = false;
                    // eslint-disable-next-line no-console
                    console.log('Nbr or Name not filled - State is false 2')
                    this.dismissCountDown = this.dismissSecs
                }

                return state
            },

            saveFieldNameChange(customField) {
                var state = false;

                //CHECK IF ID AND NAME FILLED
                if (customField != null) {
                    if (customField.length > 0) {
                        state = true;

                    } else {
                        state = false;
                        // eslint-disable-next-line no-console
                        console.log('Name not filled - State is false')
                        this.dismissCountDown = this.dismissSecs
                    }
                } else {
                    state = false;
                    // eslint-disable-next-line no-console
                    console.log('Name not filled - State is false 2')
                    this.dismissCountDown = this.dismissSecs
                }

                return !state
            },

            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },

            starClicked(index, project_element) {

                if (index === 1) {
                    // eslint-disable-next-line no-console
                    console.log('1. star clicked from ' + project_element.project_name)

                    project_element.star1 = true;
                    project_element.star2 = false;
                    project_element.star3 = false;
                    project_element.star4 = false;
                    project_element.star5 = false;

                } else if (index === 2) {
                    // eslint-disable-next-line no-console
                    console.log('2. star clicked from ' + project_element.project_name)

                    project_element.star1 = true;
                    project_element.star2 = true;
                    project_element.star3 = false;
                    project_element.star4 = false;
                    project_element.star5 = false;

                } else if (index === 3) {
                    // eslint-disable-next-line no-console
                    console.log('3. star clicked from ' + project_element.project_name)

                    project_element.star1 = true;
                    project_element.star2 = true;
                    project_element.star3 = true;
                    project_element.star4 = false;
                    project_element.star5 = false;

                } else if (index === 4) {
                    // eslint-disable-next-line no-console
                    console.log('4. star clicked from ' + project_element.project_name)

                    project_element.star1 = true;
                    project_element.star2 = true;
                    project_element.star3 = true;
                    project_element.star4 = true;
                    project_element.star5 = false;

                } else if (index === 5) {
                    // eslint-disable-next-line no-console
                    console.log('5. star clicked from ' + project_element.project_name)

                    project_element.star1 = true;
                    project_element.star2 = true;
                    project_element.star3 = true;
                    project_element.star4 = true;
                    project_element.star5 = true;
                }
            }


        },

    }
</script>

<style scoped>
    #projecttable {
        width: 100%;
        max-width: 1200px;
        margin: 40px auto;
        padding: 0 20px;
        box-sizing: border-box;
    }

    #addprojectButton {
        max-width: 200px;
        max-height: 30px;
    }

    #openProjectButton {
    }

    #app {
        background: lightgrey;
    }

    .activeToClick {
        background-color: orange;
    }

    .starON {
        color: #FF6852;
    }


</style>