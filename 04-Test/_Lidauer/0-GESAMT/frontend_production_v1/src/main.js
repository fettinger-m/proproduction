
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
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


//Axios
import axios from 'axios'
Vue.prototype.$http = axios;

//Vuex

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


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');