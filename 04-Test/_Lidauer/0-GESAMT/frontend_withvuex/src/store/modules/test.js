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
    getProjectByID: (state) => (id) => {
        return state.projects.find(project => project.id === id)
    },
    allEvents: state => state.events,
    getEventByID: (state) => (id) => {
        return state.events.find(event => event.id === id)
    },
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
    async deleteProject({commit}, id) {
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
    async fetchDocuments({commit}) {
        const response = await axios.get(
            'http://localhost:3000/projects/1/documents'
        );
        commit('setDocuments', response.data);
        // eslint-disable-next-line no-console
        console.log(response.data)
    },
    async addDocument({commit}) {
        const response = await axios.post(
            'http://localhost:3000/projects/1/documents',   //todo
            {}
        );

        commit('addDocumentTab', response.data);
    },
    async deleteDocument({commit}, id) {
        await axios.delete(`http://localhost:3000/projects/1/documents/${id}`); //todo

        commit('removeDoc', id);
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
    removeEvent: (state, id) => (state.events = state.events.filter(event => event.id !== id)),
    updateEventMut: (state, updEvent) => {
        const index = state.events.findIndex(event => event.id === updEvent.id);
        if (index !== -1) {
            state.events.splice(index, 1, updEvent);
        }
    },


    //TABLEVIEW
    setTableView: (state, tableview) => (state.tableview = tableview), //todo

    //---DOCUMENTS
    setDocuments: (state, documents) => (state.projects = documents), //todo
    addDocumentTab: (state, document) => state.projects.documents.push(document),   //todo
    removeDoc: (state, id) => (state.projects = state.projects.filter(project => project.id !== id)), //todo


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