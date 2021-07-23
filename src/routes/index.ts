import loadable from '@loadable/component';
import { RouteConfig } from 'react-router-config';
import Home from '@pages/Home';
const routesConfig: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: loadable(() => import('@pages/Login'))
  },
  {
    exact: true,
    path: '/login',
    component: Home
  }
];
export default routesConfig;
