<template>
    <div>
        <!-- TITLE -->
        <h1>Projects</h1>

        <b-container>
            <div>
                <b-row align-h="end">

                    <!-- Empty Col for layout -->
                    <b-col>
                    </b-col>
                    <b-col cols="3">
                        <div class="float-right mb-3">
                            <!-- SETTINGS BUTTON -->
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
                            <!-- ADD BUTTON -->
                            <b-button
                                    type="button"
                                    @click="addProject"
                                    variant="outline-primary"
                            >
                                <font-awesome-icon :icon="['fas', 'plus-square']"/>
                                Add New Project
                            </b-button>
                        </div>
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

            <table>

                <!-- COLUMN NAMES -->
                <thead>
                <tr>
                    <th>Nbr
                    </th>
                    <th>Name</th>
                    <th v-show="themac">Thema</th>
                    <th v-show="statusc">
                        <b-dropdown variant="outline" title="Status">
                            <template v-slot:button-content>
                                Status
                            </template>
                            <div class="dropdownstyle">
                                <b-form-checkbox v-model="planningr">
                                    show planning
                                </b-form-checkbox>
                                <b-form-checkbox v-model="filmingr">
                                    show filming
                                </b-form-checkbox>
                                <b-form-checkbox v-model="editingr">
                                    show editing
                                </b-form-checkbox>
                                <b-form-checkbox v-model="previewr">
                                    show preview
                                </b-form-checkbox>
                                <b-form-checkbox v-model="doner">
                                    show done
                                </b-form-checkbox>
                            </div>
                        </b-dropdown>
                    </th>
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
                                            @click="editing_custom1 = false"
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
                                            @click="editing_custom2 = false"
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
                    <th v-show="priorityc">
                        <b-dropdown variant="outline">
                            <template v-slot:button-content>
                                Priority
                            </template>
                            <b-form-radio-group class="dropdownstyle">
                                <b-form-radio v-model="prioritysshown" value="0">show 0 Stars or higher</b-form-radio>
                                <b-form-radio v-model="prioritysshown" value="1">show 1 Stars or higher</b-form-radio>
                                <b-form-radio v-model="prioritysshown" value="2">show 2 Stars or higher</b-form-radio>
                                <b-form-radio v-model="prioritysshown" value="3">show 3 Stars or higher</b-form-radio>
                                <b-form-radio v-model="prioritysshown" value="4">show 4 Stars or higher</b-form-radio>
                                <b-form-radio v-model="prioritysshown" value="5">show 5 Stars</b-form-radio>
                            </b-form-radio-group>
                        </b-dropdown>

                    </th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <!-- INPUT FIELDS -->
                <tr
                        v-for="(project_element, index) in projects"
                        v-bind:key="index"

                        class="tablerow"
                >
                    <!--TODO v-show="checkState(project_element) && checkPriority(project_element)"-->

                    <!-- Nummer -->
                    <td>
                        <!-- INPUT -->
                        <div>
                            <b-form-group>
                                <b-form-input
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
                                        type="text"
                                        required
                                        placeholder="name"
                                        v-model="project_element.project_name"
                                        :readonly="project_element.read_only"
                                        class="name-btn"
                                ></b-form-input>

                            </div>

                            <!-- Wenn im ReadOnly Modus-->
                            <div v-if="project_element.read_only">

                                <router-link
                                        :to="{ name: 'project', params: { project_url: project_element.project_name, project_element: project_element} }">
                                    <b-button id="openProjectButton" variant="outline-primary" class="name-btn">
                                        {{project_element.project_name}}
                                    </b-button>
                                </router-link>
                            </div>
                        </b-form-group>

                    </td>

                    <!-- Thema  -->
                    <td v-show="themac">
                        <b-form-group>
                            <b-form-input
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
                        <b-form-group>
                            <b-form-select
                                    v-model="project_element.project_state"
                                    :options="project_status"
                                    required
                                    :disabled="project_element.read_only"
                            ></b-form-select>
                        </b-form-group>
                    </td>

                    <!-- Custom1  -->
                    <td v-show="custom1c">
                        <b-form-group>
                            <b-form-input
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
                        <b-form-group>
                            <b-form-input
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
                                @click="saveSettings(project_element)"
                                variant="outline"
                        >
                            <font-awesome-icon :icon="['fas', 'check']"/>
                        </b-button>
                    </td>

                    <!-- Edit Button -->
                    <td v-show="project_element.read_only">
                        <b-button
                                @click="project_element.read_only = false"
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
                                      @click="deleteProject(project_element.id);">Delete
                            </b-button>
                            <b-button variant="outline-warning" block @click="$bvModal.hide(index.toString())">Cancle
                            </b-button>
                        </b-modal>
                    </td>
                </tr>
            </table>
        </b-container>
        <hr>
    </div>
