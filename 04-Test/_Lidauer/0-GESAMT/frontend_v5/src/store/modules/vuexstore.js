import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';
import CalendarComp from "@/pages/ProjectsCalendar/CalendarComp";

const client = axios.create({
    //baseURL: 'http://172.17.74.80:3000',
    baseURL: 'http://localhost:3000',
    json: true
});

//----STATES
//App-level state/data
const state = {
    projects: [],
    events: [],
    tableview: {},
    userdetails: [],
};

//----GETTERS
//Get pieces of state or computed values from state
const getters = {

    getField,

    //---PROJECTS
    allProjects: state => state.projects,
    getProjectByID: (state) => (id) => {
        return state.projects.find(project => project.id === id)
    },

    //---EVENTS
    allEvents: state => state.events,
    getEventByID: (state) => (id) => {
        return state.events.find(event => event.id === id)
    },

    //---TABLEVIEW
    allTableView: state => state.tableview,

    //--USERDETAILS
    allUserdetails: state => state.userdetails,

};

//----ACTIONS
//Called from components to commit a mutation
const actions = {

    //---PROJECTS
    async fetchProjects({commit}) {
        const response = await client.get(
            '/projects'
        );
        // eslint-disable-next-line no-console
        console.log(response.data)
        commit('setProjects', response.data);
    },
    async updateProject({commit}, updProject) {
        const response = await client.post(
            `/projects/${updProject.id}/update`,
            updProject
        );
        // eslint-disable-next-line no-console
        console.log(response.data)

        commit('updateProjectMut', updProject);
    },
    async addProject({commit}) {
        let project = {
            project_name: "New Project",
            shotlists:[],
            documents:[],
            locations:[],
            contacts:[]
        }

        const response = await client.post(
            '/projects/add',
            project
        );

        // eslint-disable-next-line no-console
        console.log(response.data)

        project.id = response.data;

        commit('addProjectRow', project);
    },
    async deleteProject({commit}, id) {
        await client.post(`/projects/${id}/delete`);

        commit('removeProject', id);
    },

    //---EVENTS
    async fetchEvents({commit}) {
        const response = await client.get(
            '/calendarevents'
        );
        // eslint-disable-next-line no-console
        console.log(response.data)
        commit('setEvents', response.data);
    },
    async updateEvent({commit}, updEvent) {
        const response = await client.post(
            `/calendarevents/${updEvent.id}/update`,
            updEvent
        );

        // eslint-disable-next-line no-console
        console.log(response.data)

        commit('updateEventMut', updEvent);

        CalendarComp.methods.resetSelectedDate(updEvent)
    },
    async addEventAction ({commit}, eventobj) {
        const response = await client.post(
            '/calendarevents/add',
            eventobj
        );

        eventobj.id = response.data

        commit('addEventMut', eventobj);

        CalendarComp.methods.resetInputFields(eventobj)
    },
    async deleteEvent({commit}, id) {
        await client.post(`/calendarevents/${id}/delete`);

        commit('removeEvent', id);
    },

    //---TABLEVIEW
    async fetchTableview({commit}) {
        const response = await client.get(
            '/tableview'
        );

        // eslint-disable-next-line no-console
        console.log(response.data)

        commit('setTableView', response.data);
    },
    async updateTableview({commit}, updTableview) {
        const response = await client.post(
            `/tableview/update`,
            updTableview
        );

        // eslint-disable-next-line no-console
        console.log(response.data)

        commit('updateTableviewMut', updTableview);
    },

    //---DOCUMENTS
    async fetchDocuments({commit}, payload) {
        const response = await client.get(
            `/projects/${payload.projId}/documents`
        );

        payload.documents = response.data

        commit('setDocuments', payload);
        // eslint-disable-next-line no-console
        console.log(response.data)
    },
    async addDocument({commit}, payload) {

        const response = await client.post(
            `/projects/${payload.projId}/documents/add`,
            payload.document
        );

        payload.document.id = response.data

        // eslint-disable-next-line no-console
        console.log(payload)

        commit('addDocumentTab', payload);
    },
    async deleteDocument({commit}, payload) {
        await client.post(`/projects/${payload.projId}/documents/${payload.docId}/delete`);

        commit('removeDoc', payload);
    },
    async updateDocument({commit}, payload) {
        const response = await client.post(
            `/projects/${payload.projId}/documents/${payload.updDocument.id}/update`,
            payload.updDocument
        );
        // eslint-disable-next-line no-console
        console.log(response.data)

        commit('updateDocumentMut', payload);
    },

    //---SHOTLIST
    async fetchShotlists({commit}, payload) {
        const response = await client.get(
            `/projects/${payload.projId}/shotlists`
        );

        //payload.shotlists = response.data
        // eslint-disable-next-line no-console
        console.log(response.data)

        commit('setShotlists', payload);
    },
    async addShotlist({commit}, payload) {
        const response = await client.post(
            `/projects/${payload.projId}/shotlists/add`,
            payload.shotlist
        );

        payload.shotlist.id = response.data

        // eslint-disable-next-line no-console
        console.log(payload.shotlist)

        commit('addShotlistMut', payload);
    },
    async deleteShotlist({commit}, payload) {
        await client.post(`/projects/${payload.projId}/shotlists/${payload.shotlistId}/delete`);

        commit('removeShotlist', payload);
    },
    async updateShotlist({commit}, payload) {
        const response = await client.post(
            `/projects/${payload.projId}/shotlists/${payload.updShotlist.id}/update`,
            payload.updShotlist
        );

        //payload.updShotlist = response.data
        // eslint-disable-next-line no-console
        console.log(response.data)

        commit('updateShotlistMut', payload);
    },
    async addShot({commit}, payload) {

        const response = await client.post(
            `/projects/${payload.projId}/shotlists/${payload.shotlistId}/shots/add`,
            payload.shot
        );

        payload.shot.id = response.data

        // eslint-disable-next-line no-console
        console.log("Add new Shot:")

        // eslint-disable-next-line no-console
        console.log(payload)

        commit('addShotMut', payload);
    },
    async deleteShot({commit}, payload) {
        await client.post(`/projects/${payload.projId}/shotlists/${payload.shotlistId}/shots/${payload.shotId}/delete`);

        commit('removeShot', payload);
    },
    async updateShot({commit}, payload) {
        const response = await client.post(
            `/projects/${payload.projId}/shotlists/${payload.shotlistId}/shots/${payload.updShot.id}/update`,
            payload.updShot
        );

        // eslint-disable-next-line no-console
        console.log(response.data)

        commit('updateShotMut', payload);
    },

    //---LOCATION
    async addLocation({commit}, payload) {
        await client.post(
            `projects/${payload.projectId}/locations/add`,
            payload.location
        );
        commit('addLocation', payload);
    },
    async deleteLocation({commit}, payload) {
        await client.post(`/projects/${payload.projId}/locations/${payload.locId}/delete`);
        commit('removeLocation', payload);
    },


    //---MEDIA


    //--USERDETAILS
    async fetchUserdetails({commit}) {
        const response = await client.get(
            '/userdetails'
        );
        commit('setUserdetails', response.data);
    },
    async updateUserdetails({commit}, updUserdetails) {
        const response = await client.post(
            `/userdetails/update`,
            updUserdetails
        );
        commit('updateUserdetailsMut', response.data);
    },
};

