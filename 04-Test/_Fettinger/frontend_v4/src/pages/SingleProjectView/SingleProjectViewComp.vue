<template>
    <div id="singleproject">

        <h1> {{ this.selectedproject.project_name }} </h1>

        <b-container id="categorysID">
            <b-col v-for="(category_element, index) in category_elements" v-bind:key="index">
                <CategoryElement
                        v-bind:category_element="category_element"
                        v-bind:selectedproject="selectedproject"
                />
                <hr>
            </b-col>
        </b-container>
    </div>
</template>

<script>

    import CategoryElement from "@/pages/SingleProjectView/CategoryElement";
    import {mapGetters} from "vuex";

    export default {
        name: "SingleProjectView",
        components: {
            CategoryElement
        },
        data() {
            return {
                id: 0,
                selectedproject: {},
                category_elements: [
                    {
                        category_icon: 'file-alt',
                        category_name: 'Documents & Script',
                        category_desc: 'create documents and scripts',
                        category_amount: 0,
                        category_hover: false,
                        category_route: 'documents'
                    },
                    {
                        category_icon: 'clipboard-list',
                        category_name: 'Shotlist & Storyboard',
                        category_desc: 'create a shotlist or storyboard to plan your shoot',
                        category_amount: 0,
                        category_hover: false,
                        category_route: 'shotlist'
                    },
                    {
                        category_icon: 'images',
                        category_name: 'Moodboard',
                        category_desc: 'add any pictures to a feed to get a feel of the look of your film',
                        category_amount: 0,
                        category_hover: false,
                        category_route: 'moodboard'
                    },
                    {
                        category_icon: 'map-marker-alt',
                        category_name: 'Locations',
                        category_desc: 'add all locations where you are going to shoot',
                        category_amount: 0,
                        category_hover: false,
                        category_route: 'location'
                    },
                    {
                        category_icon: 'address-book',
                        category_name: 'Contacts',
                        category_desc: 'add all people and their details that take part in your project',
                        category_amount: 0,
                        category_hover: false,
                        category_route: 'contacts'
                    },
                    {
                        category_icon: 'paperclip',
                        category_name: 'Media Library',
                        category_desc: 'upload important files to access them from everywhere',
                        category_amount: 0,
                        category_hover: false,
                        category_route: 'media'
                    },
                ],
            }
        },
        methods: {},
        computed: {
            ...mapGetters(["allProjects","getProjectByID"]),
        },
        mounted() {
            this.id = parseInt(sessionStorage.getItem('sessionProjectID'));
            this.selectedproject = this.getProjectByID(this.id);

            //Read the lenght of each category elements
            if(this.selectedproject.documents != null){
                this.category_elements[0].category_amount = this.selectedproject.documents.length;
            }
            if(this.selectedproject.shotlists != null){
                this.category_elements[1].category_amount = this.selectedproject.shotlists.length;
            }
            if(this.selectedproject.moodboards != null){
                this.category_elements[2].category_amount = this.selectedproject.moodboards.length;
            }
            if(this.selectedproject.locations != null){
                this.category_elements[3].category_amount = this.selectedproject.locations.length;
            }
            if(this.selectedproject.contacts != null){
                this.category_elements[4].category_amount = this.selectedproject.contacts.length;
            }
            if(this.selectedproject.media != null){
                this.category_elements[5].category_amount = this.selectedproject.media.length;
            }
        },
        created() {

        },
    }
</script>

<style scoped>
    #categorysID {
        padding: 20px;
    }
</style>