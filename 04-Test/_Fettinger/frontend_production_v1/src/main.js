import BootstrapVue from 'bootstrap-vue'

import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './css/custom.css'

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBHIgNaKUxhQuNYMydcXPntvtssOt8qoxU",
    libraries: "places" // necessary for places input
  }
});


import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.component('font-awesome-icon', FontAwesomeIcon);



library.add(fas, far, fab);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');