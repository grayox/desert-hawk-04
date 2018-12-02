import { MaterialUIRoutes } from 'main/content/components/material-ui/MaterialUIRoutes';
import { FuseLoadable } from '@fuse';
// import { componentsNavConfig } from 'my-app/config/AppConfig.js'; // my add

// const items = componentsNavConfig.map( item => ({
//   path: item.url,
//   component: FuseLoadable({
//     // none of the following work
//     // loader: () => import(item.path)
//     // loader: () => import('my-app/layouts/dashboard/Dashboard')
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
      loader: () => import('my-app/layouts/dashboard/Dashboard')
    }),
  },
  {
    path: '/inbox',
    component: FuseLoadable({
      loader: () => import('my-app/containers/inbox/InboxContainer')
    }),
  },
  {
    path: '/archive',
    component: FuseLoadable({
      loader: () => import('my-app/layouts/archive/Archive')
    }),
  },
  {
    path: '/outbox',
    component: FuseLoadable({
      loader: () => import('my-app/layouts/outbox/Outbox')
    }),
  },
  {
    path: '/contacts',
    component: FuseLoadable({
      loader: () => import('my-app/layouts/contacts/Contacts')
    }),
  },
  {
    path: '/feedback',
    component: FuseLoadable({
      loader: () => import('my-app/layouts/feedback/Feedback')
    }),
  },
  {
    path: '/settings',
    component: FuseLoadable({
      loader: () => import('my-app/layouts/settings/Settings')
    }),
  },
]


export const ComponentsConfig = {
  routes: [
    ...MaterialUIRoutes,
    ...items,
  ]
};