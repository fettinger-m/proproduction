import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';
// eslint-disable-next-line no-unused-vars
import LocationTable from "../../pages/Locations/LocationTable";
// eslint-disable-next-line no-unused-vars
import skeleton from './Dataskeleton'

//App-level state/data
const state = {
    projects: [],
    locations: [],
    contacts: []
};

//Get pieces of state or computed values from state
const getters = {
    allProjects: state => state.projects,
    allLocations: state => state.locations,
    getField,
};

//Called from components to commit a mutation
const actions = {

    async fetchProjects({commit}) {
        const response = await axios.get(
            'http://localhost:3000/projects'
        );
        commit('setProjects', response.data);
        // eslint-disable-next-line no-console
        console.log(response.data)
    },

    async fetchLocations({commit}) {
        const response = await axios.get(
            'http://localhost:3000/locations'
        );
        commit('setLocations', response.data);
        // eslint-disable-next-line no-console
        console.log(response.data)
    },

    async updateProject({commit}, updProject) {
        // eslint-disable-next-line no-console
        const response = await axios.post(
            `http://localhost:3000/projects/${updProject.key}`,
            updProject
        );

        // eslint-disable-next-line no-console
        console.log(response.data);
        commit('updateProject', response.data);
        LocationTable.methods.reloadData();
    },

    async updateContact({commit}, updContact) {
        // eslint-disable-next-line no-console
        const response = await axios.put(
            `http://localhost:3000/contacts/${updContact.id}`,
            updContact
        );

        commit('updateContact', response.data);
    },

    async addProject({commit}) {
        const response = await axios.post(
            'http://localhost:3000/projects',
            {}
        );

        commit('addProjectRow', response.data);
    },
    async addLocation({commit}, location) {
        // eslint-disable-next-line no-console
        console.log(location);
        const response = await axios.post(
            'http://localhost:3000/locations',
            location
        );
        commit('addLocation', response.data);
    },
    async addContact({commit}, contact) {
        const response = await axios.post(
            'http://localhost:3000/contacts',
            contact
        );
        commit(response.data)
    },
    async deleteProject({commit}, key) {
        await axios.delete(`http://localhost:3000/projects/${key}`);

        commit('removeProject', key);
    },

    async deleteContact({commit}, id) {
        await axios.delete(`http://localhost:3000/contacts/${id}`);
        commit(id);
    },

    async deleteLocation({commit}, id) {
        await axios.delete(`http://localhost:3000/locations/${id}`);
        commit(id);
    }


};

//Mutate the state (Update data, etc)
const mutations = {

    setProjects: (state, projects) => (state.projects = projects),

    setLocations: (state, locations) => (state.locations = locations),

    updateProject: (state, updProject) => {
        const index = state.projects.findIndex(project => project.key === updProject.key);
        if (index !== -1) {
            state.projects.splice(index, 1, updProject);
        }
    },

    updateContact: (state, updContact) => {
        const index = state.contacts.findIndex(contact => contact.key === updContact.id);
        if (index !== -1) {
            state.projects.splice(index, 1, updContact);
        }
    },

    updateField,

    removeProject: (state, key) =>
        (state.projects = state.projects.filter(project => project.key !== key)),

    removeContact: (state, key) =>
        (state.contacts = state.contacts.filter(contact => contact.key !== key)),

    removeLocation: (state, key) =>
        (state.locations = state.locations.filter(location => location.key !== key)),

    addProjectRow: (state, project) => state.projects.push(project),

    addLocation: (state, location) => state.locations.push(location),


};


export default {
    state,
    getters,
    actions,
    mutations
};