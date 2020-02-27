import Vue from "vue";
import VueRouter from "vue-router";

import SingleProjectViewApp from "../views/SingleProjectView";
import ContactsApp from "../views/Contacts";
import DocumentsScriptApp from "../views/Documents";
import InformationApp from "../views/Information";
import LibraryApp from "../views/Library";
import LocationsApp from "../views/Locations";
import LoginApp from "../views/Login";
import MoodboardApp from "../views/Moodboard";
import MyProfileApp from "../views/MyProfile";
import ProjectsCalenderApp from "../views/ProjectsCalender";
import ShotlistStoryboardApp from "../views/ShotlistStoryboard";
import SignUpApp from "../views/SignUp";

Vue.use(VueRouter);

export default new VueRouter({
        routes: [
            {
                path: '/',
                component: LoginApp,
                name: 'login'
            },
            {
                path: '/login',
                component: LoginApp,
                name: 'login'
            },
            {
                path: '/signup',
                component: SignUpApp,
                name: 'signup'
            },
            {
                path: '/myprofile',
                component: MyProfileApp,
                name: 'myprofile'
            },
            {
                path: '/projects',
                component: ProjectsCalenderApp,
                name: 'projects',
            },
            {
                path: '/projects/:project/',
                component: SingleProjectViewApp,
                name: 'project',
            },
            {
                path: '/projects/:project/contacts',
                component: ContactsApp,
                name: 'contacts',
            },
            {
                path: '/projects/:project/documents',
                component: DocumentsScriptApp,
                name: 'documents'
            },
            {
                path: '/projects/:project/information',
                component: InformationApp,
                name: 'information'
            },
            {
                path: '/projects/:project/library',
                component: LibraryApp,
                name: 'library'
            },
            {
                path: '/projects/:project/location',
                component: LocationsApp,
                name: 'location'
            },
            {
                path: '/projects/:project/moodboard',
                component: MoodboardApp,
                name: 'moodboard',
            },
            {
                path: '/projects/:project/shotlist',
                component: ShotlistStoryboardApp,
                name: 'shotlist',
            },
            {
                path: '/projects/:project/media',
                component: LibraryApp,
                name: 'media'
            },
        ]
})
;