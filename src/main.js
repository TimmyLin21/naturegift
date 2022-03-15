import { createApp } from 'vue';
// Bootstrap
import 'bootstrap';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

// Font awesome
import fontawesome from '@fortawesome/fontawesome-free/js/all';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBalanceScale, faMedal, faLeaf, faKiwiBird, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Components
import Loading from '@/components/Loading.vue';
import BsAlert from '@/components/Alert.vue';

// Scripts
import mitt from '@/scripts/mitt';
import { date, currency } from '@/scripts/filters';

// Veevalidate
import {
  Form, Field, ErrorMessage, defineRule,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';

import axios from 'axios';
import VueAxios from 'vue-axios';
import CKEditor from '@ckeditor/ckeditor5-vue';
import App from './App.vue';
import router from './router';

library.add(faBalanceScale, faMedal, faLeaf, faKiwiBird, faTimes);

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

const app = createApp(App);
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
app.use(fontawesome);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('Loading', Loading);
app.component('BsAlert', BsAlert);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.use(router).mount('#app');
