import React from 'react';
// import React, { Component } from 'react';
// import PropTypes from "prop-types";
// import { Typography, } from '@material-ui/core'; // withStyles,

// firebase
// import { firestoreConnect } from 'react-redux-firebase';

// fuse
import { FuseLoadable } from '@fuse';

// redux
// import { connect } from 'react-redux';
// import { compose } from 'redux';

// utilities
import _ from '@lodash';

// creatable
// import UserMultiForm from 'my-app/components/forms/UserMultiForm';

// categoryItems
// import HomeIcon from '@material-ui/icons/Home';
// import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
// import AssessmentIcon from '@material-ui/icons/Assessment';
// import AssignmentIcon from '@material-ui/icons/Assignment';

// logout
// alt icons
// install https://www.npmjs.com/package/react-icons
// icons   https://react-icons.netlify.com/#/
import { IconContext } from "react-icons"; // my add
// MenuItem><FiLogOut /><span className="ml-12">FiLogOut</span></MenuItem>
// MenuItem><IoMdLogOut /><span className="ml-12">IoMdLogOut</span></MenuItem>
// MenuItem><FaSignOutAlt /><span className="ml-12">FaSignOutAlt</span></MenuItem>
// MenuItem><IoIosLogOut /><span className="ml-12">IoIosLogOut</span></MenuItem>
// MenuItem><GoSignOut /><span className="ml-12">GoSignOut</span></MenuItem>
import { FaSignOutAlt } from 'react-icons/fa'; // https://react-icons.netlify.com/#/
// import { FiLogOut } from 'react-icons/fi'; // https://react-icons.netlify.com/#/
// import { GoSignOut, } from 'react-icons/go'; // https://react-icons.netlify.com/#/
// import { IoIosLogOut, IoMdLogOut, } from 'react-icons/io'; // https://react-icons.netlify.com/#/

// utility components
// import CRUDRouter from 'my-app/layouts/crud/CRUDRouter';

// usage
// import { uiSpecs } from 'my-app/config/AppConfig';
export const uiSpecs = {
  drawerWidth: 256, // https://material.io/design/components/navigation-drawer.html#specs
  // appBarHeight:  64, // 64 per MUI theme // 56 per spec: https://material.io/design/components/app-bars-top.html#specs
  // bottomNavHeight:  56,
  maxCharsForDetailItemField: 40,
}

export const firebaseConfig = {
  apiKey: "AIzaSyAOEXILaYcxjmJsJ81_WfubS_h3AQ3lLdA",
  authDomain: "green-comet-e2c85.firebaseapp.com",
  databaseURL: "https://green-comet-e2c85.firebaseio.com",
  projectId: "green-comet-e2c85",
  storageBucket: "green-comet-e2c85.appspot.com",
  messagingSenderId: "682044250674",
}

export const defaultSettings = {
  // placeholeder only for now
  // prevents import error at userDataReducer.js
  // experimenting with replacement by settingsConfig
}

export const settingsConfig = {
  // define default settings
  // name: undefined,
  // email: undefined,
  // mobile: undefined,
  // businessType: undefined,
  // geoNation: undefined,
  // geoRegion: undefined,
  // geoLocation: undefined,
  autoClaimNewLeads: false,
  autoTextMe: false,
  // autoTextMeToNumber: undefined,
  autoEmailMe: false,
  // autoEmailMeToEmail: undefined,
  autoTextProspect: false,
  // autoTextProspectToNumber: undefined,
  autoEmailProspect: false,
  // autoEmailProspectToEmail: undefined,
  displayAvatar: 'Friendly',
}

export const avatarOptions = [
  { label : 'Friendly'  , value : 'wavatar'   , } ,
  { label : 'Kitty'     , value : 'robohash4' , } ,
  { label : 'Cuddly'    , value : 'adorable'  , } ,
  { label : 'Wacky'     , value : 'monsterid' , } ,
  // { label : 'Metalloid' , value : 'robohash'  , } ,
  { label : 'Metalloid' , value : 'robohash1' , } ,
  { label : 'Humanoid'  , value : 'robohash2' , } ,
  { label : 'Bot'       , value : 'robohash3' , } ,
  // { label : 'Random'    , value : 'robohashx' , } ,
  { label : 'Retro'     , value : 'retro'     , } ,
  { label : 'Pattern'   , value : 'identicon' , } ,
  { label : 'Coded'     , value : 'ui'        , } , // user initials greyscale
  { label : 'Colored'   , value : 'uic'       , } , // user initials with color
  { label : 'Generic'   , value : 'mp'        , } , // user icon (mystery person)
]

