import { createApp } from 'vue';
import { BIconChevronDoubleDown } from 'bootstrap-icons-vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.component('BIconChevronDoubleDown', BIconChevronDoubleDown);
app.use(router).mount('#app');
