

import {store} from '../store.js'
import MainArea from '../components/MainArea.vue';
import NotFound from '../components/NotFound.vue'


var routes = [
  {path: "/",component: MainArea, name: 'root'},
  {path: "/chat/:uuid",component: MainArea, name:'chat'},
  {path: "/404",component: NotFound},
];
export default routes;
