<template>
    <div>
        <gmap-map
                :center="center"
                :zoom="12"
                :options="optionsReal"
                style="width:100%;  height:35rem;"

        >
            <gmap-marker
                    :key="index"
                    v-for="(m, index) in allLocations"
                    :position="m.marker"
                    @click="center=m.marker"
            ></gmap-marker>
        </gmap-map>
        <div class="m-3">
            <b-input-group>
                <gmap-autocomplete
                        @place_changed="setPlace"
                        class="form-control"
                        :disabled="disableField"
                        :options="{
                            radius: 10000,
                            location: currentLocation
                        }"
                >
                </gmap-autocomplete>
                <b-input-group-append>
                    <b-btn @click="addMarker" variant="primary" :disabled="disableField">Add</b-btn>
                </b-input-group-append>
            </b-input-group>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from "vuex";

    export default {
        name: "GoogleMap",
        data() {
            return {
                // default to Montreal to keep it simple
                // change this to whatever makes sense
                center: {lat: 45.508, lng: -73.587},
                markers: [],
                places: [],
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
        mounted() {
            this.geolocate();
        },

        methods: {
            ...mapActions(["addLocation", "fetchLocations"]),
            ...mapMutations(['addProjectRow']),
            // receives a place object via the autocomplete component
            setPlace(place) {
                this.currentPlace = place;
            },
            addMarker() {
                if (this.currentPlace) {
                    this.$emit('update-location', this.currentPlace);

                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng()
                    };
                    this.markers.push({position: marker});
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;
                }
                this.fetchLocations()
            },
            changeCenter(lat, lng) {
                this.center = {
                    lat: lat,
                    lng: lng
                };
            },
            geolocate: function () {
                navigator.geolocation.getCurrentPosition(position => {
                    this.currentLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.center = this.currentLocation;
                });
            },
        },
        props: {
            disableField: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            optionsReal() {
                let options = this.options;
                options.draggable = !this.disableField;

                return options
            },
            ...mapGetters(["allLocations"]),
        },
        created() {
            this.fetchLocations();
        },
    };
</script>