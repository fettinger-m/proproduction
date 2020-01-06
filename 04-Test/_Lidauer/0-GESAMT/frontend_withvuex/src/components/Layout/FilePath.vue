<template>
    <div>
        <b-breadcrumb :items="items"></b-breadcrumb>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        text: 'Admin',
                        href: '#'
                    },
                    {
                        text: 'Manage',
                        href: '#'
                    },
                    {
                        text: 'Library',
                        active: true
                    }
                ]
            }

        }
    }
</script>

<style scoped>
    .breadcrumb-item + .breadcrumb-item::before {
        content: ">";
    }
    li.breadcrumb-item a {
        color: #777777;
    }

    li.breadcrumb-item a:hover {
        color: #474747;
        text-decoration: none;
    }

    li.breadcrumb-item.active {
        color: #474747;
    }
</style>