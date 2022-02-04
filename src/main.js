import { createApp } from 'vue';
import 'bootstrap';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBalanceScale, faMedal, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';

library.add(faBalanceScale, faMedal, faLeaf);
const app = createApp(App);
app.use(BootstrapIconsPlugin);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router).mount('#app');
