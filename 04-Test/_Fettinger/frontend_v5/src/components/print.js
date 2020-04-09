//----STATES
//App-level state/data
const state = {
    pupils: [],
};

//----GETTERS
//Get pieces of state or computed values from state
const getters = {
    allPupils: state => state.pupils,
};

//----ACTIONS
//Called from components to commit a mutation
const actions = {
    async addPupil({commit}, pupil) {
        const response = await client.post(
            `/pupils`, pupil
        );

        commit('addPupilMutation', response);
    },
};

//----MUTATIONS
//Mutate the state (Update data, etc)
const mutations = {
    addPupilMutation: (state, pupil) => state.pupils.push(pupil),
};

//Export
export default {
    state,
    getters,
    actions,
    mutations
};