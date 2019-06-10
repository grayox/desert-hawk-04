import { MaterialUIRoutes } from 'main/content/components/material-ui/MaterialUIRoutes';
import { FuseLoadable } from '@fuse';
// import { getComponentsNavConfig, } from 'my-app/config/AppConfig'; // my add

// const items = getComponentsNavConfig().map( item => ({
//   path: item.url,
//   component: FuseLoadable({
//     // none of the following work
//     // loader: () => import(item.path)
//     // loader: () => import('my-app/views/app/dashboard/Dashboard')
//     // loader: () => import(`${item.path}`)
//     // loader: async () => await import(item.path) // per http://2ality.com/2017/01/import-operator.html
//     // we will attempt the following
//     // loader: item.loader
//     // https://webpack.js.org/guides/code-splitting/#dynamic-imports
//   })
// }));

const items = [
  {
    path: '/login',
    component: FuseLoadable({
      loader: () => import('main/content/login/Login')
    }),
  },
  {
    path: '/dashboard',
    component: FuseLoadable({
      loader: () => import('my-app/views/app/dashboard/Dashboard')
    }),
  },
  {
    path: '/inbox',
    component: FuseLoadable({
      loader: () => import('my-app/containers/Inbox')
    }),
  },
  {
    path: '/archive',
    component: FuseLoadable({
      loader: () => import('my-app/views/app/archive/Archive')
    }),
  },
  {
    path: '/outbox',
    component: FuseLoadable({
      loader: () => import('my-app/views/app/outbox/Outbox')
    }),
  },
  {
    path: '/contacts',
    component: FuseLoadable({
      loader: () => import('my-app/views/app/contacts/Contacts')
    }),
  },
  {
    path: '/settings',
    component: FuseLoadable({
      loader: () => import('my-app/views/overhead/settings/Settings')
    }),
  },
  {
    path: '/feedback',
    component: FuseLoadable({
      loader: () => import('my-app/views/overhead/feedback/Feedback')
    }),
  },
  {
    path: '/help',
    component: FuseLoadable({
      loader: () => import('my-app/views/overhead/Help')
    }),
  },
]


export const ComponentsConfig = {
  routes: [
    ...MaterialUIRoutes,
    ...items,
  ]
};