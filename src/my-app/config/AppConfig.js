import React from 'react';
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Typography, } from '@material-ui/core'; // withStyles,

// firebase
// import { firestoreConnect } from 'react-redux-firebase';

// fuse
import { FuseLoadable, } from '@fuse';

// redux
// import { connect } from 'react-redux';
// import { compose } from 'redux';

// @material-ui/core
// import { Chip, } from '@material-ui/core'; // withStyles,

// utilities
import _ from '@lodash';
import moment from 'moment';
import hash from 'object-hash'; // https://www.npmjs.com/package/object-hash

// custom components
import ZipCodeInput from 'my-app/components/CustomFormFields/ZipCodeInput.js';

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
import { IconContext, } from 'react-icons'; // my add
// MenuItem><FiLogOut /><span className='ml-12'>FiLogOut</span></MenuItem>
// MenuItem><IoMdLogOut /><span className='ml-12'>IoMdLogOut</span></MenuItem>
// MenuItem><FaSignOutAlt /><span className='ml-12'>FaSignOutAlt</span></MenuItem>
// MenuItem><IoIosLogOut /><span className='ml-12'>IoIosLogOut</span></MenuItem>
// MenuItem><GoSignOut /><span className='ml-12'>GoSignOut</span></MenuItem>
import { FaSignOutAlt, } from 'react-icons/fa'; // https://react-icons.netlify.com/#/
// import { FiLogOut } from 'react-icons/fi'; // https://react-icons.netlify.com/#/
// import { GoSignOut, } from 'react-icons/go'; // https://react-icons.netlify.com/#/
// import { IoIosLogOut, IoMdLogOut, } from 'react-icons/io'; // https://react-icons.netlify.com/#/

// utility components
// import CRUDRouter from 'my-app/layouts/crud/CRUDRouter';

// usage
// import { getComponentsNavConfig, } from 'my-app/config/AppConfig';
// const componentsNavConfig = getComponentsNavConfig({ item, });

export const uiSpecs = {
  drawerWidth: 256, // https://material.io/design/components/navigation-drawer.html#specs
  // appBarHeight:  64, // 64 per MUI theme // 56 per spec: https://material.io/design/components/app-bars-top.html#specs
  // bottomNavHeight:  56,
  maxCharsForDetailItemField: 40,
}

