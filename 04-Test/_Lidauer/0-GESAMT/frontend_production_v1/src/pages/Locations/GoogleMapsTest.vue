<template>
    <div>
        <gmap-map
                :center="center"
                :zoom="12"
                :options="options"
                style="width:100%;  height:15rem;"

        >
            <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="center=m.position"
            ></gmap-marker>
        </gmap-map>
        <div class="m-3">
            <b-input-group>
                    <gmap-autocomplete
                            @place_changed="setPlace"
                            class="form-control">
                    </gmap-autocomplete>
                <b-input-group-append>
                    <b-btn @click="addMarker" variant="primary">Add</b-btn>
                </b-input-group-append>
            </b-input-group>
        </div>
    </div>
</template>

<script>
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
                }
            };
        },

        mounted() {
            this.geolocate();
        },

        methods: {
            // receives a place object via the autocomplete component
            setPlace(place) {
                this.currentPlace = place;
            },
            addMarker() {
                if (this.currentPlace) {
                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng()
                    };
                    this.markers.push({position: marker});
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;
                }
            },
            geolocate: function () {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
            }
        }
    };
</script>