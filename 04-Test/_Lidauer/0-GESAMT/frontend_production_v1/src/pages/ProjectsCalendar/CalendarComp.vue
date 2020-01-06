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
                        <div class="eventlable">Add a new Event</div>
                        <b-row>
                            <!-- Title -->
                            <b-col class="m-1">
                                <b-input
                                        v-model="currentTitle"
                                        placeholder="event name"
                                ></b-input>
                            </b-col>
                        </b-row>

                        <b-row>
                            <!-- Description -->
                            <b-col class="m-1">
                                <b-input
                                        v-model="currentURL"
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
                                        v-model="currentStartDate"
                                        :config="options"></date-picker>
                            </b-col>

                            <!-- End Date -->
                            <b-col class="m-1">
                                <label>End Date: </label>
                            </b-col>
                            <b-col class="m-1" md="4">
                                <date-picker
                                        v-model="currentEndDate"
                                        :config="options"></date-picker>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col cols="9">

                            </b-col>
                            <!-- Add Event Button -->
                            <b-col>
                                <b-button
                                        @click="
                                        addEvent(currentStartDate, currentEndDate, currentTitle, currentURL);
                                        currentTitle = ''; currentEndDate = new Date(); currentStartDate = new Date(); currentDescription = '' "
                                        :disabled="currentTitle.toString() === ''"
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
                        <div class="eventlable">{{ this.selectedDate.title }}</div>
                        <div class="descriptiontext">
                            {{ this.selectedDate.url }}
                        </div>
                    </b-card>
                </b-col>
            </b-row>

            <p></p>

            <!-- Calendar display -->
            <calendar-view
                    :show-date="showDate"
                    :events="events"
                    class="theme-default holiday-us-traditional holiday-us-official"
                    @click-event="onClickItem"
                    :startingDayOfWeek="startingDoW"
                    wrap-event-title-on-hover
            >
                <calendar-view-header
                        slot="header"
                        slot-scope="t"
                        :header-props="t.headerProps"
                        @input="setShowDate"
                />

            </calendar-view>


        </b-container>
    </div>

</template>

<script>

    import {CalendarView, CalendarViewHeader} from "vue-simple-calendar"
    // The next two lines are processed by webpack. If you're using the component without webpack compilation,
    // you should just create <link> elements for these. Both are optional, you can create your own theme if you prefer.
    require("vue-simple-calendar/static/css/default.css")
    require("vue-simple-calendar/static/css/holidays-us.css")
    // Import required dependencies
    import 'bootstrap/dist/css/bootstrap.css';
    // Import this component
    import datePicker from 'vue-bootstrap-datetimepicker';
    // Import date picker css
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';


    export default {
        name: "CalendarComp",
        data: function () {
            return {
                showDate: new Date(),
                startingDoW: 1,

                //Current vaules of the input fields
                currentTitle: '',
                currentStartDate: new Date(),
                currentEndDate: new Date(),
                currentURL: '',

                //Date that has been selected
                selectedDate: {
                    id: '',
                    startDate: Date(),
                    endDate: Date(),
                    title: 'Event details',
                    url: "select an event",
                },

                //Format how to set the new Date
                options: {
                    format: 'YYYY-MM-DD',
                    useCurrent: false,
                }
            }
        },
        props: {
            events: {
                type: Array,
                required: true
            },

        },
        components: {
            CalendarView,
            CalendarViewHeader,
            datePicker
        },
        methods: {
            setShowDate(d) {
                this.showDate = d;
            },

            //Adds a new event after the user clicks on the Button
            addEvent(startD, endD, title, description) {
                this.events.push({
                    id: '',
                    startDate: new Date(startD),
                    endDate: new Date(endD),
                    title: title,
                    url: description,
                });
            },

            onClickItem(e) {
                // eslint-disable-next-line no-console
                console.log("Item Clicked: " + e.title);

                this.selectedDate.title = e.title;
                this.selectedDate.url = e.url;
                this.selectedDate.startDate = e.startDate;
                this.selectedDate.endDate = e.endDate;
            },

        }
    }
</script>

<style scoped>

    .eventlable {
        text-align: left;
        margin: 5px;
        color: #FF6852;
        font-weight: bold;
    }

    .descriptiontext {
        text-align: left;
        margin: 5px;
    }

    wrap-event-title-on-hover {
        color: red;
    }
</style>