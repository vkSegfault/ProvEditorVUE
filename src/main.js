import './assets/main.css';

import router from './router/index.js';  // auto loads index.js from 'router' dir

import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura'

import Toast from 'vue-toastification';
// import 'vue-toastification/dist/index.css'   // official without customization
import './css/toastcustom.scss'

import vue3GoogleLogin from 'vue3-google-login'
import OpenLayersMap from "vue3-openlayers";

import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'

const store = createStore({
    state() {
        return {
            logged_in: false
        }
    },
    mutations: {
        login (state) {
            state.logged_in = true
        },
        logout (state) {
            state.logged_in = false
        }
    }
})

const app = createApp(App)

app.use(store)
app.use(router);
app.use(Toast, {
    position: "top-center",
});
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(vue3GoogleLogin, {
    clientId: '592195124025-6g06a3tddd3fpu494rsrplopn83f7jb2.apps.googleusercontent.com'
})
app.use(OpenLayersMap /*, options */);

app.mount('#app')