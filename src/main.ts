import { createApp } from 'vue'
import App from './App.vue'
const VueGtag = require('vue-gtag').default

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App)
app.use(VueGtag,{ config :   {
  id: 'UA-217737194-1'
}})
app.mount('#app')