export const pickUserFromAuth = auth => {
  const picked = _.pick(auth, userFieldsToPick);
  picked.photoURL = picked.providerData[0].photoURL; // don't know how to get subproperties from _.pick()
  delete picked.providerData; // to prevent errors uploading to firebase
  // console.log('picked', picked);
  // debugger;
  return picked;
}
export const userFieldsToPick = [
  'uid', 'displayName', 'photoURL', 'email', 'emailVerified',
  'phoneNumber', 'isAnonymous', 'lastLoginAt', 'createdAt', 'providerData',
]

// export const fuseLoadableConfig = {
//   // import {fuseLoadableConfig} from 'my-app/config/AppConfig'
//   // const { delay, timeout } = fuseLoadableConfig;
//   // add src/@fuse/components/FuseLoadable/FuseLoadable.js to xfer.txt
//   delay  : 300,
//   timeout: 10000,
// }

export const brand = {
  logoPath: 'assets/images/logos/fuse.svg', // public/assets/images/logos/fuse.svg
  appName: 'Swap',
  tagLine: 'Give leads. Get leads.',
  description: 'Real estate agents, mortgage brokers, insurance agents and financial planners need leads. Referrals are a good way to get them. Swap lets you turn your clients into referrals and get back referrals in exchange.',
}

export const bizCategoryItems = [
  { value : 'home'      , label : 'Home'      , icon : 'home'            } ,
  { value : 'mortgage'  , label : 'Mortgage'  , icon : 'account_balance' } ,
  { value : 'financial' , label : 'Financial' , icon : 'assessment'      } ,
  { value : 'insurance' , label : 'Insurance' , icon : 'assignment'      } ,
]

const formFieldProps = {
  // type must be an HTML5 input type | https://www.w3schools.com/html/html_form_input_types.asp | https://material-ui.com/api/text-field/
  // button|checkbox|color|date|datetime-local|email|file|hidden|image|month|number|password|radio|range|reset|search|submit|tel|text|time|url|week
  name      : { type : 'text' , label : 'Name'       , icon : 'account_circle' , } ,
  firstName : { type : 'text' , label : 'First name' , icon : 'account_circle' , } ,
  lastName  : { type : 'text' , label : 'Last name'  , icon : 'account_circle' , } ,
  nickname  : { type : 'text' , label : 'Nickname'   , icon : 'star'           , } ,
  address   : { type : 'text' , label : 'Address'    , icon : 'home'           , } ,
  zip       : { type : 'text' , label : 'Zip code'   , icon : 'place'          , } ,
  phone     : { type : 'text' , label : 'Phone'      , icon : 'phone'          , } ,
  email     : { type : 'text' , label : 'Email'      , icon : 'email'          , } ,
  company   : { type : 'text' , label : 'Company'    , icon : 'domain'         , } ,
  jobTitle  : { type : 'text' , label : 'Job title'  , icon : 'work'           , } ,
  birthday  : { type : 'date' , label : 'Birthday'   , icon : 'cake'           , InputLabelProps: {shrink: true,},},
  notes     : { type : 'text' , label : 'Notes'      , icon : 'note'           , multiline: true, rows: 5,},
}

const getOnlyAlpha = s => {
  // s: string: 'name*'
  const re = /[a-zA-Z]+/gm;
  const a = s.match(re); // expected result: ['name']
  const str = a[0]; // expected result: 'name'
  return str; // 'name'
}

const getRequiredField = s => {
  // s: string: 'name*'
  const re = /\*/gm;
  const test = re.test(s); // expected result: true|false
  return test; // true
}

const getFormFieldProps = (s, n,) => {
  // s: string: 'name*' // n: number: >=0, index of array element when iterating
  // console.log('s\n', s);
  // console.log('n\n', n);
  const str = getOnlyAlpha(s); // 'name*' => 'name'
  const out = {...formFieldProps[str]};
  // console.log('out\n', out);
  if(!out) return;

  const required = getRequiredField(s);
  out.required = required;
  out.autoFocus = !n; // autofocus on first item (index === 0) only
  out.id = str;
  // console.log('out\n', out);
  return out;
}

