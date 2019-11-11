<template>
    <div>
        <h1>Calendar</h1>
        <v-app id="inspire">
            <v-sheet height="500">
                <v-calendar
                        type="month"
                        now="2019-01-08"
                        value="2019-01-08"
                        :events="events"
                ></v-calendar>
            </v-sheet>
        </v-app>
    </div>
</template>

<script>
    import events from "../events.json";

    export default {
        name: "Calendar",
        data(){
            return {
                events_data: [],
            }

        },
        mounted(){
            this.events_data=events;
        }
    }
</script>

<style scoped>

</style>