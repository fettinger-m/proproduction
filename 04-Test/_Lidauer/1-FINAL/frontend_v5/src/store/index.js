import Vuex from 'vuex';
import Vue from 'vue';

import vuexstore from './modules/vuexstore';
// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    strict: false,
    modules: {
        vuexstore
    }
});