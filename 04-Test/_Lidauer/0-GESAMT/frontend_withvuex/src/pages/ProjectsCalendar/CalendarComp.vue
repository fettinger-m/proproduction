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
                                        :disabled="current_event.title.toString() === ''"
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
                        <!-- Title-->
                        <b-row>
                            <b-col>
                                <div class="eventlabel">{{ this.selectedDate.selected_title }}</div>
                            </b-col>
                            <b-col>
                                <!-- Buttons -->
                                <div>
                                    <!-- Edit Button -->
                                    <b-button
                                            variant="outline"
                                    >
                                        <font-awesome-icon :icon="['fas', 'pen']"/>
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
                                            Delete this event "{{ selectedDate.selected_title }}"?
                                        </template>
                                        <b-button variant="outline-danger" block
                                                  @click="$bvModal.hide('deleteeventmodal')">Delete
                                        </b-button>
                                        <b-button variant="outline-warning" block
                                                  @click="$bvModal.hide('deleteeventmodal')">Cancle
                                        </b-button>
                                    </b-modal>
                                </div>
                            </b-col>
                        </b-row>


                        <div class="descriptiontext">
                            {{ this.selectedDate.selected_id }}
                            {{ this.selectedDate.selected_description }}
                        </div>

                    </b-card>
                </b-col>
            </b-row>

            <p></p>

            <div class="calendardiv">
                <!-- Calendar display -->
                <calendar-view
                        :show-date="showDate"
                        :events="allEvents"
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

                //Current vaules of the input fields
                current_event: {
                    title: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    description: '',
                },

                //Date that has been selected
                selectedDate: {
                    selected_id: '',
                    selected_startDate: Date(),
                    selected_endDate: Date(),
                    selected_title: 'Event details',
                    selected_description: "select an event",
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
            ...mapActions(["fetchEvents", "addEventAction"]),

            //VUEX MUTATIONS
            ...mapMutations(['addEventMut']),


            setShowDate(d) {
                this.showDate = d;
            },

            onClickItem(e) {
                // eslint-disable-next-line no-console
                console.log("Item Clicked: " + e.title);
                this.selectedDate.selected_id = e.id;
                this.selectedDate.selected_title = e.title;
                this.selectedDate.selected_description = e.description;
                this.selectedDate.selected_startDate = e.startDate;
                this.selectedDate.selected_endDate = e.endDate;
            },

            resetInputFields(current_event) {
                current_event.title = '';
                current_event.endDate = new Date();
                current_event.startDate = new Date();
                current_event.description = ''
            }
        },
        computed: {
            ...mapGetters(["allEvents"]),

        },
        created() {
            this.fetchEvents();

        },
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