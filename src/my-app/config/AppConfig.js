import React, { Component } from 'react';
// import { Component } from 'react';
// import PropTypes from "prop-types";
// import { withStyles } from '@material-ui/core/styles';

// firebase
import { firestoreConnect } from 'react-redux-firebase';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';

// utilities
import _ from '@lodash';

// categoryItems
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';

// logout
// alt icons
// install https://www.npmjs.com/package/react-icons
// icons   https://react-icons.netlify.com/#/
import { IconContext } from "react-icons"; // my add
// MenuItem><FiLogOut /><Typography className="ml-12">FiLogOut</Typography></MenuItem>
// MenuItem><IoMdLogOut /><Typography className="ml-12">IoMdLogOut</Typography></MenuItem>
// MenuItem><FaSignOutAlt /><Typography className="ml-12">FaSignOutAlt</Typography></MenuItem>
// MenuItem><IoIosLogOut /><Typography className="ml-12">IoIosLogOut</Typography></MenuItem>
// MenuItem><GoSignOut /><Typography className="ml-12">GoSignOut</Typography></MenuItem>
import { FaSignOutAlt } from 'react-icons/fa'; // https://react-icons.netlify.cIoIosLogOutom/#/
// import { FiLogOut } from 'react-icons/fi'; // https://react-icons.netlify.cIoIosLogOutom/#/
// import { GoSignOut, } from 'react-icons/go'; // https://react-icons.netlify.com/#/
// import { IoIosLogOut, IoMdLogOut, } from 'react-icons/io'; // https://react-icons.netlify.cIoIosLogOutom/#/

// import { drawerWidth } from 'my-app/config/AppConfig';
export const drawerWidth = 256 // per spec https://material.io/design/components/navigation-drawer.html#specs

export const firebaseConfig = {
  apiKey: "AIzaSyAOEXILaYcxjmJsJ81_WfubS_h3AQ3lLdA",
  authDomain: "green-comet-e2c85.firebaseapp.com",
  databaseURL: "https://green-comet-e2c85.firebaseio.com",
  projectId: "green-comet-e2c85",
  storageBucket: "green-comet-e2c85.appspot.com",
  messagingSenderId: "682044250674",
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
  desc: 'Real estate agents, mortgage brokers, insurance agents and financial planners need leads. Referrals are a good way to get them. Swap lets you turn your clients into referrals and get back referrals in exchange.',
}

export const bizCategoryItems = [
  { value : 'home'      , label : 'Home'      , icon : HomeIcon           } ,
  { value : 'mortgage'  , label : 'Mortgage'  , icon : AccountBalanceIcon } ,
  { value : 'financial' , label : 'Financial' , icon : AssessmentIcon     } ,
  { value : 'insurance' , label : 'Insurance' , icon : AssignmentIcon     } ,
]

// syncronize: changes in either of the following files must be hard coded in the other
// src/fuse-configs/fuseNavigationConfig.js
// src/main/content/components/ComponentsConfig.js
export const componentsNavConfig = [
  // * Note: It is currently not possible to use expressions like `loader : () => import(item.path)`
  // The path must be hard coded. See https://github.com/jamiebuilds/react-loadable
  {
    id        : 'dashboard',
    title     : 'Dashboard',
    type      : 'item',
    icon      : 'dashboard',
    url       : '/dashboard',
    path      : 'my-app/layouts/views/app/dashboard/Dashboard',
    bottomNav : true,
    // loader : () => import('my-app/layouts/views/app/dashboard/Dashboard'),
  },
  {
    id        : 'inbox',
    title     : 'Inbox',
    type      : 'item',
    icon      : 'cloud_download',
    url       : '/inbox',
    path      : 'my-app/containers/inbox/InboxContainer',
    bottomNav : true,
  },
  {
    id        : 'archive',
    title     : 'Archive',
    type      : 'item',
    icon      : 'folder',
    url       : '/archive',
    path      : 'my-app/layouts/views/app/archive/Archive',
    bottomNav : true,
  },
  {
    id        : 'outbox',
    title     : 'Outbox',
    type      : 'item',
    icon      : 'cloud_upload',
    url       : '/outbox',
    path      : 'my-app/layouts/views/app/outbox/Outbox',
  },
  {
    id        : 'contacts',
    title     : 'Contacts',
    type      : 'item',
    icon      : 'account_box', // 'contacts',
    url       : '/contacts',
    path      : 'my-app/layouts/views/app/contacts/Contacts',
  },

  // divider
  {id:'div1',title:'',type:'divider',icon:'',url:'',path:'',},

  // see specs here: https://material.io/design/communication/help-feedback.html#use-placement
  {
    id        : 'settings',
    title     : 'Settings',
    type      : 'item',
    icon      : 'settings',
    url       : '/settings',
    path      : 'my-app/layouts/views/app/settings/Settings',
    bottomNav : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
  },
  {
    id        : 'feedback',
    title     : 'Send feedback',
    type      : 'item',
    icon      : 'feedback',
    url       : '/feedback',
    path      : 'my-app/layouts/views/app/overhead/Feedback',
    bottomNav : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
  },
  {
    id        : 'help',
    title     : 'Help',
    type      : 'item',
    icon      : 'help',
    url       : '/help',
    path      : 'my-app/layouts/views/app/overhead/Help',
    bottomNav : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
  },
  {
    id        : 'logout',
    title     : 'Logout',
    type      : 'item',
    altIcon   : (
      <IconContext.Provider value={{ color: "white", className: "text-20 flex-no-shrink" }}>
        <div><FaSignOutAlt /></div>
      </IconContext.Provider>
    ),
    url       : '/logout',
    path      : 'my-app/layouts/views/app/overhead/Logout',
    bottomNav : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
  },
]

