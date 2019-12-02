<!-- https://www.npmjs.com/package/vueye-datatable https://www.youtube.com/watch?v=3isA2Sl7MyQ&t=514s -->

<template>
    <div>
        <h1>Projects</h1>
        <vueye-table
                checkable
                tableStyle="bordered"
                :theme="theme3"
                :per-page-values="[5,10,25,50]"
                title="Projects"
                :rows_data="project_data"
        ></vueye-table>
    </div>

</template>

<script>
    import VueyeTable from "vueye-datatable";
    import projects from "../projects.json";


    export default {
        name: 'DataTableTest',
        data() {
            return {
                project_attr: ["id", "name", "theme", "sate", "todo", "priority"],
                project_data: [],
                theme3: {
                    backgroundColor: "#8F8F8F",
                    color: "#FFFFFF",
                    rows: {
                        borderBottom: "1px solid #000000"
                    },
                    rowClick: {
                        backgroundColor: "#494949"
                    }
                }
            };
        },
        components: {
            VueyeTable
        },
        mounted(){
          this.project_data=projects;
        }

    }
</script>


<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
