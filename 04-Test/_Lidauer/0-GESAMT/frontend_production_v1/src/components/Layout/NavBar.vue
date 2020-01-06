<template>
    <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">
            PRODUCTION
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" data-target="#navbarSupportedContent">
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mr-auto">
                <b-nav-item :to="{name: 'projects'}">
                    <font-awesome-icon :icon="['fas', 'layer-group']"/>
                    All Projects
                </b-nav-item>

                <b-nav-text v-show="isShown()">
                    <font-awesome-icon class="mr-2 ml-2" :icon="['fas', 'angle-right']"/>
                </b-nav-text>

                <b-nav-item :to="{name: 'project', params: { project: projectName }}" :active="isActive('project')" v-show="isShown()">
                    {{projectName}}
                </b-nav-item>

                <b-nav-item :to="{name: 'documents', params: { project: projectName }}" :active="isActive('documents')" v-show="isShown()">
                    <font-awesome-icon :icon="['fas', 'file-alt']"/>
                    Documents
                </b-nav-item>

                <b-nav-item :to="{name: 'shotlist', params: { project: projectName }}" :active="isActive('shotlist')" v-show="isShown()">
                    <font-awesome-icon :icon="['fas', 'clipboard-list']"/>
                    Shotlist
                </b-nav-item>

                <b-nav-item :to="{name: 'moodboard', params: { project: projectName }}" :active="isActive('moodboard')" v-show="isShown()">
                    <font-awesome-icon :icon="['fas', 'images']"/>
                    Moodboard
                </b-nav-item>

                <b-nav-item :to="{name: 'contacts', params: { project: projectName }}" :active="isActive('contacts')" v-show="isShown()">
                    <font-awesome-icon :icon="['fas', 'address-book']"/>
                    Contacts
                </b-nav-item>

                <b-nav-item :to="{name: 'location', params: { project: projectName }}" :active="isActive('location')" v-show="isShown()">
                    <font-awesome-icon :icon="['fas', 'map-marker-alt']"/>
                    Location
                </b-nav-item>

                <b-nav-item :to="{name: 'media', params: { project: projectName }}" :active="isActive('media')" v-show="isShown()">
                    <font-awesome-icon :icon="['fas', 'paperclip']"/>
                    Media
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto nav-flex-icons">
                <b-nav-item :to="{name: 'myprofile'}">
                    <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg"
                         class="rounded-circle z-depth-0"
                         alt="avatar image" height="35">
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: "NavBar",
        data() {
            return {
                projectName: "ToDoName"
            }
        },
        methods: {
            isActive(name) {
                // eslint-disable-next-line no-console
                //console.log(name, this.currentPage);
                if (name === this.currentPage) {
                    return true;
                }
            },
            isShown() {
                return !this.smallNav;
            }
        },
        props: {
            currentPage: String,
            smallNav: Boolean,

            project_element: {
                type: Object,
                required: false
            }
        }
    }
</script>

<style scoped>
</style>