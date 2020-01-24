import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';
import CalendarComp from "@/pages/ProjectsCalendar/CalendarComp";

//----STATES
//App-level state/data
const state = {
    projects: [],
    events: [],
    tableview: {
        "thema_c": true,
        "status_c": true,
        "priority_c": true,
        "custom1_c": true,
        "custom2_c": true,
        "customFieldName1": "Custom1",
        "customFieldName2": "Custom2"
    },
};

//----GETTERS
//Get pieces of state or computed values from state
const getters = {
    allProjects: state => state.projects,
    allEvents: state => state.events,
    allTableView: state => state.tableview,

    getField,

};

//----ACTIONS
//Called from components to commit a mutation
const actions = {

    //---PROJECTS
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
    },


    //---EVENTS
    async fetchEvents({commit}) {
        const response = await axios.get(
            'http://localhost:3000/calendarevents'
        );
        commit('setEvents', response.data);
        // eslint-disable-next-line no-console
        console.log(response.data)
    },
    async addEventAction({commit}, eventobj) {
        // eslint-disable-next-line no-console
        console.log(eventobj)
        const response = await axios.post(
            'http://localhost:3000/calendarevents',
            eventobj
        );

        commit('addEventMut', response.data);

        CalendarComp.methods.resetInputFields(eventobj)
    },


    //TABLEVIEW
    async fetchTableview({commit}) {
        const response = await axios.get(
            'http://localhost:3000/tableview'
        );
        commit('setTableView', response.data);
        // eslint-disable-next-line no-console
        console.log(response.data)
    },
    //Update values


    //---DOCUMENTS

    //---SHOTLIST

    //---MOODBOARD

    //---CONTACTS

    //---LOCATION

    //---MEDIA


};

//----MUTATIONS
//Mutate the state (Update data, etc)
const mutations = {

    updateField,

    //---PROJECTS
    setProjects: (state, projects) => (state.projects = projects),
    updateProject: (state, updProject) => {
        const index = state.projects.findIndex(project => project.id === updProject.id);
        if (index !== -1) {
            state.projects.splice(index, 1, updProject);
        }
    },
    addProjectRow: (state, project) => state.projects.push(project),
    removeProject: (state, id) => (state.projects = state.projects.filter(project => project.id !== id)),

    //---EVENTS
    setEvents: (state, events) => (state.events = events),
    addEventMut: (state, event) => {
        state.events.push(event)
    },

    //TABLEVIEW
    setTableView: (state, tableview) => (state.tableview = tableview),


    //---DOCUMENTS

    //---SHOTLIST

    //---MOODBOARD

    //---CONTACTS

    //---LOCATION

    //---MEDIA
};

//Export
export default {
    state,
    getters,
    actions,
    mutations
};