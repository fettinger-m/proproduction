<template>
    <div class="custom-actions">
        <b-button variant="outline-primary" class="mr-1" @click="itemAction('view-item', rowData, rowIndex)"><font-awesome-icon :icon="['fas', 'pen']"/></b-button>
        <b-button variant="outline-primary" @click="itemAction('edit-item', rowData, rowIndex)"><font-awesome-icon :icon="['fas', 'times']"/></b-button>
    </div>
</template>

<script>
    export default {
        props: {
            rowData: {
                type: Object,
                required: true
            },
            rowIndex: {
                type: Number
            }
        },
        methods: {
            itemAction (action, data, index) {
                // eslint-disable-next-line no-console
                console.log('custom-actions: ' + action, data.name, index)
            }
        }
    }
</script>

<style>

</style>