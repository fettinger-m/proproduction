<template>
    <div id="documents">
        <NavBar
                current-page="documents"
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
    }
</script>

<style>
</style>
