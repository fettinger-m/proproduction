import Vue from "vue";
import VueRouter from "vue-router";

import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Projects from '@/components/Projects'
import Contacts from '@/components/Contacts'
import ContactDetails from '@/components/ContactDetails'
import Locations from '@/components/Locations'
import LocationDetails from '@/components/LocationDetails'
import Scripts from '@/components/Scripts'
import ScriptDetails from '@/components/ScriptDetails'
import Shotlists from '@/components/Shotlists'
import ShotlistDetails from '@/components/ShotlistDetails'
import Documents from '@/components/Documents'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts
    },
    {
      path: '/locations',
      name: 'Locations',
      component: Locations
    },
    {
      path: '/scripts',
      name: 'Scripts',
      component: Scripts
    },
    {
      path: '/shotlists',
      name: 'Shotlists',
      component: Shotlists
    },
    {
      path: '/documents',
      name: 'Documents',
      component: Documents
    },
    {
      path: '/contactDetails',
      name: 'ContactDetails',
      component: ContactDetails
    },
    {
      path: '/locationDetails',
      name: 'LocationDetails',
      component: LocationDetails
    },
    {
      path: '/scriptDetails',
      name: 'ScriptDetails',
      component: ScriptDetails
    },
    {
      path: '/shotlistDetails',
      name: 'ShotlistDetails',
      component: ShotlistDetails
    }
  ]
});