<!-- Example:
https://github.com/richardtallent/vue-simple-calendar
-->

<template>
    <div id="app">
        <h1>Calendar</h1>

        <b-container>
            <b-row>

                <b-col>
                    <!-- Calendar entry Input -->
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
                                        v-model="currentDescription"
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
                                        addEvent(currentStartDate, currentEndDate, currentTitle, currentDescription);
                                        currentTitle = ''; currentEndDate = new Date(); currentStartDate = new Date(); currentDescription = '' "
                                        :disabled="currentTitle.toString() === ''"
                                >
                                    Add Event
                                </b-button>
                            </b-col>

                        </b-row>


                    </b-card>
                </b-col>
                <b-col>
                    <!-- Infos zu ausgewählem Element-->
                    <b-card>
                        <!-- Todo: Event Name-->
                        <div class="eventlable">Event {{ this.selectedDate.title }} description</div>
                        <div class="descriptiontext">
                            {{ this.selectedDate.description }}
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

        <p></p>


        <!-- Calendar display -->
        <calendar-view
                :show-date="showDate"
                :events="events"
                class="theme-default holiday-us-traditional holiday-us-official"
                @click-date="onClickDate"
        >
            <calendar-view-header
                    slot="header"
                    slot-scope="t"
                    :header-props="t.headerProps"
                    @input="setShowDate"
            />
        </calendar-view>

        <Footer></Footer>


    </div>

</template>

<script>

    import {CalendarView, CalendarViewHeader} from "vue-simple-calendar"
    import Footer from "@/components/Layout/Footer";
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

                //Current vaules of the input fields
                currentTitle: '',
                currentStartDate: new Date(),
                currentEndDate: new Date(),
                currentDescription: '',

                selectedDate: {
                    id: '',
                    startDate: Date(),
                    endDate: Date(),
                    title: '',
                    description: '',
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
            Footer,
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
                    description: description
                });
            },

            onClickDate(d) {
                // eslint-disable-next-line no-console
                console.log('Date clicked');
                this.selectedDate = { [d.toISOString().substring(0,10)]: ["ClassForSelectedDate"] }
            }
        }
    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #2c3e50;
        height: 50vh;
        width: 70vw;
        margin-left: auto;
        margin-right: auto;
    }

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
</style>