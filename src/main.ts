import { createApp } from 'vue'
import App from './App.vue'
const VueAnalytics = require('vue-analytics').default

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App)
app.use(VueAnalytics, {
  id: 'UA-217737194-1'
})
app.mount('#app')
