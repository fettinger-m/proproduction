<template>
    <div id="location">
        <NavBar current-page="location"></NavBar>
        <FilePath></FilePath>
        <ProjectNameTitle></ProjectNameTitle>
        <h2>Locations</h2>
        <b-container>
            <b-row>
                <b-col>
                    <GoogleMapsTest
                            @update-location="updateLocation"
                            :disable-field="disableField"
                            ref="googleMap"
                    ></GoogleMapsTest>
                </b-col>

                <b-col>
                    <LocationTable
                            :locations="locations"
                            @change-center="changeCenter"
                    ></LocationTable>

                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

    import NavBar from "../components/Layout/NavBar";
    import FilePath from "../components/Layout/FilePath";
    import ProjectNameTitle from "../components/Layout/ProjectNameTitle";
    import GoogleMapsTest from "../pages/Locations/GoogleMapsTest";
    import LocationTable from "../pages/Locations/LocationTable";

    export default {
        name: 'location',
        components: {
            LocationTable,
            NavBar,
            FilePath,
            ProjectNameTitle,
            GoogleMapsTest
        },
        methods: {
            updateLocation(e) {
                //let arr = e.formatted_address.split(", ");
                // eslint-disable-next-line no-console
                console.log(e);
                let arr = e.address_components;
                var address = {};

                this.location = arr;

                if (arr.some(location => location.types[0] === 'street_number')) {
                    address.street_number = (arr.find(location => location.types[0] === 'street_number')).long_name;
                } else {
                    address.street_number = null
                }
                if (arr.some(location => location.types[0] === 'route')) {
                    address.route = (arr.find(location => location.types[0] === 'route')).long_name;
                } else {
                    address.route = null
                }
                if (arr.some(location => location.types[0] === 'locality')) {
                    address.locality = (arr.find(location => location.types[0] === 'locality')).long_name;
                } else {
                    address.locality = null
                }
                if (arr.some(location => location.types[0] === 'country')) {
                    address.country = (arr.find(location => location.types[0] === 'country')).long_name;
                } else {
                    address.country = null
                }
                if (arr.some(location => location.types[0] === 'postal_code')) {
                    address.postal_code = (arr.find(location => location.types[0] === 'postal_code')).long_name;
                } else {
                    address.postal_code = null
                }

                address.name = e.name;

                address.lat = e.geometry.location.lat();
                address.lng = e.geometry.location.lng();

                this.locations.data.push(address);
                // eslint-disable-next-line no-console
                console.log(address)
            },
            changeCenter(e) {
                this.$refs.googleMap.changeCenter(e.lat, e.lng)
            },
            lockButtons() {
                // eslint-disable-next-line no-console
                console.log("Hello");
                if (this.disableField === true) {
                    this.disableField = false
                } else {
                    this.disableField = true
                }
            }
        },
        data() {
            return {
                location: null,
                locations: {
                  data: []
                },
                disableField: false,
            }
        },

    }
</script>

<style>


</style>
