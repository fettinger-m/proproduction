<template>
    <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand :to="{name: 'projects'}">
            <span class="logoOrange">PRO</span><span class="logoBlack">duction</span>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" data-target="#navbarSupportedContent">
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mr-auto">
                <b-nav-item :to="{name: 'projects'}">
                    <font-awesome-icon :icon="['fas', 'layer-group']"/>
                    All Projects
                </b-nav-item>

                <b-nav-text v-show="!smallNav">
                    <!-- Pfeil rechts Icon -->
                    <font-awesome-icon class="mr-2 ml-2" :icon="['fas', 'angle-right']"/>
                </b-nav-text>

                <b-nav-item :to="{name: 'project', params: { project: projectName }}" :active="isActive('project')"
                            v-show="!smallNav">
                    {{projectName}}
                </b-nav-item>

                <b-nav-item
                        :to="{name: 'documents', params: { project: projectName }}"
                        :active="isActive('documents')"
                        v-show="!smallNav">
                    <font-awesome-icon :icon="['fas', 'file-alt']"/>
                    Documents
                </b-nav-item>

                <b-nav-item :to="{name: 'shotlist', params: { project: projectName }}" :active="isActive('shotlist')"
                            v-show="!smallNav">
                    <font-awesome-icon :icon="['fas', 'clipboard-list']"/>
                    Shotlists
                </b-nav-item>

                <!--
                <b-nav-item :to="{name: 'moodboard', params: { project: projectName }}" :active="isActive('moodboard')"
                            v-show="isShown()">
                    <font-awesome-icon :icon="['fas', 'images']"/>
                    Moodboard
                </b-nav-item>
                -->

                <b-nav-item :to="{name: 'contacts', params: { project: projectName }}" :active="isActive('contacts')"
                            v-show="!smallNav">
                    <font-awesome-icon :icon="['fas', 'address-book']"/>
                    Contacts
                </b-nav-item>

                <b-nav-item :to="{name: 'location', params: { project: projectName }}" :active="isActive('location')"
                            v-show="!smallNav">
                    <font-awesome-icon :icon="['fas', 'map-marker-alt']"/>
                    Locations
                </b-nav-item>

                <b-nav-item :to="{name: 'media', params: { project: projectName }}" :active="isActive('media')"
                            v-show="!smallNav">
                    <font-awesome-icon :icon="['fas', 'paperclip']"/>
                    Media
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto nav-flex-icons">
                <b-nav-item :to="{name: 'myprofile'}">
                    <font-awesome-icon :icon="['fas', 'user']" />
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "NavBar",
        methods: {
            ...mapActions(["fetchProjects"]),

            isActive(name) {
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
        },
        computed: {
            ...mapGetters(["getProjectByID"]),

            selectedproject() {
                if (!this.smallNav) {
                    if (this.getProjectByID(sessionStorage.getItem('sessionProjectID')) == null) {
                        this.fetchProjects();
                        return 0
                    } else {
                        return this.getProjectByID(sessionStorage.getItem('sessionProjectID'))
                    }
                } else {
                    return {}
                }

            },

            id() {
                if (!this.smallNav) {
                    return sessionStorage.getItem('sessionProjectID')
                } else {
                    return 0
                }
            },
            projectName() {
                if (!this.smallNav) {
                    return this.selectedproject.project_name
                } else {
                    return "NoProjectSelected"
                }
            }
        },
    }
</script>

<style scoped>
</style>