import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';
// eslint-disable-next-line no-unused-vars
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
            `http://localhost:3000/projects/${updProject.id}`,
            updProject
        );

        // eslint-disable-next-line no-console
        console.log(response.data);

        commit('updateProject', response.data);
    },

    async addProject({commit}) {
        const response = await axios.post(
            'http://localhost:3000/projects',
            {}
        );

        commit('addProjectRow', response.data);
    },
    async deleteProject({ commit }, id) {
        await axios.delete(`http://localhost:3000/projects/${id}`);

        commit('removeProject', id);
    }


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

    removeProject: (state, id) =>
        (state.projects = state.projects.filter(project => project.id !== id)),

    addProjectRow: (state, project) => state.projects.push(project)

};


export default {
    state,
    getters,
    actions,
    mutations
};