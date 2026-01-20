import { createApp } from 'vue';
// Bootstrap
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

// Font awesome
// import fontawesome from '@fortawesome/fontawesome-free/js/all';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBalanceScale, faMedal, faLeaf, faKiwiBird, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Components

// Scripts

// Veevalidate
import {
  Form, Field, ErrorMessage, defineRule,
} from 'vee-validate';
import { all } from '@vee-validate/rules';

// wow.js
import Wow from 'wow.js';
import 'animate.css';

import swal from 'sweetalert';
import axios from 'axios';
import VueAxios from 'vue-axios';
import CKEditor from '@ckeditor/ckeditor5-vue';
import { date, currency } from '@/scripts/filters.js';
import mitt from '@/scripts/mitt.js';
import BsAlert from '@/components/Alert.vue';
import Loading from '@/components/Loading.vue';
import App from './App.vue';
import router from './router';

library.add(faBalanceScale, faMedal, faLeaf, faKiwiBird, faTimes);

Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule);
});

const app = createApp(App);
app.config.globalProperties.$swal = swal;
app.config.globalProperties.$emitter = mitt;
app.config.globalProperties.$filters = {
  date,
  currency,
};
// Make injections reactively
app.config.unwrapInjectedRef = true;

app.use(BootstrapIconsPlugin);
app.use(VueAxios, axios);
app.use(CKEditor);
// app.use(fontawesome);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.component('Loading', Loading);
app.component('BsAlert', BsAlert);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.use(router).mount('#app');
new Wow({
  animateClass: 'animate__animated',
}).init();
