<template>
    <div @click="categoryOnClick(category_element.category_name)" >

        <div id="categoryInActive" class="rounded-lg">
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
                    <h3 id="title"> {{ category_element.category_name }} </h3>
                    <!-- Beschreibung -->
                    <div>
                        {{ category_element.category_desc }}
                    </div>
                </b-col>
                <b-col>
                    <!-- Anazhl an Elementen drinnen -->
                    <div>
                        {{ category_element.category_amount }}
                    </div>
                </b-col>
            </b-row>
        </div>
        <hr>
    </div>
</template>

<script>
    export default {
        name: "CategoryElement",
        props: {
            category_element: {
                type: Object,
                required: true
            }
        },
        methods: {
            categoryOnClick(category_name) {
                // eslint-disable-next-line no-console
                console.log('Open category: ' + category_name)

                //TODO: Open new window
            }
        }
    }
</script>

<style scoped>
    #title {
        color: black;
    }

    #icon {
        color: #FF6852;
        font-size: 35px;
    }

    #categoryInActive {
        background-color: lightgrey;
    }

    .activeToClick {
        background-color: orange;

    }

</style>