// Note: Experimenting with automating settings page construction
// using a settingsConfig variable in AppConfig.js

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { Avatar, Tab, Tabs, Typography, } from '@material-ui/core'; // Button,
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateSettings } from 'my-app/store/actions/my-actions';
import { Menu, MenuItem, } from '@material-ui/core';
import SettingsDialog from './SettingsDialog';
import _ from '@lodash';
import Loading from 'my-app/components/Loading';
import ErrorBoundary from 'my-app/containers/ErrorBoundary';
import DetailsTab from './tabs/DetailsTab';
import PreferencesTab from './tabs/PreferencesTab';


const styles = theme => ({
  wrapper: {
    minHeight: '100vh',
    verticalAlign: 'top', // overcomes default
    // paddingTop: '56px', // clears <AppBar />
  },
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

class SettingsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      ...INITIAL_STATE_SETTINGS_DIALOG,
    };
  }

}

SettingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  // console.log('state\n', state);
  // const settings = state.firestore.ordered.users
  //               && state.firestore.ordered.users[0]
  //               && state.firestore.ordered.users[0].settings
  //               && state.firestore.ordered.users[0].settings[0];
  // const settings = state.settings;
  const settings = state
                && state.myApp
                && state.myApp.reducers
                && state.myApp.reducers.userDataReducer
                && state.myApp.reducers.userDataReducer.settings;
  const profile = state
               && state.firebase
               && state.firebase.profile;
  // replace user with profile; user contains default settings
  // const user = state.auth.user;
  // const leads = state.firestore.ordered.leads;
  const dataHasLoaded = !!profile && !!settings; // && !!leads && !!user && 
  
  // console.log('user\n', user);
  // console.log('leads\n', leads);
  console.log('profile\n', profile);
  console.log('settings\n', settings);
  console.log('dataHasLoaded\n', dataHasLoaded);
  
  // //       YES   YES      YES       NO     NO
  // return { user, profile, settings, leads, dataHasLoaded, }
  return { profile, settings, dataHasLoaded, }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSettings: settings => dispatch(updateSettings(settings)),
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),  
  connect(mapStateToProps, mapDispatchToProps,),
)(SettingsPage)