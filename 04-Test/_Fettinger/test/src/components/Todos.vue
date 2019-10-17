<template>
    <ul>
        <li class="list-group" :key="todo.id" v-for="todo in todos">
            <TodoItem :todo="todo" v-on:del-todo="$emit('del-todo', todo.id)"/>
        </li>
    </ul>
</template>

<script>
    import TodoItem from "./TodoItem";

    export default {
        name: "Todos",
        components: {
            TodoItem
        },
        props: ["todos"]
    }
</script>

<style scoped>

</style>