export const firebaseConfig = {
  apiKey: 'AIzaSyAOEXILaYcxjmJsJ81_WfubS_h3AQ3lLdA',
  authDomain: 'green-comet-e2c85.firebaseapp.com',
  databaseURL: 'https://green-comet-e2c85.firebaseio.com',
  projectId: 'green-comet-e2c85',
  storageBucket: 'green-comet-e2c85.appspot.com',
  messagingSenderId: '682044250674',
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
  // geoLocal: undefined,
  autoClaimLeads: false,
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

// export const settingsConfig1 = {
//   structure: [
//     {
//       details: [
//         {
//           contact: [ 'name', 'email', 'mobile', ],
//         }, {
//           business: [ 'type', 'location', ],
//         },
//       ],
//     }, {
//       preferences: [
//         {
//           automation: [
//             'claimNewLeads',
//             {
//               'Notify me': [ 'notifyMeText', 'notifyMeEmail', ]
//             }, {
//               'Notify prospects' : [ 'notifyProspectsText', 'notifyProspectsEmail', ]
//             },
//           ],
//         }, {
//           display: [ 'avatar', 'background', ] ,
//         },
//       ],
//     },
//   ] ,
//   items: {
//     name: {
//       label: 'Name',
//       icon: 'perm_contact_calendar',
//       initialValue: null,
//       profileAlt: true,
//       type: 'dialog-text-field',
//       dialogTextFieldLabel: 'first and last',
//     },
//     email: {
//       label: 'Email',
//       icon: 'email',
//       initialValue: null,
//       profileAlt: true,
//       type: 'dialog-text-field',
//       dialogTextFieldLabel: 'address',
//     },
//     mobile: {
//       label: 'Mobile',
//       icon: 'smartphone',
//       initialValue: null,
//       profileAlt: true,
//       type: 'dialog-text-field',
//       dialogTextFieldLabel: 'number',
//     },
//     type: {
//       label: 'Type',
//       icon: 'extension',
//       initialValue: null,
//       profileAlt: false,
//       type: 'menu',
//     },
//     location: {
//       label: 'Location',
//       icon: 'location_on',
//       initialValue: null,
//       profileAlt: false,
//       type: 'custom-component',
//     },
//     claimNewLeads: {
//       label: 'Claim new leads',
//       icon: 'flash_on',
//       initialValue: false,
//       profileAlt: false,
//       type: 'switch',
//     },
//     notifyMeText: {
//       label: 'Claim new leads',
//       icon: 'flash_on',
//       initialValue: false,
//       profileAlt: false,
//       type: 'switch',
//     },
//     notifyMeEmail: {},
//     notifyProspectsText: {},
//     notifyProspectsEmail: {},
//     avatar: {},
//     background: {},
//   },
// }

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

// start app-specific parameters

export const brand = {
  logoPath: 'assets/images/logos/fuse.svg', // public/assets/images/logos/fuse.svg
  appName: 'Swap',
  tagLine: 'Give leads. Get leads.',
  description: 'Real estate agents, mortgage brokers, insurance agents and financial planners need leads. Referrals are a good way to get them. Swap lets you turn your clients into referrals and get back referrals in exchange.',
}
export const CHALLENGES_LIMIT = 3
export const bizCategoryItems = [
  { value : 'home'      , label : 'Home'      , icon : 'home'            } ,
  { value : 'mortgage'  , label : 'Mortgage'  , icon : 'account_balance' } ,
  { value : 'financial' , label : 'Financial' , icon : 'assessment'      } ,
  { value : 'insurance' , label : 'Insurance' , icon : 'assignment'      } ,
]
export const setBizCategoryValue2Label = value => { // home
  // console.log('value\n', value,);
  // console.log('bizCategoryItems\n', bizCategoryItems,);

  const ready1 = bizCategoryItems && value;
  if(!ready1) return null;

  const matches = _.filter(bizCategoryItems, { value, },);
  // console.log('matches\n', matches,);
  const match = matches[0];
  // console.log('match\n', match,);
  const out = match.label;
  // console.log('out\n', out,);
  return out; // Home
}

// end app-specific parameters

const formFieldConfig = {
  // Deprecated: type must be an HTML5 input type | https://www.w3schools.com/html/html_form_input_types.asp | https://material-ui.com/api/text-field/
  // Deprecated: button|checkbox|color|date|datetime-local|email|file|hidden|image|month|number|password|radio|range|reset|search|submit|tel|text|time|url|week
  // Add new component types to src/my-app/components/forms/FormTemplate.js > FormTemplate > getConfig()
  name        : { type : 'text'      , label : 'Name'       , icon : 'account_circle' , } ,
  firstName   : { type : 'text'      , label : 'First name' , icon : 'account_circle' , } ,
  lastName    : { type : 'text'      , label : 'Last name'  , icon : 'account_circle' , } ,
  nickname    : { type : 'text'      , label : 'Nickname'   , icon : 'star'           , } ,
  address     : { type : 'text'      , label : 'Address'    , icon : 'home'           , } ,
  // bizCategory : { type : 'menu'      , label : 'Type'       , icon : 'extension'      , options: bizCategoryItems,},
  bizCategory : { type : 'select'    , label : 'Type'       , icon : 'extension'      , options: bizCategoryItems,},
  zipInput    : { type : 'component' , label : 'Zip code'   , icon : 'place'          , component: <ZipCodeInput />, fields: ['city', 'state', 'zip', 'county',],},
  zip         : { type : 'text'      , label : 'Zip'        , icon : 'place'          , } ,
  city        : { type : 'text'      , label : 'City'       , icon : 'place'          , } ,
  state       : { type : 'text'      , label : 'State'      , icon : 'place'          , } ,
  county      : { type : 'text'      , label : 'County'     , icon : 'place'          , } ,
  lat         : { type : 'text'      , label : 'Latitude'   , icon : 'place'          , } ,
  lon         : { type : 'text'      , label : 'Longitude'  , icon : 'place'          , } ,
  phone       : { type : 'text'      , label : 'Phone'      , icon : 'phone'          , } ,
  email       : { type : 'text'      , label : 'Email'      , icon : 'email'          , } ,
  company     : { type : 'text'      , label : 'Company'    , icon : 'domain'         , } ,
  jobTitle    : { type : 'text'      , label : 'Job title'  , icon : 'work'           , } ,
  birthday    : { type : 'date'      , label : 'Birthday'   , icon : 'cake'           , InputLabelProps: {shrink: true,},},
  notes       : { type : 'text'      , label : 'Notes'      , icon : 'note'           , multiline: true, rows: 5,},
}

// GLOBAL UTILITY FUNCTIONS
// These are utility, helper functions stored here as a centralized location

// used as .map() key for list
export const getIdHash = (uid, timestamp,) => hash([uid, timestamp,]) // uid == createdBy, timestamp == createdAt,

// Deprecate the following method getMatchHash() and use a series of .where() filters in the call to firestore.
// That is actually how this app is designed to be built. Below might be a case of over-engineering.
// export const getMatchHash = ({ bizCategory, geoNation, geoRegion, geoLocal, }) => {
//   const ready1 = !!bizCategory && !!geoNation && !!geoRegion && !!geoLocal;
//   if(!ready1) throw new Error('Attempted to hash incomplete object');
//   const out = hash([ bizCategory, geoNation, geoRegion, geoLocal, ]);
//   console.log('out\n', out,);
//   return out;
// }

export const handleKeyPress = (event, targetKey, handlerFunction,) => {
// example usage:
// import { handleKeyPress, } from 'my-app/config/AppConfig';
// <TextField onKeyPress={(e) => handleKeyPress(e, 'Enter', onClickSearchButton,)}
if (event.key === targetKey) handlerFunction();
}

// end global utility functions

export const replaceFormFieldsArrayWithLabels = form =>
  form.map(({ label, }) => label); // form: array, output of: getForm(searchableFieldIds);

export const replaceFormFieldLabelWithKeyId = formFieldLabel =>
  _.findKey(formFieldConfig, {label: formFieldLabel,},) // formFieldLabel: string, 'Name'

export const replaceFormFieldsLabelArrayWithKeyIds = formFieldLabels =>
  formFieldLabels.map( label => replaceFormFieldLabelWithKeyId(label,) )

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
  // s: string: 'name*', field ID before removing non-alpha
  // n: number: >= 0, index of array element when iterating
  // console.log('s\n', s);
  // console.log('n\n', n);
  const str = getOnlyAlpha(s); // 'name*' => 'name'
  const out = {...formFieldConfig[str]}; // form field
  // console.log('out\n', out);
  if(!out) return;

  const required = getRequiredField(s);
  out.required = required;
  out.autoFocus = !n; // autofocus on first item (index === 0) only
  out.id = str;
  // console.log('out\n', out);
  return out; // adorned form field
}

