import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';
import skeleton from './Dataskeleton'


//App-level state/data
const state = {
    projects: []
};

//Get pieces of state or computed values from state
const getters = {
    allProjects: state => state.projects,
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

    async updateProject({commit}, updProject) {
        // eslint-disable-next-line no-console
        const response = await axios.put(
            `https://jsonplaceholder.typicode.com/todos/${updProject.id}`,
            updProject
        );

        // eslint-disable-next-line no-console
        console.log(response.data);

        commit('updateProject', response.data);
    },

    async addProject({commit}) {
        const response = await axios.post(
            'http://localhost:3000/projects',
            skeleton
        );

        commit('addProjectRow', response.data);
    },


};

//Mutate the state (Update data, etc)
const mutations = {

    setProjects: (state, projects) => (state.projects = projects),

    updateProject: (state, updProject) => {
        const index = state.projects.findIndex(project => project.id === updProject.id);
        if (index !== -1) {
            state.projects.splice(index, 1, updProject);
        }
    },

    updateField,

    addProjectRow: (state, project) => state.projects.unshift(project)

};


export default {
    state,
    getters,
    actions,
    mutations
};