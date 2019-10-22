<template>
    <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">
            PRODUCTION
        </b-navbar-brand>
        <b-navbar-toggle  target="nav-collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mr-auto">
                <b-nav-item href="#" active>
                        <font-awesome-icon :icon="['fas', 'layer-group']" />
                        Project
                </b-nav-item>
                <b-nav-item href="#">
                        <font-awesome-icon :icon="['fas', 'file-alt']" />
                        Documents
                </b-nav-item>
                <b-nav-item href="#">
                    <font-awesome-icon :icon="['fas', 'clipboard-list']" />
                    Shotlist
                </b-nav-item>
                <b-nav-item href="#">
                    <font-awesome-icon :icon="['fas', 'image']" />
                    Moodboard
                </b-nav-item>
                <b-nav-item href="#">
                    <font-awesome-icon :icon="['fas', 'address-book']" />
                    Contacts
                </b-nav-item>
                <b-nav-item href="#">
                    <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
                    Location
                </b-nav-item>
                <b-nav-item href="#">
                    <font-awesome-icon :icon="['fas', 'paperclip']" />
                    Media
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
        name: "NavBar"
    }
</script>

<style scoped>

</style>