//----MUTATIONS
//Mutate the state (Update data, etc)
const mutations = {

    updateField,

    //---PROJECTS
    setProjects: (state, projects) => (state.projects = projects),
    updateProjectMut: (state, updProject) => {
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
    setTableView: (state, tableview) => (state.tableview = tableview),
    updateTableviewMut: (state, updTableview) => {
        state.tableview = updTableview
    },

    //---DOCUMENTS
    setDocuments: (state, payload) => (state.projects.find(project => project.id === payload.projId).documents = payload.documents),
    addDocumentTab: (state, payload) => state.projects.find(project => project.id === payload.projId).documents.push(payload.document),
    removeDoc: (state, payload) => state.projects.find(project => project.id === payload.projId).documents = state.projects.find(project => project.id === payload.projId).documents.filter(document => document.id !== payload.docId),
    updateDocumentMut: (state, payload) => {
        const index = state.projects.find(project => project.id === payload.projId).documents.findIndex(document => document.id === payload.updDocument.id)

        if (index !== -1) {
            state.projects.find(project => project.id === payload.projId).documents.splice(index, 1, payload.updDocument);
        }
    },


    //---SHOTLIST
    setShotlists: (state, payload) => (state.projects.find(project => project.id === payload.projId).shotlists = payload.shotlists),
    addShotlistMut:
        (state, payload) => state.projects.find(project => project.id === payload.projId).shotlists.push(payload.shotlist),
    removeShotlist: (state, payload) => state.projects.find(project => project.id === payload.projId).shotlists =
        state.projects.find(project => project.id === payload.projId).shotlists.filter(shotlist => shotlist.id !== payload.shotlistId),
    updateShotlistMut:
        (state, payload) => {
            const index = state.projects.find(project => project.id === payload.projId).shotlists.findIndex(shotlist => shotlist.id === payload.updShotlist.id)
            if (index !== -1) {
                state.projects.find(project => project.id === payload.projId).shotlists.splice(index, 1, payload.updShotlist);
            }
        },

    //Shots
    addShotMut:
        (state, payload) => state.projects.find(project => project.id === payload.projId).shotlists.find(shotlist => shotlist.id === payload.shotlistId).shots.push(payload.shot),
    removeShot: (state, payload) => state.projects.find(project => project.id === payload.projId).shotlists.find(shotlist => shotlist.id === payload.shotlistId).shots =
        state.projects.find(project => project.id === payload.projId).shotlists.find(shotlist => shotlist.id === payload.shotlistId).shots.filter(shot => shot.id !== payload.shotId),
    updateShotMut: (state, payload) => {
        const index = state.projects.find(project => project.id === payload.projId).shotlists.find(shotlist => shotlist.id === payload.shotlistId).shots.findIndex(shot => shot.id === payload.updShot.id);
        if (index !== -1) {
            state.projects.find(project => project.id === payload.projId).shotlists.find(shotlist => shotlist.id === payload.shotlistId).shots.splice(index, 1, payload.updShot);
        }
    },


    //---LOCATION
    addLocation(state, payload) {
        state.projects.find(project => project.id === payload.projectId).locations.push(payload.location)

    },
    removeLocation(state, payload) {
        return state.projects.find(project => project.id === payload.projId).locations =
            state.projects.find(project => project.id === payload.projId).locations.filter(location => location.id !== payload.locId)
    },

    //---MEDIA


    //---USERDETAILS - finished
    setUserdetails: (state, userdetails) => (state.userdetails = userdetails),
    updateUserdetailsMut: (state, updUserdetails) => {
        state.tableview = updUserdetails
    },
};

//Export
export default {
    state,
    getters,
    actions,
    mutations
};