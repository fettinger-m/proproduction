
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//Bootstrap
import BootstrapVue from 'bootstrap-vue'

//IMPORT von Bootstrap CSS Files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//IMPORT der eigenen CSS Files
import './css/custom.css'
Vue.use(BootstrapVue);

//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(fas, far, fab);

//DatePicker
import datePicker from 'vue-bootstrap-datetimepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
Vue.use(datePicker);



import 'vue2-dropzone/dist/vue2Dropzone.min.css'

//Axios
import axios from 'axios'
Vue.prototype.$http = axios;

//Vuex
import store from './store';

//File Agent
import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
Vue.use(VueFileAgent, VueFileAgentStyles);

//Google Maps
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBHIgNaKUxhQuNYMydcXPntvtssOt8qoxU",
    libraries: "places" // necessary for places input
  }
});

//Vue Sortable
import Sortable from 'vue-sortable'
Vue.use(Sortable)

//Vue-grid-layout
import VueGridLayout from 'vue-grid-layout';
Vue.use(VueGridLayout);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');