export const getForm = arrayOfIds =>
  // arrayOfIds: array of strings: ['name', 'phone', 'email',]
  arrayOfIds.map((id, index,) => getFormFieldProps(id, index,));

export const getCleanFieldNames = a => a.map(s => getOnlyAlpha(s)); // a: arrayOfStrings: ['name*', 'phone', 'email*']

// syncronize: changes in either of the following files must be hard coded in the other
// src/fuse-configs/fuseNavigationConfig.js
// src/main/content/components/ComponentsConfig.js
export const componentsNavConfig = [
  // import { componentsNavConfig } from 'my-app/config/AppConfig';
  // * Note: It is currently not possible to use expressions like `loader : () => import(item.path)`
  // The path must be hard coded in src/my-app/config/Routes.js. See https://github.com/jamiebuilds/react-loadable
  {
    description:
      <span>
        This is your overview of metrics summarizing your use of this app.
      </span>,
    id         : 'dashboard',
    path       : '/dashboard',
    title      : 'Dashboard',
    type       : 'item',
    icon       : 'dashboard',
    bottomNav  : true,
    // see src/my-app/config/Routes.js
    component  : () => FuseLoadable({loader: () => import('my-app/views/app/dashboard/Dashboard')}),
  },
  {
    description:
      <span>
        This is the list of leads that are available for you to move to your archive.
        These leads match your service type and location as you indicated in your settings.
        You must have a positive net lead balance in order for any leads to show in this list.
        Your net lead balance is calculated by subtracting the number of leads you have claimed
        into your archive from the number of lead referrals you have made in your outbox.
        And after all approprite adjustments for disputed leads have be settled.
      </span>,
    id         : 'inbox',
    path       : '/inbox',
    title      : 'Inbox',
    type       : 'item',
    icon       : 'cloud_download',
    bottomNav  : true,
    // see src/my-app/config/Routes.js
    component  : () => FuseLoadable({loader: () => import('my-app/layouts/crud/CRUDRouter')}),
    crudConfig : {
      actionable : () => {},
      condensed  : true    ,
      creatable  : false   ,
      readable   : 'leads' ,
      updatable  : false   ,
      deletable  : true    ,
    },
    dashboardConfig: {
      net: 'decrement',
      withdrawals: 'increment',
      archive: 'increment',
    },
  },
  {
    description:
      <span>
        This is the list of leads you have claimed which you now own in the sense they are now
        exclusive to you only. The total leads in this list are subtracted from the amount of
        lead referrals you have made, after all dispute adjustments are settled, in order to
        determine your net lead balance.
      </span>,
    id         : 'archive',
    path       : '/archive',
    title      : 'Archive',
    type       : 'item',
    icon       : 'folder',
    bottomNav  : true,
    // see src/my-app/config/Routes.js
    component  : () => FuseLoadable({loader: () => import('my-app/layouts/crud/CRUDRouter')}),
    crudConfig : {
      actionable : () => {},
      condensed  : true    ,
      creatable  : false   ,
      readable   : 'leads' ,
      updatable  : false   ,
      deletable  : true    ,
    },
  },
  {
    description:
      <span>
        These are all the leads you have submitted as a referral. The more leads you refer to others,
        the more leads are available to you in your inbox. You must have a positive net lead balance
        in order to have leads available for you to claim.
      </span>,
    id         : 'outbox',
    path       : '/outbox',
    title      : 'Outbox',
    type       : 'item',
    icon       : 'cloud_upload',
    // see src/my-app/config/Routes.js
    component  : () => FuseLoadable({loader: () => import('my-app/layouts/crud/CRUDRouter')}),
    crudConfig : {
      actionable : () => {},
      condensed  : true,
      creatable  : {
        title    : 'Send new referral', // form: <UserMultiForm />,
        path     : 'leads',
        fields   : [ 'name*', 'phone*', 'email*', 'zip*', 'notes', ], // 'name*', 'lastName', 'nickname', 'phone', 'company', 'email*', 'jobTitle', 'birthday', 'address', 'notes',
      },
      readable   : 'leads' ,
      updatable  : {
        title    : 'Edit referral',
        path     : 'leads',
        fields   : [ 'name*', 'phone*', 'email*', 'zip*', 'notes', ],
      },
      deletable  : true,
    },
    dashboardConfig: {
      outbox: 'increment',
    },
  },
  {
    description:
      <span>
        This is the list of your contacts. The people whom you can feel comfortable sending your referrals to.
        They will ultimately be matched to your referrals, just as you are, based on location and service field.
      </span>,
    id         : 'contacts',
    path       : '/contacts',
    title      : 'Contacts',
    type       : 'item',
    icon       : 'account_box', // 'contacts',
    // see src/my-app/config/Routes.js
    component  : () => FuseLoadable({loader: () => import('my-app/layouts/crud/CRUDRouter')}),
    crudConfig : {
      actionable : () => {},
      condensed  : true,
      creatable  : {
        title    : 'Create new contact', // form: <UserMultiForm />,
        path     : 'contacts',
        fields   : [ 'name*', 'phone*', 'email*', 'zip*', 'notes', ], // 'name*', 'lastName', 'nickname', 'phone', 'company', 'email*', 'jobTitle', 'birthday', 'address', 'notes',
      },
      readable   : 'contacts' ,
      updatable  : {
        title    : 'Edit contact',
        path     : 'contacts',
        fields   : [ 'name*', 'phone*', 'email*', 'zip*', 'notes', ],
      },
      deletable  : true,
    },
    dashboardConfig: {
      contacts: 'increment',
    },
  },

  // divider
  {id:'div1',title:'',type:'divider',icon:'',url:'',path:'',},

  // overhead views
  // see specs here: https://material.io/design/communication/help-feedback.html#use-placement
  {
    description:
      <span>
        These are the settings we use to control how the app looks and functions for you.
        For example, this is where you tell us your service field and your location so we
        can properly match you to the leads that are referred by other members.
      </span>,
    id         : 'settings',
    path       : '/settings',
    title      : 'Settings',
    type       : 'item',
    icon       : 'settings',
    bottomNav  : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
    overhead   : true,
    // see src/my-app/config/Routes.js
    component  : () => FuseLoadable({loader: () => import('my-app/views/overhead/settings/Settings')}),
  },
  {
    description:
      <span>
        Here you can tell us how the app is working for you and suggest ways we can improve it.
      </span>,
    id         : 'feedback',
    path       : '/feedback',
    title      : 'Send feedback',
    type       : 'item',
    icon       : 'feedback',
    bottomNav  : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
    overhead   : true,
    // see src/my-app/config/Routes.js
    component  : () => FuseLoadable({loader: () => import('my-app/views/overhead/Feedback')}),
  },
  {
    description:
      <span>
        Here are some questions users commonly ask us. You can read the questions and there answers here.
      </span>,
    id         : 'help',
    path       : '/help',
    title      : 'Help',
    type       : 'item',
    icon       : 'help',
    bottomNav  : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
    overhead   : true,
    // see src/my-app/config/Routes.js
    component  : () => FuseLoadable({loader: () => import('my-app/views/overhead/Help')}),
  },
  {
    description:
      <span>
        Click here to log out of the app.
      </span>,
    id         : 'logout',
    path       : '/logout',
    title      : 'Logout',
    type       : 'item',
    altIcon    : (
      <IconContext.Provider value={{ color: "white", className: "text-20 flex-no-shrink" }}>
        <span><FaSignOutAlt /></span>
      </IconContext.Provider>
    ),
    bottomNav  : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
    overhead   : true,
    // see src/my-app/config/Routes.js
    component  : () => FuseLoadable({loader: () => import('my-app/views/overhead/Logout')}),
  },
]

