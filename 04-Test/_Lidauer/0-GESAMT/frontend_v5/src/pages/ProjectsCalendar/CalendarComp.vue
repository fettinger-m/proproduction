<!-- Example:
https://github.com/richardtallent/vue-simple-calendar
-->

<template>
    <div>
        <h1>Calendar</h1>

        <b-container>
            <b-row>
                <!-- Calendar Event Input -->
                <b-col>
                    <b-card>
                        <div class="eventlabel">Add a new Event</div>
                        <b-row>
                            <!-- Title -->
                            <b-col class="m-1">
                                <b-input
                                        v-model="current_event.title"
                                        placeholder="event name"
                                ></b-input>
                            </b-col>
                        </b-row>

                        <b-row>
                            <!-- Description -->
                            <b-col class="m-1">
                                <b-input
                                        v-model="current_event.description"
                                        placeholder="description"
                                ></b-input>
                            </b-col>
                        </b-row>

                        <b-row>
                            <!-- Start Date -->
                            <b-col class="m-1">
                                <label>Start Date: </label>
                            </b-col>
                            <b-col class="m-1" md="4">
                                <date-picker
                                        v-model="current_event.startDate"
                                        :config="options"></date-picker>
                            </b-col>

                            <!-- End Date -->
                            <b-col class="m-1">
                                <label>End Date: </label>
                            </b-col>
                            <b-col class="m-1" md="4">
                                <date-picker
                                        v-model="current_event.endDate"
                                        :config="options"></date-picker>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col cols="9">

                            </b-col>
                            <!-- Add Event Button -->
                            <b-col>
                                <b-button
                                        @click="addEventAction(current_event)"
                                        :disabled="current_event.title.toString() === ''  || current_event.endDate < current_event.startDate"
                                >
                                    Add Event
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>

                <!-- Infos zu ausgewähltem Element-->
                <b-col>
                    <b-card>
                        <b-row>
                            <!-- Title-->
                            <b-col>
                                <b-input v-if="editingEntry"
                                         v-model="selectedDate.title"
                                         :state="selectedDate.title.length >= 4"
                                         placeholder="Enter at least 4 characters"
                                >
                                </b-input>
                                <div v-else
                                     class="eventlabel">{{ this.selectedDate.title }}
                                </div>
                            </b-col>

                            <!-- Buttons -->
                            <b-col>
                                <div v-show="selectedDate.id != ''">
                                    <!-- Edit Button -->
                                    <b-button
                                            v-show="!editingEntry"
                                            variant="outline"
                                            @click="editingEntry=true"
                                    >
                                        <font-awesome-icon :icon="['fas', 'pen']"/>
                                    </b-button>
                                    <!-- Save Button -->
                                    <b-button
                                            v-show="editingEntry"
                                            variant="outline"
                                            @click="updateSelectedEvent()"
                                            :disabled=" selectedDate.title.length < 4 || selectedDate.endDate < selectedDate.startDate"
                                    >
                                        <font-awesome-icon :icon="['fas', 'check']"/>
                                    </b-button>

                                    <!-- Delete button -->
                                    <b-button
                                            @click="$bvModal.show('deleteeventmodal')"
                                            variant="outline"
                                    >
                                        <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                                    </b-button>
                                    <b-modal id="deleteeventmodal" hide-footer>
                                        <template v-slot:modal-title>
                                            Delete this event "{{ selectedDate.title }}"?
                                        </template>
                                        <b-button variant="outline-danger" block
                                                  @click="deleteEvent(selectedDate.id); $bvModal.hide('deleteeventmodal'); resetSelectedDate(selectedDate);">
                                            Delete
                                        </b-button>
                                        <b-button variant="outline-warning" block
                                                  @click="$bvModal.hide('deleteeventmodal')">Cancle
                                        </b-button>
                                    </b-modal>
                                </div>
                            </b-col>
                        </b-row>

                        <!-- Description -->
                        <b-row class="descriptiontext">
                            <b-form-textarea v-if="editingEntry"
                                     v-model="selectedDate.description"
                                     placeholder="Enter at least 4 characters"
                            >
                            </b-form-textarea>
                            <div v-else>
                                 {{ this.selectedDate.description }}
                            </div>
                        </b-row>

                        <!-- Start & End Date-->
                        <b-row v-if="selectedDate.id != ''">
                            <!-- Start Date -->
                            <b-col class="m-1">
                                <label>Start Date: </label>
                            </b-col>
                            <b-col class="m-1" md="4">
                                <date-picker
                                        v-model="selectedDate.startDate"
                                        :config="options"
                                        :disabled="!editingEntry"
                                >
                                </date-picker>
                            </b-col>

                            <!-- End Date -->
                            <b-col class="m-1">
                                <label>End Date: </label>
                            </b-col>
                            <b-col class="m-1" md="4">
                                <date-picker
                                        v-model="selectedDate.endDate"
                                        :config="options"
                                        :disabled="!editingEntry"
                                >
                                </date-picker>
                            </b-col>
                        </b-row>

                    </b-card>
                </b-col>
            </b-row>

            <p></p>

            <div class="calendardiv">
                <!-- Calendar display -->
                <calendar-view
                        :show-date="showDate"
                        :events="localevents"
                        class="theme-default holiday-us-traditional holiday-us-official"
                        @click-event="onClickItem"
                        :startingDayOfWeek="startingDoW"
                >
                    <calendar-view-header
                            slot="header"
                            slot-scope="t"
                            :header-props="t.headerProps"
                            @input="setShowDate"
                    />
                </calendar-view>
            </div>

        </b-container>
    </div>

