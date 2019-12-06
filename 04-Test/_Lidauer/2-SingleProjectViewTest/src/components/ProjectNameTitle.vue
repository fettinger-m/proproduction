<!-- This Component displays the Name of the Project the User is in-->

<template>
    <div>
        <h1>{{ projectnametitle }}</h1>
    </div>
</template>


<script>

    export default {
        name: "ProjectNameTitle",
        data: function () {
            return {
                projectnametitle: 'here comes to project name'
            }
        },


        //??? How to get projectname from NavBar.vue
        /*
        watch: {
            msg: function () {
                this.projectnametitle = NavBar.methods.updateProjectName();
                //this.projectnametitle.push(this.msg());
            }
        }
        */
    }
</script>

<style scoped>

</style>