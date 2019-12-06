<template>
    <div id="singleproject">

        <!-- Heading -->
        <h1>{{projectname}}</h1>

        <b-container id="categorysID">
            <b-col v-for="(category_element, index) in category_elements" v-bind:key="index">
                <CategoryElement v-bind:category_element="category_element"/>
                <hr>
            </b-col>
        </b-container>
    </div>
</template>

<script>
    import CategoryElement from "@/components/CategoryElement";

    export default {
        name: "SingleProjectView",
        components: {CategoryElement},
        props: {
            projectname: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                category_elements: [
                    {
                        category_icon: 'file-alt',
                        category_name: 'Documents & Script',
                        category_desc: 'create documents and scripts',
                        category_amount: 1,
                        category_hover: false
                    },
                    {
                        category_icon: 'clipboard-list',
                        category_name: 'Shotlist & Storyboard',
                        category_desc: 'create a shotlist or storyboard to plan your shoot',
                        category_amount: 5,
                        category_hover: false
                    },
                    {
                        category_icon: 'image',
                        category_name: 'Moodboard',
                        category_desc: 'add any pictures to a feed to get a feel of the look of your film',
                        category_amount: 9,
                        category_hover: false
                    },
                    {
                        category_icon: 'map-marker-alt',
                        category_name: 'Locations',
                        category_desc: 'add all locations where you are going to shoot',
                        category_amount: 0,
                        category_hover: false
                    },
                    {
                        category_icon: 'address-book',
                        category_name: 'Contacts',
                        category_desc: 'add all people and their details that take part in your project',
                        category_amount: 0,
                        category_hover: false
                    },
                    {
                        category_icon: 'paperclip',
                        category_name: 'Media Library',
                        category_desc: 'upload important files to access them from everywhere',
                        category_amount: 10,
                        category_hover: false
                    },
                ],
            }
        }
    }
</script>

<style scoped>
    #categorysID {
        padding: 20px;
    }
</style>