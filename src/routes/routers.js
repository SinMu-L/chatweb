

import {store} from '../store.js'
import MainArea from '../components/MainArea.vue';
import About from '../components/setting/About.vue'


var routes = [
  {path: "/",component: MainArea},
  {path: "/chat/:uuid",component: MainArea},

];
export default routes;