export const getForm = arrayOfIds =>
  // arrayOfIds: array of strings: ['name', 'phone', 'email',]
  arrayOfIds.map((id, index,) => getFormFieldProps(id, index,));

export const getCleanFieldNames = arrayOfIds => arrayOfIds.map(s => getOnlyAlpha(s)); // a: arrayOfStrings: ['name*', 'phone', 'email*']

// begin SEARCH section

export const getSearchableFields = ( searchable, readable, ) => {
  // return: array: either one of 
  // 1. manually listed array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ]
  // 2. otherwise, if true, uses all fields in 1. readable.path => creatable.fields
  // TODO: Save 'notes' (and other similar) fields as array of words and search by .where('notes', 'array_contains', 'foo') // ref: https://firebase.google.com/docs/firestore/query-data/queries#array_membership
  // console.log('searchable\n', searchable,);
  // console.log('readable\n', readable,);
  const componentsNavConfig = getComponentsNavConfig();
  const getBoolean = () => {
    const ready1 = searchable;
    if(!ready1) return;
    // searchable === true
    // find property in crudConfig where readable is created, then return those field names with alpha characters only
    // console.log('componentsNavConfig\n', componentsNavConfig,);
    // console.log('readablePath\n', readable.path,);
    const filteredArray = _.filter(componentsNavConfig, {crudConfig: {creatable: {path: readable.path,}}});
    // console.log('componentsNavConfig\n', componentsNavConfig,);
    // console.log('readable\n', readable,);
    // console.log('filteredArray\n', filteredArray,); // array // crudConfig element where id === 'outbox'
    const target = filteredArray[0];
    // console.log('target\n', target,); // single item // crudConfig element where id === 'outbox'
    if(typeof target != 'object') throw new Error('Target value is not an object');
    const { fields, } = target && target.crudConfig && target.crudConfig.creatable;
    const result = getCleanFieldNames(fields);
    return result;
  }
  const config = {
    boolean: getBoolean(),
    object: searchable,
  };
  const type = typeof searchable; // 'boolean' | 'object'
  const out = config[type];
  return out;
}

// // use example
// handleFilterSearchItems = () => {
//   // server-side search is limited to no logical OR filters, must join multiple searches on client-side
//   // so we are opting in to doing the search string filter on the client-side instead of the server
//   // console.log('state\n', this.state,);
//   const { searchable, readable, } = this.props; // items,
//   const { items, searchString, } = this.state;
//   // console.log('searchString\n', searchString,);
//   // console.log('items\n', items,);
//   // const searchableFields = [ 'name', 'email', 'phone', 'zip', 'notes', ];
//   const searchableFields = getSearchableFields(searchable, readable,);
//   const filteredItems = this.getItemsFilteredBySearch(items, searchString, searchableFields,);
//   // console.log('filteredItems\n', filteredItems,);
//   this.setState({ items: filteredItems, }
//     // , () => console.log('state\n', this.state,)
//   );
// }

