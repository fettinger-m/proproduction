<template>
    <div id="allStars">
        <font-awesome-icon
                id="star1"
                :icon="['fas', 'star']"
                @click="starClicked(1)"
        />
        <font-awesome-icon
                id="star2"
                :icon="['fas', 'star']"
                @click="starClicked(2)"
        />
        <font-awesome-icon
                id="star3"
                :icon="['fas', 'star']"
                @click="starClicked(3)"
        />
        <font-awesome-icon
                id="star4"
                :icon="['fas', 'star']"
                @click="starClicked(4)"
        />
        <font-awesome-icon
                id="star5"
                :icon="['fas', 'star']"
                @click="starClicked(5)"
        />

    </div>
</template>

<script>
    export default {
        name: "PriorityStars",
        data() {
            return {}
        },
        props: {
            project_elements: {
                type: Array,
                required: true
            },
            project_element: {
                type: Object,
                required: true
            }
        },
        methods: {
            starClicked(index, projectname) {
                if (index == 1) {
                    // eslint-disable-next-line no-console
                    console.log('1. star clicked from ' + projectname)

                } else if (index == 2) {
                    // eslint-disable-next-line no-console
                    console.log('2. star clicked from ' + projectname)
                } else if (index == 3) {
                    // eslint-disable-next-line no-console
                    console.log('3. star clicked from ' + projectname)
                } else if (index == 4) {
                    // eslint-disable-next-line no-console
                    console.log('4. star clicked from ' + projectname)
                } else if (index == 5) {
                    // eslint-disable-next-line no-console
                    console.log('5. star clicked from ' + projectname)
                }

            }
        }
    }
</script>

<style scoped>

    #allStars {

    }

    #staryellow {
        color: yellow;
    }

    #stargrey {
        color: grey;
    }


</style>