<template>
  <div id="location">
    <NavBar current-page="location"></NavBar>
    <h2>Locations</h2>
    <b-container>
      <b-row>
        <b-col>
          <LocationMap
          ></LocationMap>
        </b-col>
        <b-col>
          <LocationTable></LocationTable>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import NavBar from "../components/Layout/NavBar";
  import LocationMap from "../pages/Locations/LocationMap";
  import LocationTable from "../pages/Locations/LocationTable";

  export default {
    name: 'location',
    components: {
      LocationTable,
      NavBar,
      LocationMap
    }
  }
</script>