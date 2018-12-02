// categoryItems
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const firebaseConfig = {
  apiKey: "AIzaSyAOEXILaYcxjmJsJ81_WfubS_h3AQ3lLdA",
  authDomain: "green-comet-e2c85.firebaseapp.com",
  databaseURL: "https://green-comet-e2c85.firebaseio.com",
  projectId: "green-comet-e2c85",
  storageBucket: "green-comet-e2c85.appspot.com",
  messagingSenderId: "682044250674"
}

// export const fuseLoadableConfig = {
//   // import {fuseLoadableConfig} from 'my-app/config/AppConfig.js'
//   // const { delay, timeout } = fuseLoadableConfig;
//   // add src/@fuse/components/FuseLoadable/FuseLoadable.js to xfer.txt
//   delay  : 300,
//   timeout: 10000,
// }

export const logoPath = 'assets/images/logos/fuse.svg' // public/assets/images/logos/fuse.svg

export const tagLine = 'Give leads. Get leads.'

export const desc = 'Real estate agents, mortgage brokers, insurance agents and financial planners need leads. Referrals are a good way to get them. Swap lets you turn your customers into referrals and get back referrals in exchange.'

export const bizCategoryItems = [
  { value: 'home', label: 'Home', icon: HomeIcon },
  { value: 'mortgage', label: 'Mortgage', icon: AccountBalanceIcon },
  { value: 'financial', label: 'Financial', icon: AssessmentIcon },
  { value: 'insurance', label: 'Insurance', icon: AssignmentIcon },
]

// sync
// src/fuse-configs/fuseNavigationConfig.js
// src/main/content/components/ComponentsConfig.js
export const componentsNavConfig = [
  // * Note: It is currently not possible to use expressions like `loader : () => import(item.path)`
  // The path must be hard coded. See https://github.com/jamiebuilds/react-loadable
  {
    id     : 'dashboard',
    title  : 'Dashboard',
    type   : 'item',
    icon   : 'dashboard',
    url    : '/dashboard',
    path   : 'my-app/layouts/dashboard/Dashboard', // *
    // loader : () => import('my-app/layouts/dashboard/Dashboard'),
  },
  {
    id    : 'inbox',
    title : 'Inbox',
    type  : 'item',
    icon  : 'cloud_download',
    url   : '/inbox',
    path  : 'my-app/containers/inbox/InboxContainer',
  },
  {
    id    : 'archive',
    title : 'Archive',
    type  : 'item',
    icon  : 'save',
    url   : '/archive',
    path  : 'my-app/layouts/archive/Archive',
  },
  {
    id    : 'outbox',
    title : 'Outbox',
    type  : 'item',
    icon  : 'cloud_upload',
    url   : '/outbox',
    path  : 'my-app/layouts/outbox/Outbox',
  },
  {
    id    : 'contacts',
    title : 'Contacts',
    type  : 'item',
    icon  : 'contacts',
    url   : '/contacts',
    path  : 'my-app/layouts/contacts/Contacts',
  },
  {
    id    : 'feedback',
    title : 'Feedback',
    type  : 'item',
    icon  : 'feedback',
    url   : '/feedback',
    path  : 'my-app/layouts/feedback/Feedback',
  },
  {
    id    : 'settings',
    title : 'Settings',
    type  : 'item',
    icon  : 'settings',
    url   : '/settings',
    path  : 'my-app/layouts/settings/Settings',
  },
]