</template>

<script>

    import {CalendarView, CalendarViewHeader} from "vue-simple-calendar"

    require("vue-simple-calendar/static/css/default.css")
    require("vue-simple-calendar/static/css/holidays-us.css")
    import 'bootstrap/dist/css/bootstrap.css';
    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    import {mapGetters, mapActions, mapMutations} from "vuex";

    export default {
        name: "CalendarComp",
        data: function () {
            return {
                showDate: new Date(),
                startingDoW: 1,
                editingEntry: false,

                localevents:[],

                //Current vaules of the input fields
                current_event: {
                    title: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    description: '',
                },

                //Date that has been selected
                selectedDate: {
                    id: '',
                    title: 'Event details',
                    startDate: Date(),
                    endDate: Date(),
                    description: "select an event",
                },

                //Format how to set the new Date
                options: {
                    format: 'YYYY-MM-DD',
                    useCurrent: false,
                }
            }
        },
        components: {
            CalendarView,
            CalendarViewHeader,
            datePicker
        },
        methods: {

            //VUEX ACTIONS
            ...mapActions(["fetchEvents","addEventAction", "deleteEvent", "updateEvent"]),

            //VUEX MUTATIONS
            ...mapMutations(['addEventMut']),


            setShowDate(d) {
                this.showDate = d;
            },

            onClickItem(e) {
                // eslint-disable-next-line no-console
                console.log("Item Clicked: " + e.title);
                this.selectedDate.id = e.id;
                this.selectedDate.title = e.title;
                this.selectedDate.startDate = e.startDate;
                this.selectedDate.endDate = e.endDate;
                this.selectedDate.description = this.getEventByID(e.id).description;
            },

            resetInputFields(current_event) {
                current_event.title = '';
                current_event.endDate = new Date();
                current_event.startDate = new Date();
                current_event.description = ''
            },

            resetSelectedDate(selectedDate) {
                selectedDate.id = '';
                selectedDate.title = 'Event details';
                selectedDate.startDate = Date();
                selectedDate.endDate = Date();
                selectedDate.description = "select an event";
            },

            updateSelectedEvent() {
                this.editingEntry=false;
                this.updateEvent(this.selectedDate);
            },

            setLocalEvents(value) {
                this.localevents = Object.assign([], value)
            },

        },
        computed: {
            ...mapGetters(["allEvents", "getEventByID"]),
        },
        watch: {
            allEvents: 'setLocalEvents',
        },
        created() {
            this.fetchEvents();
            this.localevents = Object.assign([], this.allEvents);
        }
    }
</script>

<style scoped>

    .eventlabel {
        text-align: left;
        margin: 5px;
        color: #FF6852;
        font-weight: bold;
    }

    .descriptiontext {
        text-align: left;
        margin: 5px;
    }

    .calendardiv {
        height: 500px;
    }

</style>