// https://jsbin.com/puzenekomi/edit?js,console
export const getItemsFilteredBySearch = (items, searchString, searchableFields,) => {
  // returns subset array of items containing searchString in searchableFields
  // might be obsolete because searches will be done server side using query.where() method // ref: https://firebase.google.com/docs/firestore/query-data/queries
  // searchableFields: array of strings: [ 'name', 'email', 'phone', 'zip', 'notes', ]
  const isSubstring = s => _.includes(s, searchString,); // returns true if search string is substring of arg string
  const isInObjectValues = r => Object.values(r).filter(isSubstring); // returns all values of arg object containing search string
  const isInObject = r => { // passed any object, r, returns true if search string is in any value of r
    // reduce search fields by opting-in list of specific fields // eliminate extra fields like docId, etc. for example
    const reducedObjectToSearch = _.pick(r, searchableFields,);
    const result = !(_.isEmpty(isInObjectValues(reducedObjectToSearch)));
    return result;
  }
  const out = items.filter(isInObject); // returns all array elements containing search string in any values of the object element
  // console.log(out);
  return out;
}

// end SEARCH section

// To convert JS descriptions to JSX:
// // https://github.com/lovell/farmhash/blob/master/README.md
// import farmhash from 'farmhash';
// const hash = farmhash.hash32('test');
// console.log(typeof hash); // 'number'
// // https://www.freecodecamp.org/forum/t/newline-in-react-string-solved/68484/10
// let newText = text.split ('\n').map( (item, index,) => <p key={farmhash.hash32(item+index)}>{item}</p>);

