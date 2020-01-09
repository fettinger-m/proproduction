<!-- This Component displays the Name of the Project the User is in-->

<template>
    <div>
        <h1>{{ projectname }}</h1>
    </div>
</template>


<script>
    export default {
        name: "ProjectNameTitle",
        data() {
            return {
                projectname: "TestProject"
            }
        },
    }
</script>

<style scoped>

</style>