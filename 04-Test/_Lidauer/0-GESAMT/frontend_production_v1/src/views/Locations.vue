<template>
  <div id="location">
    <NavBar current-page="location"></NavBar>
    <FilePath></FilePath>
    <ProjectNameTitle></ProjectNameTitle>
    <h2>Locations</h2>
    <b-container>
      <b-row>
        <b-col cols="4">
          <b-card
                  tag="article"
                  style="max-width: 20rem;"
                  class="mb-2"
                  no-body
          >
            <GoogleMapsTest class="card-img-top"></GoogleMapsTest>
          </b-card>
        </b-col>
        <b-col cols="4">
          <b-card
                  tag="article"
                  style="max-width: 20rem;"
                  class="mb-2"
                  no-body
          >
            <GoogleMapsTest class="card-img-top"></GoogleMapsTest>
          </b-card>
        </b-col>
        <b-col cols="4">
          <b-card
                  tag="article"
                  style="max-width: 20rem;"
                  class="mb-2"
                  no-body
          >
            <GoogleMapsTest class="card-img-top"></GoogleMapsTest>
          </b-card>
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

  export default {
    name: 'location',
    components: {
      NavBar,
      FilePath,
      ProjectNameTitle,
      GoogleMapsTest
    }
  }
</script>

<style>


</style>
