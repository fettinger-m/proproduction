<template>
  <div id="documents">
    <NavBar
            current-page="documents"
            v-bind:project_element="project_element"
    ></NavBar>
    <h2>Documents & Scripts</h2>
    <DocumentMenu></DocumentMenu>
    <DocumentPlugin></DocumentPlugin>


  </div>
</template>

<script>

import NavBar from "../components/Layout/NavBar";
import DocumentPlugin from "@/pages/Documents/DocumentPlugin";
import DocumentMenu from "@/pages/Documents/DocumentMenu";

export default {
  name: 'documents',
  components: {
    DocumentMenu,
    DocumentPlugin,
    NavBar,
  },
  props: {
    project_element: {
      type: Object,
      required: true
    }
  },
}
</script>

<style>
</style>
