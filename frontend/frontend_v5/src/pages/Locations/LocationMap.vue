<template>
    <div>
        <gmap-map
                :center="center"
                :zoom="12"
                :options="options"
                style="width:100%;  height:35rem;"

        >
            <gmap-marker
                    :key="index"
                    v-for="(m, index) in selectedproject.locations"
                    :position="m.marker"
                    @click="center=m.marker"
            ></gmap-marker>
        </gmap-map>
        <div class="m-3">
            <b-input-group>
                <gmap-autocomplete
                        @place_changed="setPlace"
                        class="form-control"
                        :options="{
                            radius: 10000,
                            location: currentLocation
                        }"
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
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "GoogleMap",
        data() {
            return {
                selectedproject: {},
                projectId: '',
                center: {lat: 45.508, lng: -73.587},
                currentPlace: null,
                options: {
                    mapTypeControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                    fullscreenControl: false,
                    draggable: true
                },
                currentLocation: null
            };
        },
        methods: {
            ...mapActions(["addLocation"]),
            ...mapMutations(['addProjectRow']),
            //Autocomplete change Place
            setPlace(place) {
                this.currentPlace = place;
            },
            addMarker() {
                if (this.currentPlace) {

                    let addr = this.currentPlace.address_components;
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

                    // eslint-disable-next-line no-console
                    console.log(location);

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
            ...mapGetters(["allLocations","getProjectByID"])
        },
        mounted() {
            this.geoLocate();
            this.projectId = sessionStorage.getItem('sessionProjectID');
            this.selectedproject = this.getProjectByID(this.projectId);

            this.$root.$on('changeCenter', (e) => {


                this.center.lat = e.lat;
                this.center.lng = e.lng;
// eslint-disable-next-line no-console
                console.log(this.center);

            })
        },
    };
</script>