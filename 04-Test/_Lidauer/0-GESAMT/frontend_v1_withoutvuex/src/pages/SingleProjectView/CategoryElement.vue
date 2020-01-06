<template>

    <div class="wholeComponent" @click="categoryOnClick(category_element.category_name, category_element.category_route)" >

        <div>
            <b-row
                    @mouseover="category_element.category_hover = true"
                    @mouseleave="category_element.category_hover = false"
                    :class="{ activeToClick: category_element.category_hover }"
            >
                <b-col>
                    <!-- Zeichen -->
                    <font-awesome-icon id="icon" :icon="['fas', category_element.category_icon ]" />
                </b-col>
                <b-col cols="8">
                    <!-- Name -->
                    <h3 id="titleID"> {{ category_element.category_name }} </h3>
                    <!-- Beschreibung -->
                    <div id="descrID">
                        {{ category_element.category_desc }}
                    </div>
                </b-col>
                <b-col>
                    <!-- Anazhl an Elementen drinnen -->
                    <div id="amountID">
                        {{ category_element.category_amount }}
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CategoryElement",
        props: {
            category_element: {
                type: Object,
                required: true
            },
            project_element: {
                type: Object,
                required: true
            }
        },
        methods: {

            categoryOnClick(category_name, category_route) {
                // eslint-disable-next-line no-console
                console.log('Open category: ' + category_name)

                this.$router.push({name: category_route, params: { project: 'ToDoProjectname' }})   //todo
            }
        }
    }
</script>

<style scoped>
    .wholeComponent {
    }

    #titleID {
        color: black;
    }

    #icon {
        color: #FF6852;
        font-size: 35px;
        margin-top: 12px;
    }

    #descrID {
        color: #777777;
    }

    #amountID{

    }

    .activeToClick {
        background-color: lightgrey;
        border-radius: 7px;
    }




</style>