<template>
    <div>
        <!-- GOOGLE MAP with Markers -->
        <gmap-map
                :center="center"
                :zoom="12"
                :options="options"
                class="gmap"
        >
            <gmap-marker
                    :key="index"
                    v-for="(m, index) in getLocations"
                    :position="m.marker"
                    @click="changeCenter(m.marker)"
            ></gmap-marker>
        </gmap-map>

        <!-- INPUT field for Locations -->
        <div class="mt-3">
            <b-input-group>
                <gmap-autocomplete
                        @place_changed="setPlace"
                        class="form-control"
                >
                </gmap-autocomplete>

                <b-input-group-append>
                    <b-btn @click="addMarker" variant="primary">Add</b-btn>
                </b-input-group-append>
            </b-input-group>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "GoogleMap",
        data() {
            return {

                //Current Center, gets adjusted to local place after site loads, current basic value: Wels
                center: {lat: 48.16542, lng: 14.03664},

                //Location in the Input Field
                currentPlace: null,

                //Google Map options
                options: {
                    mapTypeControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                    fullscreenControl: false,
                    draggable: true
                },

                //Current Location
                currentLocation: null
            };
        },
        methods: {
            ...mapActions(["addLocation", "fetchProjects"]),

            //Change Center of Google Map
            changeCenter: function(e) {
                this.center.lat = e.lat;
                this.center.lng = e.lng;
            },

            //Autocomplete change Place
            setPlace(place) {
                this.currentPlace = place;
            },

            //Gets triggered by add button
            addMarker() {
                if (this.currentPlace) {

                    //addr gets the address components from Google
                    let addr = this.currentPlace.address_components;

                    //Local loaction Object
                    let location = {};

                    //---Build Location Object for Database

                    //Street Number
                    if (addr.some(location => location.types[0] === 'street_number')) {
                        location.street_number = (addr.find(location => location.types[0] === 'street_number')).long_name;
                    } else {
                        location.street_number = null
                    }
                    //Route
                    if (addr.some(location => location.types[0] === 'route')) {
                        location.route = (addr.find(location => location.types[0] === 'route')).long_name;
                    } else {
                        location.route = null
                    }
                    //Locality
                    if (addr.some(location => location.types[0] === 'locality')) {
                        location.locality = (addr.find(location => location.types[0] === 'locality')).long_name;
                    } else {
                        location.locality = null
                    }
                    //Country
                    if (addr.some(location => location.types[0] === 'country')) {
                        location.country = (addr.find(location => location.types[0] === 'country')).long_name;
                    } else {
                        location.country = null
                    }
                    //Postal Code
                    if (addr.some(location => location.types[0] === 'postal_code')) {
                        location.postal_code = (addr.find(location => location.types[0] === 'postal_code')).long_name;
                    } else {
                        location.postal_code = null
                    }
                    //Name
                    location.name = this.currentPlace.name;
                    //Marker
                    let marker = {};
                    marker.lat = this.currentPlace.geometry.location.lat();
                    marker.lng = this.currentPlace.geometry.location.lng();
                    location.marker = marker;

                    //Set new Center
                    this.center = marker;

                    //Create a payload object for VUEX
                    let payload = {
                        projectId: this.projectId,
                        location: location
                    };

                    //VUEX Action Call
                    this.addLocation(payload);

                    //Reload VueTable-2
                    this.$root.$emit('reloadLocationTable');
                }
            },
            //Get Real-Life Location
            geoLocate: function () {
                navigator.geolocation.getCurrentPosition(position => {
                    this.currentLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.center = this.currentLocation;
                });
            },

        },
        computed: {
            ...mapGetters(["allLocations","getProjectByID"]),

            projectId() {
                return sessionStorage.getItem('sessionProjectID');
            },

            getLocations() {
                if(this.getProjectByID(sessionStorage.getItem('sessionProjectID')) == null) {
                    this.fetchProjects();
                    return 0
                } else {
                    return this.getProjectByID(sessionStorage.getItem('sessionProjectID')).locations
                }
            }
        },
        mounted() {
            this.geoLocate();

            this.$root.$on('changeCenter', (e) => {
                this.changeCenter(e);
            })
        },
    };
</script>

<style scoped>
    /* Google Map style */
    .gmap {
        width: 100%;
        height: 30rem;
    }
</style>