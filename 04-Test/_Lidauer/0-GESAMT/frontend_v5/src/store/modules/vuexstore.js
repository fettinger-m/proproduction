import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';
import CalendarComp from "@/pages/ProjectsCalendar/CalendarComp";

//----STATES
//App-level state/data
const state = {
    projects: [],
    events: [],
    tableview: {},
    userdetails: [],

    locations: [],
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


    //MAYBE WONT NEED

    //---DOCUMENTS
    //allDocuments: (state, currproject) => state.projects[currproject.id].documents,

    //---SHOTLIST:
    //allShotLists: (state, currproject) => state.projects[currproject.id].shotlists,

    //---LOCATIONS
    //allLocations: (state, currproject) => state.projects[currproject.id].locations,
    allLocations: state => state.locations,


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

        commit('updateProjectMut', response.data);
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
        const response = await axios.put(
            `http://localhost:3000/calendarevents/${updEvent.id}`,
            updEvent
        );

        // eslint-disable-next-line no-console
        console.log(response.data);

        commit('updateEventMut', response.data);

        CalendarComp.methods.resetSelectedDate(updEvent)
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
    async fetchDocuments({commit}, payload) {
        const response = await axios.get(
            `http://localhost:3000/projects/${payload.projId}/documents`
        );

        payload.documents = response.data

        commit('setDocuments', payload);
        // eslint-disable-next-line no-console
        console.log(response.data)
    },
    async addDocument({commit}, payload) {
        const response = await axios.post(
            `http://localhost:3000/projects/${payload.projId}/documents`,
            payload.document
        );

        payload.document = response.data

        commit('addDocumentTab', payload);
    },
    async deleteDocument({commit}, payload) {
        await axios.delete(`http://localhost:3000/projects/${payload.projId}/documents/${payload.docId}`);

        commit('removeDoc', payload);
    },
    async updateDocument({commit}, payload) {
        const response = await axios.put(
            `http://localhost:3000/projects/${payload.projId}/documents`,
            payload.updDocument
        );

        payload.updDocument = response.data

        commit('updateDocumentMut', payload);
    },

    //---SHOTLIST
    async fetchShotlists({commit}, payload) {
        const response = await axios.get(
            `http://localhost:3000/projects/${payload.projId}/shotlists`
        );

        payload.shotlists = response.data

        commit('setShotlists', payload);
        // eslint-disable-next-line no-console
        console.log(response.data)
    },
    async addShotlist({commit}, payload) {
        const response = await axios.post(
            `http://localhost:3000/projects/${payload.projId}/shotlists`,
            payload.shotlist
        );

        payload.shotlist = response.data

        commit('addShotlistMut', payload);
    },
    async deleteShotlist({commit}, payload) {
        await axios.delete(`http://localhost:3000/projects/${payload.projId}/shotlists/${payload.shotlistId}`);

        commit('removeShotlist', payload);
    },
    async updateShotlist({commit}, payload) {
        const response = await axios.put(
            `http://localhost:3000/projects/${payload.projId}/shotlists`,
            payload.updShotlist
        );

        payload.updShotlist = response.data

        commit('updateShotlistMut', payload);
    },
    async addShot({commit}, payload) {
        const response = await axios.post(
            `http://localhost:3000/projects/${payload.projId}/shotlists/${payload.shotlistId}`,
            payload.shot
        );

        payload.shot = response.data

        commit('addShotMut', payload);
    },
    async deleteShot({commit}, payload) {
        await axios.delete(`http://localhost:3000/projects/${payload.projId}/shotlists/${payload.shotlistId}/shots/${payload.shotId}`);

        commit('removeShot', payload);
    },
    async updateShot({commit}, payload) {
        const response = await axios.put(
            `http://localhost:3000/projects/${payload.projId}/shotlists/${payload.shotlistId}/shots`,
            payload.updShot
        );

        payload.updShot = response.data

        commit('updateShotMut', payload);
    },

    //---CONTACTS
    async addContact({commit}, contact) {
        const response = await axios.post(
            'http://localhost:3000/contacts',
            contact
        );
        commit(response.data)
    },
    async updateContact({commit}, updContact) {
        const response = await axios.put(
            `http://localhost:3000/contacts/${updContact.id}`,
            updContact
        );
        commit(response.data);
    },
    async deleteContact({commit}, id) {
        await axios.delete(`http://localhost:3000/contacts/${id}`);
        commit(id);
    },

    //---LOCATION
    async fetchLocations({commit}) {
        const response = await axios.get(
            'http://localhost:3000/locations'
        );
        commit('setLocations', response.data);
        // eslint-disable-next-line no-console
        console.log(response.data)
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
    async deleteLocation({commit}, id) {
        await axios.delete(`http://localhost:3000/locations/${id}`);
        commit('removeLocation', id);
    },


    //---MEDIA


    //--USERDETAILS - finished
    async fetchUserdetails({commit}) {
        const response = await axios.get(
            'http://localhost:3000/userdetails'
        );
        commit('setUserdetails', response.data);
    },
    async updateUserdetails({commit}, updUserdetails) {
        const response = await axios.put(
            `http://localhost:3000/userdetails`,
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
        (state, payload) => state.projects.find(project => project.id === payload.projId).shotlists.find(shotlist => shotlist.id === payload.shotlistId).push(payload.shot),
    removeShot: (state, payload) => state.projects.find(project => project.id === payload.projId).shotlists.find(shotlist => shotlist.id === payload.shotlistId).shots =
        state.projects.find(project => project.id === payload.projId).shotlists.find(shotlist => shotlist.id === payload.shotlistId).shots.filter(shot => shot.id !== payload.shotId),
    updateShotMut: (state, payload) => {
        const index = state.projects.find(project => project.id === payload.projId).shotlists.find(shotlist => shotlist.id === payload.shotlistId).shots.findIndex(shot => shot.id === payload.updShot.id);
        if (index !== -1) {
            state.projects.find(project => project.id === payload.projId).shotlists.find(shotlist => shotlist.id === payload.shotlistId).shots.splice(index, 1, payload.updShot);
        }
    },


    //---CONTACTS
    //wont need

    //---LOCATION
    //only used for testing
    setLocations: (state, locations) => (state.locations = locations),

    setLocations2: (state, projId, locations) => (state.projects.find(project => project.id === projId).locations = locations),
    addLocation: (state, projId, location) => state.projects.find(project => project.id === projId).locations.push(location),
    removeLocation: (state, projId, locId) =>
        state.projects.find(project => project.id === projId).locations =
            state.projects.find(project => project.id === projId).locations.filter(location => location.id !== locId),


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