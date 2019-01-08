import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { Avatar, Tab, Tabs, Typography, } from '@material-ui/core'; // Button,
// import TimelineTab from 'main/content/pages/profile/tabs/TimelineTab';
// import PhotosVideosTab from 'main/content/pages/profile/tabs/PhotosVideosTab';
// import AboutTab from 'main/content/pages/profile/tabs/AboutTab';

// begin my add
// import * as Actions from './store/actions';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import {withRouter} from 'react-router-dom'


// firebase
// import firebase from '@firebase/app';
// import '@firebase/firestore';
// const db = firebase.firestore();
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

// for actions
// import {bindActionCreators} from 'redux';
import { updateSettings } from 'my-app/store/actions/my-actions';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SettingsDialog from './SettingsDialog';

// utilities
import _ from 'lodash';
// import * as EmailValidator from 'email-validator';
// import NumberFormat from 'react-number-format';

import DetailsTab from './tabs/DetailsTab';
import PreferencesTab from './tabs/PreferencesTab';
// note: this page began as src/my-app/profile-orig/ProfilePage.js
// interface: export class ProfilePage > import Settings ...
// end my add

const styles = theme => ({
  layoutRoot: {},
  layoutToolbar: {
    padding: 0
  },
  layoutHeader: {
    height: 320,
    minHeight: 320,
    background: "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover',
    color: '#fff',
    [theme.breakpoints.down('md')]: {
      height: 240,
      minHeight: 240
    }
  },
  tabsRoot: {
    height: 64,
    width: '100%'
  },
  tabRoot: {
    height: 64
  }
});


const INITIAL_STATE_SETTINGS_DIALOG = {
  dialogIsOpen: false,
  isDialogTextField: false,
  dialogContent: null, //<GeoStepper .../>
  dialogContentText: null, //'To subscribe to this website, please enter your email address here. We will send updates occasionally.',
  dialogFieldName: null, //'name',
  dialogTextFieldLabel: null, //'first and last',
  dialogTitle: '', //'Name',
  tempSetting: null,
}

const INITIAL_STATE = {

  value: 0,

  checked: [],

  settings: {
    name: null,
    email: null,
    mobile: null, 
    bizCategory: null,
    geoNation: null,
    geoRegion: null,
    geoLocal: null,
    isValidGeo: null,
  },

  geoKey: Date.now(), // necessary to re-render GeoSelect component after reset

  isValidName: false,
  isValidEmail: false,
  isValidPhone: false,
  isValidBizCategory: false,
  isValidForm: false,

  isErrorName: false,
  helperTextName: null,
  isErrorEmail: false,
  helperTextEmail: null,
  
  anchorElMenu: null,
  anchorElMenu1: null,
  anchorElMenu2: null,
  selectedIndexMenu: null,
  selectedIndexMenu1: 1,
  selectedIndexMenu2: 1,
};

const optionsMenu = [
  // 'Select one',
  'Home',
  'Mortgage',
  'Insurance',
  'Financial',
];

const optionsMenu1 = [
  'Light',
  'Dark (saves battery)',
];

