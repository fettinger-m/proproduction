import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';
import CalendarComp from "@/pages/ProjectsCalendar/CalendarComp";

//----STATES
//App-level state/data
const state = {
    projects: [],
    events: [],
    tableview: {},
    locations: [],
    userdetails: [],
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

    //---SHOTLIST:
    //allShotLists: (state, currproject) => state.projects[currproject.id].shotlists,

    //---LOCATIONS
    //allLocations: (state, currproject) => state.projects[currproject.id].locations,
    allLocations: state => state.locations,

    //--USERDETAILS
    allUserdetails: state => state.userdetails,
};

//----ACTIONS
//Called from components to commit a mutation
const actions = {

    //---PROJECTS - TODO - update / insert problem
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
    //fetchShots ???
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

    //---MOODBOARD

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
    updateDocumentMut: (state, currproject, updDocument) => {
        const index = state.projects[currproject.id].documents.findIndex(document => document.id === updDocument.id);
        if (index !== -1) {
            state.events.splice(index, 1, updDocument);
        }
    },

    //---SHOTLIST TODO - to check
    setShotlists: (state, currproject, shotlists) => (state.projects[currproject.id].shotlists = shotlists),
    addShotlistMut:
        (state, currproject, shotlist) => state.projects[currproject.id].shotlists.push(shotlist),
    removeShotlist:
        (state, currproject, index) => (state.projects[currproject.id].shotlists = state.projects[currproject.id].shotlists.filter(shotlist => shotlist.id !== index)),
    updateShotlistMut:
        (state, currproject, updShotlist) => {
            const index = state.projects[currproject.id].shotlists.findIndex(shotlist => shotlist.id === updShotlist.id);
            if (index !== -1) {
                state.projects[currproject.id].shotlists.splice(index, 1, updShotlist);
            }
        },
    addShotMut:
        (state, currproject, currshotlist, shot) => state.projects[currproject.id].shotlists[currshotlist.id].shots.push(shot),
    removeShot:
        (state, currproject, currshotlist, index) => (state.projects[currproject.id].shotlists[currshotlist.id].shots = state.projects[currproject.id].shotlists[currshotlist.id].shots.filter(shot => shot.id !== index)),
    updateShotMut: (state, currproject, currshotlist, updShot) => {
        const index = state.projects[currproject.id].shotlists[currshotlist.id].shots.findIndex(shot => shot.id === updShot.id);
        if (index !== -1) {
            state.projects[currproject.id].shotlists[currshotlist.id].shots.splice(index, 1, updShot);
        }
    },

    //---MOODBOARD

    //---CONTACTS
    //wont need

    //---LOCATION
    setLocations: (state, locations) => (state.locations = locations),
    addLocation: (state, location) => state.locations.push(location),
    removeLocation: (state, key) =>
        (state.locations = state.locations.filter(location => location.key !== key)),

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