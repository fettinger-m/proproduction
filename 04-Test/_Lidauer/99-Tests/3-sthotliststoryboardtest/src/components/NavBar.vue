<template>
    <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">
            PRODUCTION
        </b-navbar-brand>
        <b-navbar-toggle  target="nav-collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>

            <b-navbar-nav class="mr-auto">
                <b-nav-item href="./projectscalendar" active>
                        <!--TODO: Dieses Element soll sich von den anderen abheben - sie führt zur Gesamtübersicht-->
                        <font-awesome-icon :icon="['fas', 'layer-group']" />
                        All Projects |
                </b-nav-item>

                <b-nav-item href="./singleprojectview" id="selectedproject">
                    {{ projectname }}
                </b-nav-item>

                <b-nav-item href="./documentsscript">
                        <font-awesome-icon :icon="['fas', 'file-alt']" />
                        Documents
                </b-nav-item>
                <b-nav-item href="./shotliststoryboard">
                    <font-awesome-icon :icon="['fas', 'clipboard-list']" />
                    Shotlist
                </b-nav-item>
                <b-nav-item href="./moodboard">
                    <font-awesome-icon :icon="['fas', 'image']" />
                    Moodboard
                </b-nav-item>
                <b-nav-item href="./contacts">
                    <font-awesome-icon :icon="['fas', 'address-book']" />
                    Contacts
                </b-nav-item>
                <b-nav-item href="./locations">
                    <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
                    Location
                </b-nav-item>
                <b-nav-item href="./library">
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
        name: "NavBar",
        data: function () {
            return {
                projectname: 'Selected Project'
            }
        },
        /*
        methods: {
            updateProjectName(){
                var stringName = this.projectname;
                return stringName;
            }
        }
         */
    }
</script>

<style scoped>
    #selectedproject {
        font-size: large;
    }

</style>