export const faqDB = [
  {
    'id'       : '1',
    'question' : 'Who is Swap made for?',
    'answer'   : 'Swap is made for sales professionals.\
                  Especially those selling mortgages, real estate, insurance and financial advisory services\
                  who want to decrease their marketing costs and increase their sales volume by leveraging\
                  the power of their referral network to generate a steady supply of leads.',
  },
  {
    'id'       : '2',
    'question' : 'How is Swap better than other ways of generating referral leads?',
    'answer'   : 'Other similar systems of generating referral networks, like BNI for example, fail to\
                  adequately motivate all the members to contribute leads. Members are often frustrated\
                  by contributing leads to the system, but don’t receive in turn an adequate supply of leads\
                  out of the system to justify their time investment.\
                  \n\nSwap solves this problem by adding a layer of speed and accountability.\
                  Speed because everything is online and you can do all your referral networking by the press\
                  of a button on your laptop or smart phone. Accountability is added by enforcing our central\
                  rule: All members must maintain a net positive contribution balance of leads at all times\
                  in order to receive leads from the system.'
  },
  {
    'id'       : '3',
    'question' : 'What if I receive bogus leads? Will they count against me?',
    'answer'   : 'No. At least that’s our goal. Our first release will not have our technology in this area\
                  fully solved. But it will be a high priority to solve for this in future iterations\
                  very soon after we release the initial product.'
  },
  {
    'id'       : '4',
    'question' : 'How does your pricing work?',
    'answer'   : 'We are a free service during our initial phase. We reserve the right to charge a very small\
                  fee in the future. After we have most of the bugs worked out and you are doing so much\
                  extra business from our service, we will have earned every penny and then some in your eyes.'
  },
  {
    'id': '5',
    'question': 'Quis irure cupidatat ad consequat reprehenderit excepteur?',
    'answer': 'Esse nisi mollit aliquip mollit aute consequat adipisicing. Do excepteur dolore proident cupidatat pariatur irure consequat incididunt.'
  },
  {
    'id': '6',
    'question': 'Officia voluptate tempor ut mollit ea cillum?',
    'answer': 'Deserunt veniam reprehenderit do elit magna ut.'
  },
  {
    'id': '7',
    'question': 'Sunt fugiat officia nisi minim sunt duis?',
    'answer': 'Eiusmod eiusmod sint aliquip exercitation cillum. Magna nulla officia ex consectetur ea ad excepteur in qui.'
  },
  {
    'id': '8',
    'question': 'Non cupidatat enim quis aliquip minim laborum?',
    'answer': 'Qui cillum eiusmod nostrud sunt dolore velit nostrud labore voluptate ad dolore. Eu Lorem anim pariatur aliqua. Ullamco ut dolor velit esse occaecat dolore eu cillum commodo qui. Nulla dolor consequat voluptate magna ut commodo magna consectetur non aute proident.'
  },
  {
    'id': '9',
    'question': 'Dolor ex occaecat magna labore laboris qui?',
    'answer': 'Incididunt qui excepteur eiusmod elit cillum occaecat voluptate cillum nostrud. Dolor ullamco ullamco eiusmod do sunt adipisicing pariatur. In esse esse labore id reprehenderit sint do. Pariatur culpa dolor tempor qui excepteur duis do anim minim ipsum.'
  },
  {
    'id': '10',
    'question': 'Nisi et ullamco minim ea proident tempor?',
    'answer': 'Dolor veniam dolor cillum Lorem magna nisi in occaecat nulla dolor ea eiusmod.'
  },
  {
    'id': '11',
    'question': 'Amet sunt et quis amet commodo quis?',
    'answer': 'Nulla dolore consequat aliqua sint consequat elit qui occaecat et.'
  },
  {
    'id': '12',
    'question': 'Ut eiusmod ex ea eiusmod culpa incididunt?',
    'answer': 'Fugiat non incididunt officia ex incididunt occaecat. Voluptate nostrud culpa aliquip mollit incididunt non dolore.'
  },
  {
    'id': '13',
    'question': 'Proident reprehenderit laboris pariatur ut et nisi?',
    'answer': 'Reprehenderit proident ut ad cillum quis velit quis aliqua ut aliquip tempor ullamco.'
  },
  {
    'id': '14',
    'question': 'Aliqua aliquip aliquip aliquip et exercitation aute?',
    'answer': 'Adipisicing Lorem tempor ex anim. Labore tempor laboris nostrud dolore voluptate ullamco. Fugiat ex deserunt anim minim esse velit laboris aute ea duis incididunt. Elit irure id Lorem incididunt laborum aliquip consectetur est irure sunt. Ut labore anim nisi aliqua tempor laborum nulla cillum. Duis irure consequat cillum magna cillum eiusmod ut. Et exercitation voluptate quis deserunt elit quis dolor deserunt ex ex esse ex.'
  }
]