const optionsMenu2 = [
  'Condensed',
  'Expanded',
];

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      ...INITIAL_STATE_SETTINGS_DIALOG,
    };
  }

  // state = {
  //   general: null,
  //   work: null,
  //   contact: null,
  //   groups: null,
  //   friends: null
  // };

  // componentDidMount() {
  //   axios.get('/api/profile/about').then(res => {
  //     this.setState(res.data);
  //   });
  // }

  // saveToFirebase = data => {
  //   const collectionRef = db.collection(this.props.savePath);
  //   console.info('submitting...', data);
  //   collectionRef.add(data)
  //     .then(docRef => {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch(error => {
  //       console.error("Error adding document: ", error);
  //     });
  //   console.info('submitted: ', data);
  // }

  // resetForm = () => {
  //   this.setState(INITIAL_STATE);
  //   this.setState({
  //     geoKey: Date.now(), // resets geoStepper
  //   });
  // }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  // --------------------------------

  handleValidGeoStepper = model => {
    // handleSaveGeoStepper = model => {
    // console.log('model\n', model);
    const picked = _.pick(model, ['geoNation', 'geoRegion', 'geoLocal',]);
    const tempSetting = {
      ...picked,
      isValidGeo: true,
    };
    this.setState(
      { tempSetting },
      () => {
        // console.log('state\n', this.state);
      });
  };

  // --------------------------------

  handleClickListItemMenu = event => {
    this.setState({ anchorElMenu: event.currentTarget });
  };

  handleMenuItemClickMenu = (event, index) => {
    const option = optionsMenu[index];
    const settings = _.merge(this.state.settings, {bizCategory: option,});
    this.setState({
      selectedIndexMenu: index, // saves menu index as integer in local state
      anchorElMenu: null, // closes menu, saves to local state
      // settings, // passes settings along to global state
    }, () => {
      console.log('state\n', this.state);
      this.props.updateSettings(/*this.state.*/settings);
    });
  };

  handleCloseMenu = () => {
    this.setState({ anchorElMenu: null });
  };

  // --------------------------------

  handleKeyPressDialog = event => {
    if (event.key === 'Enter') {
      // this.setState({ value: event.target.value })
      this.handleSaveDialog();
    }
  };

  handleChangeDialog = event => {
    // console.log('event.target\n', event.target);
    const val = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    // console.log('val\n', val);
    const tempSetting = { [event.target.name] : val };
    // console.log('tempSetting\n', tempSetting);
    this.setState({tempSetting});
    // console.log('state\n', this.state);
  };
  
  handleResetDialog = event => {
    this.setState({ dialogIsOpen: false, });
    this.setState({ ...INITIAL_STATE_SETTINGS_DIALOG });
  }
  
  handleSaveDialog = event => {
    // console.log('state\n', this.state);
    const settings = _.merge(this.state.settings, this.state.tempSetting);
    // console.log('settings\n', settings);
    this.setState({settings});
    // console.log('state\n', this.state);
    this.props.updateSettings(this.state.settings);
    this.handleResetDialog();
  }

  // --------------------------------
  
  handleClickListItemDialog = ob => event => {
    // consnulle.log('ob\n', ob);
    this.setState({
      dialogIsOpen: true,
      ...ob,
    });
  }
  
  // --------------------------------
  
  // change tabs

  // --------------------------------

  handleCloseMenu1 = () => {
    this.setState({ anchorElMenu1: null });
  };

  handleClickListItemMenu1 = event => {
    this.setState({ anchorElMenu1: event.currentTarget });
  };

  handleMenuItemClickMenu1 = (event, index) => {
    this.setState({ selectedIndexMenu1: index, anchorElMenu1: null });
  };

  // --------------------------------

  handleCloseMenu2 = () => {
    this.setState({ anchorElMenu2: null });
  };

  handleMenuItemClickMenu2 = (event, index) => {
    this.setState({ selectedIndexMenu2: index, anchorElMenu2: null });
  };

  handleClickListItemMenu2 = event => {
    this.setState({ anchorElMenu2: event.currentTarget });
  };

  // --------------------------------

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes, user } = this.props; //settings, profile, leads,

    // console.log('user\n', user);
    // console.log('settings\n', settings);
    // console.log('profile\n', profile);
    // console.log('leads\n', leads);

    // if (!user.data.uid) return <Redirect to='/login' /> 
    // const { general, work, contact, } = this.state;

    // const { isValidGeo, geoNation, geoRegion, geoLocal, bizCategory } = this.state.settings;
    // const { isValidGeo, geoNation, geoRegion, geoLocal, bizCategory } = this.props.settings;
    const { isValidGeo, geoNation, geoRegion, geoLocal, bizCategory }
      = this.props.settings ? this.props.settings : this.state.settings;
    
    const {
      dialogIsOpen, dialogContent, dialogContentText, dialogTitle,
      isDialogTextField, dialogTextFieldLabel, dialogFieldName,
      anchorElMenu, selectedIndexMenu, geoKey, value,
      // isValidName, isValidEmail, isValidPhone, isValidBizCategory, isValidForm,
      anchorElMenu1, anchorElMenu2,
      selectedIndexMenu1, selectedIndexMenu2,
    } = this.state;
    const {
      handleChange,
      // handleValidGeoStepper, handleClickListItemDialog, handleClickListItemMenu,
      handleMenuItemClickMenu, handleCloseMenu,
      handleKeyPressDialog, handleChangeDialog,
      handleResetDialog, handleSaveDialog,
      handleClickListItemMenu1, handleClickListItemMenu2,
    } = this;

    return (

      <React.Fragment>

        <Menu
          id="menu"
          anchorEl={anchorElMenu}
          open={Boolean(anchorElMenu)}
          onClose={handleCloseMenu}
        >
          {optionsMenu.map((option, index) => (
            <MenuItem
              key={option}
              // disabled={index === 0}
              selected={index === selectedIndexMenu}
              onClick={event => handleMenuItemClickMenu(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        <SettingsDialog
          onKeyPress={handleKeyPressDialog}
          onChange={handleChangeDialog}
          onClose={handleResetDialog}
          onCancel={handleResetDialog}
          onSave={handleSaveDialog}    
          dialogIsOpen={dialogIsOpen}
          dialogTitle={dialogTitle}
          dialogContent={dialogContent}
          dialogContentText={dialogContentText}
          dialogFieldName={dialogFieldName}
          dialogTextFieldLabel={dialogTextFieldLabel}
          isDialogTextField={isDialogTextField}
        />

        <FusePageSimple
          classes={{
            root: classes.layoutRoot,
            header: classes.layoutHeader,
            toolbar: classes.layoutToolbar
          }}
          header={
            <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
              <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  {/* <Avatar className="w-96 h-96" src="assets/images/avatars/Velazquez.jpg" /> */}
                  {/* begin my add */}
                  <Avatar className="w-96 h-96" src={user.data.photoURL} />
                  {/* end my add */}
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  {/* <Typography className="md:ml-24" variant="h4" color="inherit">John Doe</Typography> */}
                  {/* begin my add */}
                  <Typography className="md:ml-24" variant="h4" color="inherit">{user.data.displayName}</Typography>
                  {/* end my add */}
                </FuseAnimate>
              </div>

              {/* <div className="flex items-center justify-end">
                <Button className="mr-8 normal-case" variant="contained" color="secondary" aria-label="Follow">Follow</Button>
                <Button className="normal-case" variant="contained" color="primary" aria-label="Send Message">Send Message</Button>
              </div> */}
            </div>
          }
          contentToolbar={
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              scrollable
              scrollButtons="auto"
              classes={{
                root: classes.tabsRoot
              }}
            >
              {/* <Tab
                classes={{
                  root: classes.tabRoot
                }} label="Timeline" />
              <Tab
                classes={{
                  root: classes.tabRoot
                }} label="About" />
              <Tab
                classes={{
                  root: classes.tabRoot
                }} label="Photos & Videos" /> */}
              {/* begin my add */}
              <Tab
                classes={{
                  root: classes.tabRoot
                }} label="Details" />
              <Tab
                classes={{
                  root: classes.tabRoot
                }} label="Preferences" />
              {/* end my add */}
            </Tabs>
          }
          content={
            // <div className="p-16 sm:p-24">
            //   {value === 0 && (
            //     <TimelineTab />
            //   )}
            //   {value === 1 && (
            //     <AboutTab />
            //   )}
            //   {value === 2 && (
            //     <PhotosVideosTab />
            //   )}
            // </div>
            // begin my add
            <div className="p-0 md:p-24">
              {value === 0 && (
                <DetailsTab
                  user={user}
                  dialogIsOpen={dialogIsOpen}
                  dialogContent={dialogContent}
                  dialogContentText={dialogContentText}
                  dialogTitle={dialogTitle}
                  isDialogTextField={isDialogTextField}
                  dialogTextFieldLabel={dialogTextFieldLabel}
                  dialogFieldName={dialogFieldName}
                  anchorElMenu={anchorElMenu}
                  selectedIndexMenu={selectedIndexMenu}
                  geoKey={geoKey}
                  isValidGeo={isValidGeo}
                  geoNation={geoNation}
                  geoRegion={geoRegion}
                  geoLocal={geoLocal}
                  bizCategory={bizCategory}
                />
                )}
              {value === 1 && (
                <PreferencesTab
                  anchorElMenu1={anchorElMenu1}
                  anchorElMenu2={anchorElMenu2}
                  selectedIndexMenu1={selectedIndexMenu1}
                  selectedIndexMenu2={selectedIndexMenu2}
                  handleClickListItemMenu1={handleClickListItemMenu1}
                  handleClickListItemMenu2={handleClickListItemMenu2}
                  optionsMenu1={optionsMenu1}
                  optionsMenu2={optionsMenu2}
                />
                )}
            </div>
            // end my add
          }
        />

      </React.Fragment>

    )
  };
}

// begin my add

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     // getData: Actions.getData,
//     // getTodos: Actions.getTodos
//   }, dispatch);
// }

// function mapStateToProps({ auth }) {
//   return {
//     user: auth.user,
//   }
// }

// function mapStateToProps({ auth }) {
  function mapStateToProps( state ) {
    // console.log('state\n', state);
    const settings = state.firestore.ordered.users
                  && state.firestore.ordered.users[0]
                  && state.firestore.ordered.users[0].settings
                  && state.firestore.ordered.users[0].settings[0];
    return {
      // user: auth.user
      user: state.auth.user, // {role, data: {uid, displayName, email, ...}}
      // settings: state.settings,
  
      // projects: state.firestore.ordered.projects,
      // auth: state.firebase.auth,
      // notifications: state.firestore.ordered.notifications,
  
      // template for top-level stored objects from firebase using FirebaseConnect to fetch it
      leads: state.firestore.ordered.leads,
      // from docs: http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/profile.html#basic
      profile: state.firebase.profile, // profile passed as props.profile
  
      // trying
      settings,
      
      // success
      // settings: state.firestore.ordered.users,//[0],//.settings[0],
      
      // fail
      // settings: state.firestore.ordered.users.0,//.settings[0], // does not compile, unextected token
      // settings: state.firestore.ordered.users[0],//.settings[0], // can not find [0] of undefined
      // settings: state.firestore.data.users[state.auth.user.data.uid].settings,
      // settings: state.firestore.data.users.settings,
      // settings: state.firestore.ordered.users.settings,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      updateSettings: settings => dispatch(updateSettings(settings)),
    }
  }
  
  // function mapDispatchToProps(dispatch)
  // {
  //     return bindActionCreators({
  //         toggleQuickPanel: quickPanelActions.toggleQuickPanel,
  //         logout          : authActions.logoutUser,
  //         openChatPanel   : chatPanelActions.openChatPanel,
  //     }, dispatch);
  // }
  
  // export default withStyles(styles, { withTheme: true })(DetailsTab);
  // export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(DetailsTab));
  export default compose(
    
    withStyles(styles, { withTheme: true }),
    
    connect(mapStateToProps, mapDispatchToProps),
    // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
    // connect auth from redux state to the auth prop
    // connect(({ firebase: { auth } }) => ({ auth })),
    // show spinner while auth is loading
    // spinnerWhileLoading(['auth']),
  
    firestoreConnect(props => {
      // console.log('props\n', props);
      // const path = [ 'users', props.profile.uid, 'settings' ].join('/'); // fail
      return [
        // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
        // { collection: 'projects', orderBy: ['createdAt', 'desc'] },
        // { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
  
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
              limit: 1,
              orderBy: ['timestamp', 'desc',],
              storeAs: 'settings',
            },
          ],
  
        },
  
      ];
    })
  
  )(ProfilePage)
  
  // export default compose(
  //   firestoreConnect((props) => [
  //     { path: 'leads' } // string equivalent 'todos'
  //   ]),
  //   connect((state, props) => ({
  //     leads: state.firebase.data.leads
  //   }))
  // )(ProfilePage)

// end my add

// export default withStyles(styles, { withTheme: true })(ProfilePage);