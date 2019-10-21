<template>
    <div id="ninjas">
        <ul>
            <li v-for="ninja in ninjas" v-on:click="ninja.show =!ninja.show" v-bind:key="type">
                <h2>{{ninja.name}}</h2>
                <h3 v-show="ninja.show">{{ninja.speciality}}</h3>
            </li>
        </ul>
    </div>

</template>

<script>
    export default {
        data(){
            return {
                ninjas: [
                    {name: 'HTL', speciality: 'Zeit stehlen', show: false},
                    {name: 'Schierl', speciality: 'Java Profi', show: false},
                    {name: 'Mairinger', speciality: 'kon ois', show: false},
                    {name: 'Fettinger', speciality: 'IT', show: false},
                    {name: 'Linnert', speciality: 'Datenbank Profi', show: false},
                ]
            }
        }
    }
</script>

<style scoped>
    #ninjas{
        width: 100%;
        max-width: 1200px;
        margin: 40px auto;
        padding: 0 20px;
        box-sizing: border-box;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }
    li{
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 30px;
        border: 1px solid #222;
        margin: 10px;
    }
</style>