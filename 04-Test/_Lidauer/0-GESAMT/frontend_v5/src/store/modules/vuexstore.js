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

    //---EVENTS - finished
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

    //---TABLEVIEW - finished
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

    //---DOCUMENTS TODO - to check
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
    async updateDocument({commit}, currproject, updDocument) {
        const response = await axios.put(
            `http://localhost:3000/projects/${currproject.id}/documents`,
            updDocument
        );
        // eslint-disable-next-line no-console
        console.log(response.data);
        commit('updateDocumentMut', currproject, updDocument);
    },

    //---SHOTLIST TODO - to check
    async fetchShotlists({commit}, currproject) {
        const response = await axios.get(
            `http://localhost:3000/projects/${currproject.id}/shotlists`
        );
        commit('setShotlists', currproject, response.data);
        // eslint-disable-next-line no-console
        console.log(response.data)
    },
    async addShotlist({commit}, currproject) {
        const response = await axios.post(
            `http://localhost:3000/projects/${currproject.id}/shotlists`,
            {}
        );

        commit('addShotlistMut', currproject, response.data);
    },
    async deleteShotlist({commit}, currproject, index) {
        await axios.delete(`http://localhost:3000/projects/${currproject.id}/shotlists/${index}`);

        commit('removeShotlist', currproject, index);
    },
    async updateShotlist({commit}, currproject, updShotlist) {
        const response = await axios.put(
            `http://localhost:3000/projects/${currproject.id}/shotlists`,
            updShotlist
        );
        // eslint-disable-next-line no-console
        console.log(response.data);
        commit('updateShotlistMut', currproject, updShotlist);
    },
    async addShot({commit}, currproject, currshotlist) {
        const response = await axios.post(
            `http://localhost:3000/projects/${currproject.id}/shotlists/${currshotlist.id}`,
            {}
        );

        commit('addShotMut', currproject, currshotlist, response.data);
    },
    async deleteShot({commit}, currproject, currshotlist, index) {
        await axios.delete(`http://localhost:3000/projects/${currproject.id}/shotlists/${currshotlist.id}/shots/${index}`);

        commit('removeShot', currproject, currshotlist, index);
    },
    async updateShot({commit}, currproject, currshotlist, updShot) {
        const response = await axios.put(
            `http://localhost:3000/projects/${currproject.id}/shotlists/${currshotlist.id}/shots`,
            updShot
        );
        // eslint-disable-next-line no-console
        console.log(response.data);
        commit('updateShotMut', currproject, currshotlist, updShot);
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

    //---DOCUMENTS TODO - to check
    setDocuments: (state, projId, documents) => (state.projects.find(project => project.id === projId).documents = documents),
    addDocumentTab: (state, projId, document) => state.projects.find(project => project.id === projId).documents.push(document),
    removeDoc: (state, projId, docId) => state.projects.find(project => project.id === projId).documents = state.projects.find(project => project.id === projId).documents.filter(document => document.id !== docId),
    updateDocumentMut: (state, projId, updDocument) => {
        const index = state.projects.find(project => project.id === projId).documents.findIndex(document => document.id === updDocument.id)

        if (index !== -1) {
            state.projects.find(project => project.id === projId).documents.splice(index, 1, updDocument);
        }
    },


    //---SHOTLIST TODO - to check
    setShotlists: (state, projId, shotlists) => (state.projects.find(project => project.id === projId).shotlists = shotlists),
    addShotlistMut:
        (state, projId, shotlist) => state.projects.find(project => project.id === projId).shotlists.push(shotlist),
    removeShotlist: (state, projId, shotlistId) => state.projects.find(project => project.id === projId).shotlists =
        state.projects.find(project => project.id === projId).shotlists.filter(shotlist => shotlist.id !== shotlistId),
    updateShotlistMut:
        (state, projId, updShotlist) => {
            const index = state.projects.find(project => project.id === projId).shotlists.findIndex(shotlist => shotlist.id === updShotlist.id)
            if (index !== -1) {
                state.projects.find(project => project.id === projId).shotlists.splice(index, 1, updShotlist);
            }
        },

    //Shots
    addShotMut:
        (state, projId, shotlistId, shot) => state.projects.find(project => project.id === projId).shotlists.find(shotlist => shotlist.id === shotlistId).push(shot),
    removeShot: (state, projId, shotlistId, shotId) => state.projects.find(project => project.id === projId).shotlists.find(shotlist => shotlist.id === shotlistId).shots =
        state.projects.find(project => project.id === projId).shotlists.find(shotlist => shotlist.id === shotlistId).shots.filter(shot => shot.id !== shotId),
    updateShotMut: (state, projId, shotlistId, updShot) => {
        const index = state.projects.find(project => project.id === projId).shotlists.find(shotlist => shotlist.id === shotlistId).shots.findIndex(shot => shot.id === updShot.id);
        if (index !== -1) {
            state.projects.find(project => project.id === projId).shotlists.find(shotlist => shotlist.id === shotlistId).shots.splice(index, 1, updShot);
        }
    },

    //---CONTACTS
    //wont need

    //---LOCATION
    setLocations: (state, projId, locations) => (state.projects.find(project => project.id === projId).locations = locations),
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