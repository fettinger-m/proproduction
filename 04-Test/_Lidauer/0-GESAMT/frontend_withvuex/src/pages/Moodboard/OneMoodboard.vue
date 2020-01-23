<template>
    <div>
        <!-- Bild hinzufügen-->
        <div>
            <b-row align-h="end">
                <b-col>
                    <!-- Bild einlesen-->
                    <b-form-file
                            v-model="file"
                            accept="image/*"
                            placeholder="Choose a image or drop it here..."
                            drop-placeholder="Drop image here..."
                    ></b-form-file>
                </b-col>
                <b-col cols="3">
                    <div class="float-right mb-3">
                        <!-- Button to Add Picture-->
                        <b-button
                                type="button"
                                variant="outline-primary"
                                class="float-right"
                        >
                            <font-awesome-icon :icon="['fas', 'plus-square']"/>
                            Add Picture
                        </b-button>
                    </div>
                </b-col>
            </b-row>
        </div>

        <grid-layout
                :layout.sync="layout"
                :col-num="12"
                :row-height="30"
                :is-draggable="true"
                :is-resizable="true"
                :is-mirrored="false"
                :vertical-compact="true"
                :margin="[5, 5]"
                :use-css-transforms="true"
                :prevent-collision="false"
                :responsive="false"
        >

            <grid-item v-for="item in layout"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i"
                       :key="item.i"
                       class="imagestyle"
            >
                {{ item.i }}
            </grid-item>
        </grid-layout>


    </div>
</template>

<script>

    /*
    Pro Image eingelesen neues layout element erstellen
    In Array: x, y, width and height (verbunden - proportional), index, image
     */


    export default {
        name: "OneMoodboard",
        data() {
            return {
                file: '',
                layout: [
                    {"x":0,"y":0,"w":2,"h":2,"i":"0"},
                    {"x":2,"y":0,"w":2,"h":4,"i":"1"},
                    {"x":4,"y":0,"w":2,"h":5,"i":"2"},
                    {"x":6,"y":0,"w":2,"h":3,"i":"3"},
                    {"x":8,"y":0,"w":2,"h":3,"i":"4"},
                    {"x":10,"y":0,"w":2,"h":3,"i":"5"},
                    {"x":0,"y":5,"w":2,"h":5,"i":"6"},
                    {"x":2,"y":5,"w":2,"h":5,"i":"7"},
                    {"x":4,"y":5,"w":2,"h":5,"i":"8"},
                    {"x":6,"y":3,"w":2,"h":4,"i":"9"},
                    {"x":8,"y":4,"w":2,"h":4,"i":"10"},
                    {"x":10,"y":4,"w":2,"h":4,"i":"11"},
                    {"x":0,"y":10,"w":2,"h":5,"i":"12"},
                    {"x":2,"y":10,"w":2,"h":5,"i":"13"},
                    {"x":4,"y":8,"w":2,"h":4,"i":"14"},
                    {"x":6,"y":8,"w":2,"h":4,"i":"15"},
                    {"x":8,"y":10,"w":2,"h":5,"i":"16"},
                    {"x":10,"y":4,"w":2,"h":2,"i":"17"},
                    {"x":0,"y":9,"w":2,"h":3,"i":"18"},
                    {"x":2,"y":6,"w":2,"h":2,"i":"19"}
                ],
            }
        }
    }
</script>

<style scoped>
    .icons {
        color: #FF6852;
        font-size: 125px;
        margin-top: 20px;
    }

    .imagestyle {
        background-color: #FF6852;

    }
</style>