// export const standardNavConfig = []

// class FetchFirestore extends Component {
//   render() {
//     const { key, children, } = this.props;
//     // called wherever firestore data is needed by: <FetchFirestore>...</FetchFirestore>
//     return (
//       // <React.Fragment key={key}>
//       <span key={key}>
//         {key}
//         {children}
//       </span>
//       // </React.Fragment>
//     )
//   }
// }

// function mapStateToProps({ auth }) {
// function mapStateToProps( state ) {
//   console.log('state\n', state);
//   const settings = state.firestore.ordered.users
//                 && state.firestore.ordered.users[0]
//                 && state.firestore.ordered.users[0].settings
//                 && state.firestore.ordered.users[0].settings[0];
//   const user = state.auth.user;
//   const leads = state.firestore.ordered.leads;
//   const profile = state.firebase.profile;
//   const dataHasLoaded = user && leads && profile && settings;

//   if(dataHasLoaded) {
//     console.log('user\n', user);
//     console.log('leads\n', leads);
//     console.log('profile\n', profile);
//     console.log('settings\n', settings);
//     console.log('dataHasLoaded\n', dataHasLoaded);
//     console.log('all-settings\n', state.firestore.ordered.users[0].settings);
//   }
  
//   return {
//     // user: auth.user
//     user, //: state.auth.user, // {role, data: {uid, displayName, email, ...}}
//     // settings: state.settings,

