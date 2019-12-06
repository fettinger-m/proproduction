<!-- This navbar is used for the Project/Calendar Page, it doesn't show all the icons-->
<template>
    <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">
            PRODUCTION
        </b-navbar-brand>
        <b-navbar-toggle  target="nav-collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>

            <b-navbar-nav class="mr-auto">
                <b-nav-item active>
                    <router-link :to="{name: 'calender'}">
                    <!--TODO: Dieses Element soll sich von den anderen abheben - sie führt zur Gesamtübersicht-->
                    <font-awesome-icon :icon="['fas', 'layer-group']" />
                    All Projects |
                    </router-link>
                </b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto nav-flex-icons">
                <b-nav-item href="#">
                    <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg" class="rounded-circle z-depth-0"
                         alt="avatar image" height="35">
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: "NavBarSimple"
    }
</script>

<style scoped>

</style>