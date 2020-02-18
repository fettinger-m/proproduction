import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';
import CalendarComp from "@/pages/ProjectsCalendar/CalendarComp";

//----STATES
//App-level state/data
const state = {
    projects: [],
    events: [],
    tableview: {},
};

//----GETTERS
//Get pieces of state or computed values from state
const getters = {

    getField,

    //---PROJECTS
    allProjects: state => state.projects,
    getProjectByID: (state) => (id) => {
        /*
        // eslint-disable-next-line no-console
        console.log("Get Project with ID: " + id);
        // eslint-disable-next-line no-console
        console.log(state.projects);
         */
        return state.projects.find(project => project.id === id)
    },

    //---EVENTS
    allEvents: state => state.events,
    getEventByID: (state) => (id) => {
        return state.events.find(event => event.id === id)
    },

    //---TABLEVIEW
    allTableView: state => state.tableview,

    //---DOCUMENTS
    //allDocuments: (state, currproject) => state.projects[currproject.id].documents,

    //---LOCATIONS
    //allLocations: (state, currproject) => state.projects[currproject.id].locations,
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
    async deleteProject({commit}, id) {
        await axios.delete(`http://localhost:3000/projects/${id}`);

        commit('removeProject', id);
    },
    //async fetchCurrentProjectID({commit})

    //---EVENTS
    async fetchEvents({commit}) {
        const response = await axios.get(
            'http://localhost:3000/calendarevents'
        );
        commit('setEvents', response.data);
        // eslint-disable-next-line no-console
        console.log(response.data)
    },
    async updateEvent({commit}, updEvent) {
        // eslint-disable-next-line no-console
        const response = await axios.put(
            `http://localhost:3000/calendarevents/${updEvent.id}`,
            updEvent
        );

        // eslint-disable-next-line no-console
        console.log(response.data);

        commit('updateEventMut', response.data);
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
    async deleteEvent({commit}, id) {
        await axios.delete(`http://localhost:3000/calendarevents/${id}`);

        commit('removeEvent', id);
    },

    //---TABLEVIEW
    async fetchTableview({commit}) {
        const response = await axios.get(
            'http://localhost:3000/tableview'
        );
        commit('setTableView', response.data);
        // eslint-disable-next-line no-console
        console.log(response.data)
    },
    async updateTableview({commit}, updTableview) {
        const response = await axios.put(
            `http://localhost:3000/tableview`,
            updTableview
        );

        // eslint-disable-next-line no-console
        console.log(response.data);

        commit('updateTableviewMut', response.data);
    },

    //---DOCUMENTS
    async fetchDocuments({commit}, currproject) {
        const response = await axios.get(
            `http://localhost:3000/projects/${currproject.id}/documents`
        );
        commit('setDocuments', currproject, response.data);
        // eslint-disable-next-line no-console
        console.log(response.data)
    },
    async addDocument({commit}, currproject) {
        const response = await axios.post(
            `http://localhost:3000/projects/${currproject.id}/documents`,
            {}
        );

        commit('addDocumentTab', currproject, response.data);
    },
    async deleteDocument({commit}, currproject, index) {
        await axios.delete(`http://localhost:3000/projects/${currproject.id}/documents/${index}`);

        commit('removeDoc', currproject, index);
    },

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

    //---PROJECTS - TODO - update / insert problem
    setProjects: (state, projects) => (state.projects = projects),
    updateProject: (state, updProject) => {
        const index = state.projects.findIndex(project => project.id === updProject.id);
        if (index !== -1) {
            state.projects.splice(index, 1, updProject);
        }
    },
    addProjectRow: (state, project) => state.projects.push(project),
    removeProject: (state, id) => (state.projects = state.projects.filter(project => project.id !== id)),

    //---EVENTS - finished
    setEvents: (state, events) => (state.events = events),
    addEventMut: (state, event) => {
        state.events.push(event)
    },
    removeEvent: (state, id) => (state.events = state.events.filter(event => event.id !== id)),
    updateEventMut: (state, updEvent) => {
        const index = state.events.findIndex(event => event.id === updEvent.id);
        if (index !== -1) {
            state.events.splice(index, 1, updEvent);
        }
    },

    //TABLEVIEW - finished
    setTableView: (state, tableview) => (state.tableview = tableview),
    updateTableviewMut: (state, updTableview) => {
        state.tableview = updTableview
    },

    //---DOCUMENTS TODO - to check
    setDocuments: (state, currproject, documents) => (state.projects[currproject.id].documents = documents),
    addDocumentTab: (state, currproject, document) => state.projects[currproject.id].documents.push(document),
    removeDoc: (state, currproject, index) => (state.projects[currproject.id].documents = state.projects[currproject.id].documents.filter(document => document.id !== index)),


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