//     // projects: state.firestore.ordered.projects,
//     // auth: state.firebase.auth,
//     // notifications: state.firestore.ordered.notifications,

//     // template for top-level stored objects from firebase using FirebaseConnect to fetch it
//     leads, //: state.firestore.ordered.leads,
//     // from docs: http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/profile.html#basic
//     profile, //: state.firebase.profile, // profile passed as props.profile

//     // trying
    
//     // success
//     settings,
//     // settings: state.firestore.ordered.users,//[0],//.settings[0],
//     dataHasLoaded,
    
//     // fail
//     // settings: state.firestore.ordered.users.0,//.settings[0], // does not compile, unextected token
//     // settings: state.firestore.ordered.users[0],//.settings[0], // can not find [0] of undefined
//     // settings: state.firestore.data.users[state.auth.user.data.uid].settings,
//     // settings: state.firestore.data.users.settings,
//     // settings: state.firestore.ordered.users.settings,
//   }
// }
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       // updateSettings: settings => dispatch(updateSettings(settings)),
//     }
//   }

// export const FetchFirestore = () => {return compose(
// export compose(
// export default compose(

//   // withStyles(styles, { withTheme: true }),
  
//   // connect(),
//   connect(mapStateToProps),
//   // connect(mapStateToProps, mapDispatchToProps),
//   // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
//   // connect auth from redux state to the auth prop
//   // connect(({ firebase: { auth } }) => ({ auth })),
//   // show spinner while auth is loading
//   // spinnerWhileLoading(['auth']),

//   // connect(({ firestore }, props) => ({
//   //   // settings: /*getVal*/_.get(firestore, `users/${props.profile.uid}/settings/current`), // lodash's get can also be used
//   //   settings: /*getVal*/_.get(firestore, `users/3lq9cr3A3eNSehv4X35Q2HBtUty2/settings/current`), // lodash's get can also be used
//   // })),

//   firestoreConnect( props => {
//     console.log('props\n', props);
//     // const path = [ 'users', props.profile.uid, 'settings' ].join('/'); // fail
//     return [
//       // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
//       // { collection: 'projects', orderBy: ['createdAt', 'description'] },
//       // { collection: 'notifications', limit: 3, orderBy: ['time', 'description'] },

//       // { path: users/${props.profile.uid}/current` }, // fails; used by old version

//       { collection: 'leads', orderBy: ['createdAt', 'description'] }, // success

//       // // fail
//       // { 
//       //   collection: path,
//       //   limit: 1,
//       //   orderBy: ['createdAt', 'description'],
//       //   storeAs: 'settings',
//       // },

//       {
//         collection: 'users',
//         // doc: props.auth.uid,
//         // doc: props.auth.user.data.uid,
//         // doc: '3lq9cr3A3eNSehv4X35Q2HBtUty2',
//         // doc: props.user.data.uid, // success
        
//         // where: ['id', '==', props.profile.uid],
        
//         // ref: https://github.com/prescottprue/redux-firestore/blob/master/README.md#document
//         // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
//         doc: props.profile.uid, //props.store.firestore.get('cities/SF'/zipcodes),
        
//         // ref: https://github.com/prescottprue/redux-firestore/blob/master/README.md#sub-collections
//         // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
//         subcollections: [
//           {
//             collection: 'settings',
//             // limit: 1,
//             // orderBy: ['createdAt', 'description',],
//             // storeAs: 'settings',
//             doc: 'current',
//           },
//         ],
//       },

//     ];
//   }),

// )(FetchFirestore)//}