<template>
    <form>
        <input type="text" name="title" placeholder="Add Todo..." class="form-control">
        <input type="submit" value="Submit" class="btn-dark">
    </form>
</template>

<script>
    export default {
        name: "AddTodo"
    }
</script>

<style scoped>
    form {
        display: flex;
    }
    input[type="text"] {
        flex: 10;
        padding: 5px;
    }
    input[type="submit"] {
        flex: 2;
    }
</style>