// syncronization: changes in either of the following files must be hard coded in the other
// src/fuse-configs/fuseNavigationConfig.js // abbreviated
// src/main/content/components/ComponentsConfig.js
export const getComponentsNavConfig = props => {
  // console.log('props\n', props,);

  const item     = ( props && props.item     ) || {} ;
  // const docId    = 'aZZsxdvfv3o6ZGfj5mIt';
  const docId    = ( props && props.docId    ) || ( props && props.item && props.item.docId ); // || '' ;
  const profile  = ( props && props.profile  ) || {} ;
  const settings = ( props && props.settings ) || {} ;
  const uid      = ( props && props.uid )      || ( profile && profile.uid ) ;
  
  const { bizCategory, geoNation, geoRegion, geoLocal } = settings;

  // console.log('item\n', item,);
  // console.log('docId\n', docId,);
  // console.log('profile\n', profile,);
  // console.log('settings\n', settings,);
  // console.log('uid\n', uid,);
  // console.log('bizCategory\n', bizCategory,);
  // console.log('geoNation\n', geoNation,);
  // console.log('geoRegion\n', geoRegion,);
  // console.log('geoLocal\n', geoLocal,);
  
  const out = [
    // import { componentsNavConfig, } from 'my-app/config/AppConfig';
    // * Note: It is currently not possible to use expressions like `loader : () => import(item.path)`
    // The path must be hard coded in src/my-app/config/Routes.js. See https://github.com/jamiebuilds/react-loadable
    {
      // eslint-disable-next-line
      description: '\
        This is your overview of metrics summarizing your use of this app.\
      ',
      id        : 'dashboard',
      path      : '/dashboard',
      title     : 'Dashboard',
      type      : 'item',
      icon      : 'dashboard',
      bottomNav : true,
      // see src/my-app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // component  : () => FuseLoadable({loader: () => import('my-app/views/app/dashboard/Dashboard')}),
      component  : () => FuseLoadable({loader: () => import('my-app/views/app/dashboard/DashboardContainer')}),
    },
    {
      // eslint-disable-next-line
      description: '\
        This is the list of leads that are available for you to move to your archive.\
        These leads match your service type and location as you indicated in your settings.\
        You must have a positive net lead balance in order for any leads to show in this list.\
        Your net lead balance is calculated by subtracting the number of leads you have claimed\
        into your archive from the number of lead referrals you have made in your outbox.\
        And after all approprite adjustments for disputed leads have be settled.\
      ',
      id        : 'inbox',
      path      : '/inbox',
      title     : 'Inbox',
      type      : 'item',
      icon      : 'cloud_download',
      bottomNav : true,
      // see src/my-app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      component  : () => FuseLoadable({loader: () => import('my-app/layouts/crud/CRUDRouter')}),
      crudConfig : {
        condensed: true,
        searchable: false, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: false,
        sortable: false, // see searchable
        starrable: false,
        taggable: false,
        miniDashboard: [ 'net', 'deposits', 'withdrawals', ],
        creatable: false, // false only makes button not appear on CRUD view
        readable: {
          // src/my-app/containers/LoadAsync.js
          path: 'leads',
          orderBy: [ 'createdAt', 'desc', ],
          where: [
            [ 'deletedAt'       , '==' , 0    , ] ,
            [ 'archivedBy'      , '==' , null , ] ,
            [ 'archivedAt'      , '==' , 0    , ] ,
            // [ 'challengesCount' , '<=' , CHALLENGES_LIMIT     , ] , // Unhandled Rejection (FirebaseError): Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field 'challengesCount' and so you must also use 'challengesCount' as your first Query.orderBy(), but your first Query.orderBy() is on field 'createdAt' instead.
            [ 'bizCategory'     , '==' , bizCategory , ] , // 'Home'         
            [ 'geoNation'       , '==' , geoNation   , ] , // 'Asia, Pacific, and Middle East' | 'Latin America and Caribbean'
            [ 'geoRegion'       , '==' , geoRegion   , ] , // 'Kazakhstan' | 'Chile'
            [ 'geoLocal'        , '==' , geoLocal    , ] , // 'Almaty' | 'Santiago'
          ],
          // listPaneHeaderText: '',
          listPaneHeaderChips: [ setBizCategoryValue2Label(bizCategory), geoLocal, geoRegion, geoNation, ],
          // itemSummaryPrimaryText: setBizCategoryValue2Label(item && item.bizCategory), // || item.geoLocal,
          // itemSummaryPrimaryText: <Chip label={item && item.zip && item.zip.city} />,
          // itemSummaryPrimaryChips: [ (item && item.zip && item.zip.city), ],
          itemSummaryPrimaryText: moment(item.createdAt).fromNow(),
          // itemSummarySecondaryText: moment(item.createdAt).fromNow(),
          itemSummarySecondaryChips: [ (item && item.zipInput && item.zipInput.city), ],
        },
        updatable: false,
        deletable: false,
        actionable: {
          icon: 'send', // 'outlined_flag',
          label: 'Claim this lead and send it to your archive',
          dialogHeader: 'Claim lead',
          dialogBody: 'Do you want to claim this lead and send it to your archive?',
          buttonLabel: 'Claim it now!',
          dashboard: {
            local: { // path: `users/${uid}/dashboard`,
              net: -1,
              inbox: -1,
              archived: 1,
              withdrawals: 1,
            },
            // remotes: {},
          },
          // sets: [],
          // deletes: [],
          updates: [
            {
              path: `leads/${docId}`,
              fields: {
                archivedBy: uid,
                archivedAt: Date.now(),
              },
            },
          ],
        },
      },
    },
    {
      // eslint-disable-next-line
      description: '\
        This is the list of leads you have claimed which you now own in the sense they are now\
        exclusive to you only. The total leads in this list are subtracted from the amount of\
        lead referrals you have made, after all dispute adjustments are settled, in order to\
        determine your net lead balance.\
      ',
      id        : 'archive',
      path      : '/archive',
      title     : 'Archive',
      type      : 'item',
      icon      : 'folder',
      bottomNav : true,
      // see src/my-app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      component  : () => FuseLoadable({loader: () => import('my-app/layouts/crud/CRUDRouter')}),
      crudConfig : {
        condensed: true,
        searchable: true, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: true,
        sortable: true, // see searchable
        starrable: true,
        taggable: false,
        creatable  : false,
        readable: {
          path: 'leads', // src/my-app/containers/LoadAsync.js
          orderBy: [ 'createdAt', 'desc', ] ,
          where: [
            [ 'deletedAt'  , '==' , 0   , ] ,
            [ 'archivedBy' , '==' , uid , ] ,
          ],
          itemSummaryPrimaryText: '',
          itemSummarySecondaryText: '',
        },
        updatable: false,
        deletable: true,
        actionable : {
          icon: 'priority_high', // 'warning', // 'report',
          label: 'Challenge this lead for poor quality',
          dashboard: {
            local: {
              challenges: 1,
            },
            remotes: [
              {
                path: `users/${item && item.createdBy}/dashboard`,
                fields: {
                  challenges: 1,
                },
              },
            ],
          },
          // sets: [],
          // deletes: [],
          updates: [
            {
              path: ``,
              fields: {
                challengedBy: uid,
                //challengesCount: 'incrementBy1',
              },
            },
          ],
        },
      },
    },
    {
      // eslint-disable-next-line
      description: '\
        These are all the leads you have submitted as a referral. The more leads you refer to others,\
        the more leads are available to you in your inbox. You must have a positive net lead balance\
        in order to have leads available for you to claim.\
      ',
      id    : 'outbox',
      path  : '/outbox',
      title : 'Outbox',
      type  : 'item',
      icon  : 'cloud_upload',
      // see src/my-app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      component  : () => FuseLoadable({loader: () => import('my-app/layouts/crud/CRUDRouter')}),
      crudConfig : {
        condensed: true,
        searchable: true, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: true,
        sortable: true, // see searchable
        starrable: false,
        taggable: false,
        miniDashboard: [ 'net', 'deposits', 'withdrawals', ],
        creatable: {
          title: 'Send new referral', // form: <UserMultiForm />,
          path: 'leads',
          fields: [ 'bizCategory*', 'zipInput*', 'name*', 'phone*', 'email*', 'notes', ], // 'name*', 'lastName', 'nickname', 'phone', 'company', 'email*', 'jobTitle', 'birthday', 'address', 'notes',
          addOns: {
            // createdAt: 'timestamp', // added in cred.actions at save time
            createdBy: uid,
            deletedAt: 0,
            archivedBy: null,
            archivedAt: 0,
            // bizCategory: settings.bizCategory,
            geoNation: settings.geoNation,
            geoRegion: settings.geoRegion,
            geoLocal: settings.geoLocal,
          },
          dashboard: {
            local: {
              net: 1,
              deposits: 1,
              outbox: 1,
            },
            remotes: [
              {
                path: `leads-meta/${item && item.geoNation}/${item && item.geoRegion}/${item && item.geoLocal}`,
                incrementer: 1,
              },
            ],
          },
        },
        readable: {
          path: 'leads',
          // src/my-app/containers/LoadAsync.js
          where: [
            [ 'deletedAt', '==' , 0   , ] ,  
            [ 'createdBy', '==' , uid , ] ,
            // [ 'challengesCount' , '<=' , CHALLENGES_LIMIT , ] ,
          ],
          orderBy: [ 'createdAt', 'desc', ],
          itemSummaryPrimaryText: item && item.name, // item.bizCategory && _.filter(bizCategoryItems, {value:item.bizCategory,},)[0].label, // || item.geoLocal,
          // itemSummarySecondaryText: `${item && setBizCategoryValue2Label(item.bizCategory)} in ${item && item.local}` // moment(item.createdAt).fromNow(),
          itemSummarySecondaryChips: [
            (item && setBizCategoryValue2Label(item.bizCategory,)),
            (item && item.zipInput && item.zipInput.city),
            // moment(item.createdAt).fromNow(),
          ],
        },
        updatable: {
          title: 'Edit referral',
          path: 'leads',
          fields: [ 'name*', 'phone*', 'email*', 'zip*', 'notes', ],
        },
        deletable: true,
        actionable: false,
      },
      // dashboardConfig:{onCreate:{net:1,deposits:1,outbox:1,},onDelete:{net:-1,deposits:-1,outbox:-1,},},
    },
    {
      // eslint-disable-next-line
      description: '\
        This is the list of your contacts. The people whom you can feel comfortable sending your referrals to.\
        They will ultimately be matched to your referrals, just as you are, based on location and service field.\
      ',
      id    : 'contacts',
      path  : '/contacts',
      title : 'Contacts',
      type  : 'item',
      icon  : 'account_box', // 'contacts',
      // see src/my-app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      component  : () => FuseLoadable({loader: () => import('my-app/layouts/crud/CRUDRouter')}),
      crudConfig : {
        condensed: true,
        searchable: true, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: true,
        sortable: true, // see searchable
        starrable: true,
        taggable: false,
        miniDashboard: [ 'contacts', ],
        creatable: {
          title: 'Create new contact', // form: <UserMultiForm />,
          path: 'contacts',
          fields: [ 'name*', 'email*', 'bizCategory', 'phone', 'zip', 'notes', ], // 'name*', 'lastName', 'nickname', 'phone', 'company', 'email*', 'jobTitle', 'birthday', 'address', 'notes',
          dashboard: {
            local: {
              contacts: 1,
            },
          },
        },
        readable: {
          path: 'contacts',
          // src/my-app/containers/LoadAsync.js
          where: [
            [ 'deletedAt' , '==' , 0   , ] ,
            [ 'createdBy' , '==' , uid , ] ,
          ],
          orderBy: [ 'createdAt', 'desc', ] ,
          itemSummaryPrimaryText: '',
          itemSummarySecondaryText: '',
        },
        updatable: {
          title: 'Edit contact',
          path: 'contacts',
          fields: [ 'name*', 'phone*', 'email*', 'zip*', 'notes', ],
        },
        deletable: true,
        actionable: {
          icon: 'send', // 'outlined_flag',
          label: 'Challenge',
          dialogHeader: 'Challenge lead',
          dialogBody: 'Do you want to challenge this lead due to poor quality?',
          buttonLabel: 'Challenge now!',
          dashboard: {
            local: { // path: `users/${uid}/dashboard`,
              challengesMade: -1,
            },
            remotes: [
              {
                path: `users/${item.createdBy}/dashboard`,
                fields: {
                  challengesReceived: 1,
                },
              },
            ],
          },
          // sets: [],
          // deletes: [],
          updates: [
            {
              path: `leads/${docId}`,
              fields: {
                challengedBy: uid,
                challengedAt: Date.now(),
              },
            },
          ],
        },
      },
    },

    // divider
    {id:'div1',title:'',type:'divider',icon:'',url:'',path:'',},

    // overhead views
    // see specs here: https://material.io/design/communication/help-feedback.html#use-placement
    {
      // eslint-disable-next-line
      description: '\
        These are the settings we use to control how the app looks and functions for you.\
        For example, this is where you tell us your service field and your location so we\
        can properly match you to the leads that are referred by other members.\
      ',
      id        : 'settings',
      path      : '/settings',
      title     : 'Settings',
      type      : 'item',
      icon      : 'settings',
      bottomNav : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
      overhead  : true,
      // see src/my-app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      component : () => FuseLoadable({loader: () => import('my-app/views/overhead/settings/Settings')}),
    },
    {
      // eslint-disable-next-line
      description: '\
        Here you can tell us how the app is working for you and suggest ways we can improve it.\
      ',
      id        : 'feedback',
      path      : '/feedback',
      title     : 'Send feedback',
      type      : 'item',
      icon      : 'feedback',
      bottomNav : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
      overhead  : true,
      // see src/my-app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      component : () => FuseLoadable({loader: () => import('my-app/views/overhead/feedback/Feedback')}),
    },
    {
      // eslint-disable-next-line
      description: '\
        Here are some questions users commonly ask us. You can read the questions and there answers here.\
      ',
      id        : 'help',
      path      : '/help',
      title     : 'Help',
      type      : 'item',
      icon      : 'help',
      bottomNav : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
      overhead  : true,
      // see src/my-app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      component : () => FuseLoadable({loader: () => import('my-app/views/overhead/Help')}),
    },
    {
      // eslint-disable-next-line
      description: '\
        Click here to log out of the app.\
      ',
      id        : 'logout',
      path      : '/logout',
      title     : 'Logout',
      type      : 'item',
      altIcon   : (
        <IconContext.Provider value={{ color: 'white', className: 'text-20 flex-no-shrink' }}>
          <span><FaSignOutAlt /></span>
        </IconContext.Provider>
      ),
      bottomNav : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
      overhead  : true,
      // see src/my-app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      component : () => FuseLoadable({loader: () => import('my-app/views/overhead/Logout')}),
    },
  ];

  return out;
}

