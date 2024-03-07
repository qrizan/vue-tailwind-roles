import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import Pagination from 'v-pagination-3';
import Forbidden from './views/Forbidden.vue';

import router from './router';
import mixins from './mixins';


const app = createApp(App)

const options = {
    timeout: 1000
};

app.component('pagination', Pagination);
app.component('forbidden', Forbidden);

app.use(Toast, options);

app.use(router)

app.mixin(mixins)

app.mount('#app')
