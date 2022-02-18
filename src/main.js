import { createApp } from 'vue';
// Bootstrap
import 'bootstrap';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

// Font awesome
import fontawesome from '@fortawesome/fontawesome-free/js/all';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBalanceScale, faMedal, faLeaf, faKiwiBird,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Components
import Loading from '@/components/Loading.vue';
import BsAlert from '@/components/Alert.vue';

import mitt from '@/scripts/mitt';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';

library.add(faBalanceScale, faMedal, faLeaf, faKiwiBird);

const app = createApp(App);
app.config.globalProperties.$emitter = mitt;

app.use(BootstrapIconsPlugin);
app.use(VueAxios, axios);
app.use(fontawesome);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('Loading', Loading);
app.component('BsAlert', BsAlert);
app.use(router).mount('#app');