export const faqDB = [
  {
    'id'       : '1',
    'question' : 'Whom is Swap made for?',
    // eslint-disable-next-line
    'answer'   : 'Swap is made for sales professionals.\
                  Especially those selling mortgages, real estate, insurance and financial advisory services\
                  who want to decrease their marketing costs and increase their sales volume by leveraging\
                  the power of their referral network to generate a steady supply of leads.',
  },
  {
    'id'       : '2',
    'question' : 'What central problem does Swap solve?',
    // eslint-disable-next-line
    'answer'   : 'Swap is the best way to generate sales lead referrals. Other similar systems of leveraging\
                  referral networks to generate sales leads, like BNI for example, fail to\
                  adequately motivate all the members to contribute leads to the network.\
                  Members are often frustrated because they contribute a volume of leads to the system,\
                  but don’t receive in turn an adequate supply of leads back out of the system sufficient\
                  to justify their time investment.',
  },
  {
    'id'       : '3',
    'question' : 'How does Swap solve this central problem?',
    // eslint-disable-next-line
    'answer'   : 'Swap solves this problem by adding a layer of speed and accountability.\
                  Speed because everything is online and you can do all your referral networking by the press\
                  of a button on your laptop or smart phone. We add accountability by enforcing our primary\
                  rule: All members must maintain a net positive contribution balance of leads at all times\
                  in order to receive leads from the system.',
  },
  {
    'id'       : '4',
    'question' : 'What if I receive bad or bogus leads? Will they count against me?',
    // eslint-disable-next-line
    'answer'   : 'No. At least that’s our goal. Our first release will not have our technology in this area\
                  fully refined so we might just have to ban users who abuse the system. However, in future\
                  versions we will implement a system of fair resolution and settlement of bad leads.\
                  Until we roll out this technology, it will remain a high priority item fo us to solve.',
  },
  {
    'id'       : '5',
    'question' : 'How does your pricing work?',
    // eslint-disable-next-line
    'answer'   : 'We are a free service during our initial phase. We reserve the right to charge a very small\
                  fee in the future. After we have most of the bugs worked out and you are doing so much\
                  extra business from our service, we will have earned every penny and then some in your eyes.',
  },
  {
    'id'       : '6',
    'question' : 'Will I get to meet the members whom I send and receive leads?',
    // eslint-disable-next-line
    'answer'   : 'We leave that decision in your capable hands. Swap does not require personal meetings\
                  with your network referral partners. But we do facilitate you working with,\
                  sending leads to and receiving leads from network partners whom you already\
                  know or meet via Swap.',
  },
  {
    'id'       : '7',
    'question' : 'How do you ensure the lead referrals are of good quality?',
    // eslint-disable-next-line
    'answer'   : 'We have a challenge system that allows the network to self-police\
                  the lead quality of the system.',
  },
  {
    'id'       : '8',
    'question' : 'What happens if I get a bad lead?',
    // eslint-disable-next-line
    'answer'   : 'You can dispute it by clicking a button that creates a “challenge.”',
  },
  {
    'id'       : '9',
    'question' : 'How many challenges am I allowed?',
    // eslint-disable-next-line
    'answer'   : 'You have an unlimited number of challenges. And we encourage you to challenge any leads\
                  you consider problematic. However, we also monitor all challenges for abuse.',
  },
  {
    'id'       : '10',
    'question' : 'What happens if I get flagged as a “challenge abuser?”',
    // eslint-disable-next-line
    'answer'   : 'If we verify you have abuses the process in bad faith, you could have your account\
                  restricted or you could be banned.\
                  This is done to protect the integrity of the network to maintain a high standard of\
                  quality to make the network as valuable as possible to all our members.',
  },
  {
    'id'       : '11',
    'question' : 'What if I submit a bad lead?',
    // eslint-disable-next-line
    'answer'   : 'If you receive a challenge and you agree it was a bad lead, you should correct it or\
                  settle the challenge by crediting the challenger. We will keep records of how many times\
                  this happens and those who abuse the system will have their account\
                  limited or restricted to protect the integrity of the network and the value it delivers\
                  to our members.',
  },
  {
    'id'       : '12',
    'question' : 'How exactly are challenges resolved?',
    // eslint-disable-next-line
    'answer'   : 'First we notify the referrer and they have an opportunity to concede the issue immediately.\
                  Then we review the lead and determine to determine the outcome.',
  },
  {
    'id'       : '13',
    'question' : 'Can I send referrals to a specific member?',
    // eslint-disable-next-line
    'answer'   : 'Yes. We let you invite that person to the network and then select that person to receive\
                  all your referrals of a specific type provided the lead is within the geographic territory\
                  your target member serves.',
  },
  {
    'id'       : '14',
    'question' : 'What do I need to do before I can get my first referral?',
    // eslint-disable-next-line
    'answer'   : 'After you sign in with your Google, Facebook or Twitter account, we will need two pieces\
                  of information from you. Firstly, we need you to tell us what line of business you are in.\
                  Secondly, we need you to tell us the city or area of your physical geographic location.\
                  And lastly, we need you to earn a positive net lead balance by submitting your first\
                  qualified referral. Then we can show you the lead referrals that you qualify to receive.',
  },
  {
    'id'       : '15',
    'question' : 'Why do you need me to sign in with my Google, Facebook or Twitter account?',
    // eslint-disable-next-line
    'answer'   : 'We need to verify you are a real person.',
  },
  {
    'id'       : '16',
    'question' : 'Why do you need my line of business and geographical location?',
    // eslint-disable-next-line
    'answer'   : 'Because that is the way we match you to the lead referrals in the network.\
                  We only show you the leads you can serve based on your line of business and physical\
                  geographic location.',
  },
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