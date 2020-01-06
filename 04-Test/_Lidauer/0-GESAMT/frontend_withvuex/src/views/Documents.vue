<template>
    <div id="documents">
        <NavBar
                current-page="documents"
                v-bind:project_element="project_element"
        ></NavBar>
        <h2 class="categorytitle">Documents & Scripts</h2>


        <DocumentComp/>


    </div>
</template>

<script>

    import NavBar from "../components/Layout/NavBar";
    import DocumentComp from "@/pages/Documents/DocumentComp";

    export default {
        name: 'documents',
        components: {
            DocumentComp,
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
