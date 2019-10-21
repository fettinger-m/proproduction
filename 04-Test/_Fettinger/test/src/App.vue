<template>
    <div id="app">
        <NavBar></NavBar>
        <AddTodo></AddTodo>
        <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo"/>
    </div>
</template>

<script>
    import Todos from "@/components/Todos";
    //import Header from "@/components/Layout/Header";
    import AddTodo from "@/components/AddTodo";
    import NavBar from "@/components/Layout/NavBar";



    export default {
        name: 'app',
        components: {
            NavBar,
            AddTodo,
            //Header,
            Todos
        },
        data() {
            return {
                todos: [
                    {
                        id: 1,
                        title: "Todo Hallo",
                        completed: false,
                    },
                    {
                        id: 2,
                        title: "Todo Two",
                        completed: true,
                    },
                    {
                        id: 3,
                        title: "Todo Three",
                        completed: false
                    }
                ]
            }
        },
        methods: {
            deleteTodo(id) {
                this.todos = this.todos.filter(todo => todo.id != id);
            }
        }
    }
</script>

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
        line-height: 1.4;
    }
</style>