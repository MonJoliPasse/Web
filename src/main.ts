import { createApp } from 'vue'
import App from './App.vue'
import VueGtag from 'vue-gtag'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App)
app.use(VueGtag,{ config :   {
  id: 'UA-217737194-1'
}})
app.use(BootstrapIconsPlugin);

app.mount('#app')