</template>

<script>
    import { mapMultiRowFields  } from "vuex-map-fields";
    import { mapGetters, mapActions, mapMutations } from "vuex";
    export default {
        name: "ProjectTable",
        components: {},
        data() {
            return {


                //-----SAVE LOCALLY-----

                //Values for the Alert
                dismissSecs: 10,
                dismissCountDown: 0,
                showDismissibleAlert: false,

                //If the Custum Fields Name is currently beeing edited
                editing_custom1: false,
                editing_custom2: false,

                //state options to be chosen
                project_status: [{
                    text: 'selecte state', value: null
                },
                    'planning', 'filming', 'editing', 'preview', 'done'],

                //Values that define if a project is shown
                //from Sate
                planningr: true,
                filmingr: true,
                editingr: true,
                previewr: true,
                doner: true,
                //from priority
                prioritysshown: '0',
            }
        },
        props: {

            //GET FROM VUEX AFTER SWITCH
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
        },
        methods: {

            //VUEX ACTIONS
            ...mapActions(["fetchProjects", "addProject", "updateProject", "deleteProject"]),
            //VUEX MUTATIONS
            ...mapMutations(['addProjectRow']),

            //Is called after the User wants to save a project row
            saveSettings(project_element) {
                //CHECK IF ID AND NAME FILLED
                //if the fields are not null
                if ((project_element.project_nbr != null) && (project_element.project_name != null)) {
                    //if the fields are not empty
                    if ((project_element.project_nbr.length > 0) && (project_element.project_name.length > 0)) {
                        project_element.read_only = true;

                        //Update Backend
                        // eslint-disable-next-line no-console
                        console.log(project_element);
                        this.updateProject(project_element)
                    } else {
                        //Start the warning block
                        this.dismissCountDown = this.dismissSecs
                    }
                } else {
                    //Start the warning block
                    this.dismissCountDown = this.dismissSecs
                }
            },

            //Is used for the warning block
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },

            //Is called when the user clicks on a star
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
            },

            //Checks if the specific project should be shown or not - depending on its filter
            checkState(project_element) {

                if (project_element.project_state === "planning" && this.planningr == true) {
                    return true;
                } else if (project_element.project_state === "filming" && this.filmingr == true) {
                    return true;
                } else if (project_element.project_state === "editing" && this.editingr == true) {
                    return true;
                } else if (project_element.project_state === "preview" && this.previewr == true) {
                    return true;
                } else if (project_element.project_state === "done" && this.doner == true) {
                    return true;
                } else if (project_element.project_state == null) {
                    return true;
                } else {
                    return false;
                }
            },

            checkPriority(project_element) {

                if (project_element.star5 === false && this.prioritysshown === '5') {
                    return false
                } else if (project_element.star4 === false && this.prioritysshown === '4') {
                    return false
                } else if (project_element.star3 === false && this.prioritysshown === '3') {
                    return false
                } else if (project_element.star2 === false && this.prioritysshown === '2') {
                    return false
                } else if (project_element.star1 === false && this.prioritysshown === '1') {
                    return false
                } else if (this.prioritysshown === '0') {
                    return true
                } else {
                    return true
                }

            },

        },
        computed: {
            ...mapGetters(["allProjects"]),
            ...mapMultiRowFields(['projects']),
        },

        created() {
            this.fetchProjects();

        },

    }
</script>

<style scoped>

    .tablerow {

    }

    .starON {
        color: #FF6852;
    }

    .dropdownstyle {
        font-size: small;
    }

    .name-btn {
        width: 10rem !important;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }

    .custom-select {
        border-radius: 0;

    }

    .custom-select:focus {
        box-shadow: none;
        border-color: #ced4da;
    }

    .form-control {
        margin-right: 0;
    }

    .form-control:focus {
        box-shadow: none;
        border-color: #ced4da;
    }

</style>