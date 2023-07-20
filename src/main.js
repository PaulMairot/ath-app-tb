import { createApp } from 'vue'
import './assets/fonts/Satoshi/css/satoshi.css'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHashHistory} from 'vue-router'

import Home from './pages/Home.vue'
import Race from './pages/Race.vue';
import Performance from './pages/Performance.vue';
import Meeting from './pages/Meeting.vue';
import Races from './pages/Races.vue';
import Meetings from './pages/Meetings.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/race/:id', component: Race },
  { path: '/performance/:id', component: Performance },
  { path: '/meeting/:id', component: Meeting },
  { path: '/races', component: Races },
  { path: '/meetings', component: Meetings }
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})
  
  // 5. Create and mount the root instance.
  const app = createApp(App)
  // Make sure to _use_ the router instance to make the
  // whole app router-aware.
  app.use(router)
  
  app.mount('#app')


