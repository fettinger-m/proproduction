import Vuex from 'vuex';
import Vue from 'vue';
import test from './modules/test';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    strict: true,
    modules: {
        test
    }
});