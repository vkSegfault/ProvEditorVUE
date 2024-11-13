import './assets/main.css';
import router from './router/index.js';  // auto loads index.js from 'router' dir

import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura'

import Toast from 'vue-toastification';
// import 'vue-toastification/dist/index.css'   // official without customization
import './css/toastcustom.scss'


import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(router);
app.use(Toast, {
    position: "top-center",
});
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.mount('#app')