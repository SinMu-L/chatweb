import ContainerTemplate from '../components/ContainerTemplate.vue'
import NotFound from '../components/NotFound.vue'
import Home from '../components/Home.vue'

var routes = [
  {path: "/", name: 'root', component: Home },
  {path: "/chat/:uuid?", component:ContainerTemplate, name:'chat'},
  { path: '/404', name: 'not_found', component: NotFound } // 捕获所有未匹配的路径
];
export default routes;
