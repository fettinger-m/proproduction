<template>
        <div class="list-group-item" v-bind:class="{'is-complete':todo.completed}">
            <input type="checkbox" v-on:change="markComplete">
            <span class="m-3"> {{todo.title}}</span>
            <button @click="$emit('del-todo', todo.id)" type="button" class="btn btn-danger">Delete</button>
        </div>
</template>

<script>
    export default {
        name: "TodoItem",
        props: ["todo"],
        methods: {
            markComplete() {
                this.todo.completed = !this.todo.completed;
            }
        }
    }
</script>

<style scoped>
    .is-complete {
        text-decoration: line-through;
        color: #cccccc;
    }

    .btn-danger {
        float: right;
    }


</style>