export const standardNavConfig = [

]

class FetchFirestore extends Component {
  render() {
    const { key, children, } = this.props;
    // called wherever firestore data is needed by: <FetchFirestore>...</FetchFirestore>
    return (
      // <React.Fragment key={key}>
      <div key={key}>
        {key}
        {children}
      </div>
      // </React.Fragment>
    )
  }
}

// function mapStateToProps({ auth }) {
function mapStateToProps( state ) {
  console.log('state\n', state);
  const settings = state.firestore.ordered.users
                && state.firestore.ordered.users[0]
                && state.firestore.ordered.users[0].settings
                && state.firestore.ordered.users[0].settings[0];
  const user = state.auth.user;
  const leads = state.firestore.ordered.leads;
  const profile = state.firebase.profile;
  const dataHasLoaded = user && leads && profile && settings;

  if(dataHasLoaded) {
    console.log('user\n', user);
    console.log('leads\n', leads);
    console.log('profile\n', profile);
    console.log('settings\n', settings);
    console.log('dataHasLoaded\n', dataHasLoaded);
    console.log('all-settings\n', state.firestore.ordered.users[0].settings);
  }
  
  return {
    // user: auth.user
    user, //: state.auth.user, // {role, data: {uid, displayName, email, ...}}
    // settings: state.settings,

    // projects: state.firestore.ordered.projects,
    // auth: state.firebase.auth,
    // notifications: state.firestore.ordered.notifications,

    // template for top-level stored objects from firebase using FirebaseConnect to fetch it
    leads, //: state.firestore.ordered.leads,
    // from docs: http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/profile.html#basic
    profile, //: state.firebase.profile, // profile passed as props.profile

    // trying
    
    // success
    settings,
    // settings: state.firestore.ordered.users,//[0],//.settings[0],
    dataHasLoaded,
    
    // fail
    // settings: state.firestore.ordered.users.0,//.settings[0], // does not compile, unextected token
    // settings: state.firestore.ordered.users[0],//.settings[0], // can not find [0] of undefined
    // settings: state.firestore.data.users[state.auth.user.data.uid].settings,
    // settings: state.firestore.data.users.settings,
    // settings: state.firestore.ordered.users.settings,
  }
}
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       // updateSettings: settings => dispatch(updateSettings(settings)),
//     }
//   }

// export const FetchFirestore = () => {return compose(
// export compose(
export default compose(

  // withStyles(styles, { withTheme: true }),
  
  // connect(),
  connect(mapStateToProps),
  // connect(mapStateToProps, mapDispatchToProps),
  // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
  // connect auth from redux state to the auth prop
  // connect(({ firebase: { auth } }) => ({ auth })),
  // show spinner while auth is loading
  // spinnerWhileLoading(['auth']),

  // connect(({ firestore }, props) => ({
  //   // settings: /*getVal*/_.get(firestore, `users/${props.profile.uid}/settings/current`), // lodash's get can also be used
  //   settings: /*getVal*/_.get(firestore, `users/3lq9cr3A3eNSehv4X35Q2HBtUty2/settings/current`), // lodash's get can also be used
  // })),

  firestoreConnect( props => {
    console.log('props\n', props);
    // const path = [ 'users', props.profile.uid, 'settings' ].join('/'); // fail
    return [
      // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
      // { collection: 'projects', orderBy: ['createdAt', 'desc'] },
      // { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },

      // { path: users/${props.profile.uid}/current` }, // fails; used by old version

      { collection: 'leads', orderBy: ['timestamp', 'desc'] }, // success

      // // fail
      // { 
      //   collection: path,
      //   limit: 1,
      //   orderBy: ['timestamp', 'desc'],
      //   storeAs: 'settings',
      // },

      {
        collection: 'users',
        // doc: props.auth.uid,
        // doc: props.auth.user.data.uid,
        // doc: '3lq9cr3A3eNSehv4X35Q2HBtUty2',
        // doc: props.user.data.uid, // success
        
        // where: ['id', '==', props.profile.uid],
        
        // ref: https://github.com/prescottprue/redux-firestore/blob/master/README.md#document
        // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
        doc: props.profile.uid, //props.store.firestore.get('cities/SF'/zipcodes),
        
        // ref: https://github.com/prescottprue/redux-firestore/blob/master/README.md#sub-collections
        // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
        subcollections: [
          {
            collection: 'settings',
            // limit: 1,
            // orderBy: ['timestamp', 'desc',],
            // storeAs: 'settings',
            doc: 'current',
          },
        ],
      },

    ];
  }),

)(FetchFirestore)//}