import Vuex from 'vuex';
import Vue from 'vue';

import module from './modules/module';
// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    // ...
    strict: false,
    modules: {
        module
    }
});