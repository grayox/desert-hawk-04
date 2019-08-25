import { MaterialUIRoutes } from 'main/content/components/material-ui/MaterialUIRoutes';
import { FuseLoadable } from '@fuse';
// import { getComponentsNavConfig, } from 'app/config/AppConfig'; // my add

// const items = getComponentsNavConfig().map( item => ({
//   path: item.url,
//   component: FuseLoadable({
//     // none of the following work
//     // loader: () => import(item.path)
//     // loader: () => import('app/views/dashboard/Dashboard')
//     // loader: () => import(`${item.path}`)
//     // loader: async () => await import(item.path) // per http://2ality.com/2017/01/import-operator.html
//     // we will attempt the following
//     // loader: item.loader
//     // https://webpack.js.org/guides/code-splitting/#dynamic-imports
//   })
// }));

const items = [
  // {
  //   path: '/login',
  //   component: FuseLoadable({
  //     loader: () => import('main/content/login/Login')
  //   }),
  // },
  // {
  //   path: '/dashboard',
  //   component: FuseLoadable({
  //     loader: () => import('app/views/dashboard/DashboardContainer')
  //   }),
  // },
  // {
  //   path: '/inbox',
  //   component: FuseLoadable({
  //     loader: () => import('app/containers/Inbox')
  //   }),
  // },
  // {
  //   path: '/archive',
  //   component: FuseLoadable({
  //     loader: () => import('app/views/app/archive/Archive')
  //   }),
  // },
  // {
  //   path: '/outbox',
  //   component: FuseLoadable({
  //     loader: () => import('app/views/app/outbox/Outbox')
  //   }),
  // },
  // {
  //   path: '/contacts',
  //   component: FuseLoadable({
  //     loader: () => import('app/views/app/contacts/Contacts')
  //   }),
  // },
  // {
  //   path: '/settings',
  //   component: FuseLoadable({
  //     loader: () => import('app/views/settings/Settings')
  //   }),
  // },
  // {
  //   path: '/feedback',
  //   component: FuseLoadable({
  //     loader: () => import('app/views/feedback/Feedback')
  //   }),
  // },
  // {
  //   path: '/help',
  //   component: FuseLoadable({
  //     loader: () => import('app/views/Help')
  //   }),
  // },
  // {
  //   path: '/logout',
  //   component: FuseLoadable({
  //     loader: () => import('app/views/Logout')
  //   }),
  // },
]


export const ComponentsConfig = {
  routes: [
    ...MaterialUIRoutes,
    ...items,
  ]
};