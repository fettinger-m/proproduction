<!-- This Component displays the Name of the Project the User is in-->

<template>
    <div>
        <h1>{{ project_element.project_name }}</h1>
    </div>
</template>


<script>
    export default {
        name: "ProjectNameTitle",

        props: {
            project_element: {
                type: Object,
                required: false
            }
        }
    }
</script>

<style scoped>

</style>