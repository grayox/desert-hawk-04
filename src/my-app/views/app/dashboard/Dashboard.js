import React, { Component } from 'react';
import PropTypes from "prop-types";

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';

// @material-ui/core
import { withStyles, Hidden, } from '@material-ui/core';

import dashboardStyle from "my-app/vendors/creative-tim/assets/jss/material-dashboard-react/views/dashboardStyle";

// Custom Components
import DashboardWidgets from './DashboardWidgets';
import Error500Page from 'my-app/components/Error500Page';
import Loading from 'my-app/components/Loading.js';
import SettingsMessage from 'my-app/components/SettingsMessage';
import SettingsStepper from 'my-app/components/steppers/SettingsStepper';

// config
import { uiSpecs } from 'my-app/config/AppConfig';

// firebase
import firebase from '@firebase/app';
import '@firebase/firestore';

const db = firebase.firestore();

const styles = theme => ({

  root: {
    // display: 'flex',
    ...dashboardStyle,
    height: '100vh',
  },
  
  wrapper: {
    padding: 0, // flush with top on mobile //'56px', // clears <AppBar />
    // verticalAlign: 'top', // overcomes default
    width: `calc(100vw - ${uiSpecs.drawerWidth})`, // flush with right edge on mobile
    height: 'calc(100vh - 128px)',
  },

});

const INITIAL_STATE_DIALOG = {
  dialogOpen: false,
  dialogTitle: null,
  dialogContentText: null,
  dialogButtonLabel: null,
};

const INITIAL_STATE_BASELINE = {
  // isLoading: true,
  isError: false,
  bizCategory: null,
  categoryOpen: false,
  show: 'main', // 'main' | 'step' | 'greet'
};

const INITIAL_STATE = {
  ...INITIAL_STATE_DIALOG,
  ...INITIAL_STATE_BASELINE,
};

class Dashboard extends Component {

  state = INITIAL_STATE;

  handleSaveSettingsStepper = data => {
    const { bizCategory, geoNation, geoRegion, geoLocal, } = data;
    const createdAt = Date.now();
    const newData = { createdAt, bizCategory, geoNation, geoRegion, geoLocal, };
    this.setState({
      ...newData,
      show: 'main',
    });
    const path = this.getPath();
    db.collection(path)
      .add(newData);
  }

  handleClickGeo = () => {
    this.setState({ show: 'step', });
    window.scrollTo(0, 0);
  }

  handleOpenCategory = () => {
    // console.log('opening category...');
    // console.log('state\n', this.state);
    this.setState({ categoryOpen: true, });
    // console.log('state\n', this.state);
  }
  
  handleCloseCategory = () => {
    // console.log('closing category...');
    // console.log('state\n', this.state);
    this.setState({ categoryOpen: false, });
    // console.log('state\n', this.state);
  }

  handleChangeCategory = model => {
    const { geoNation, geoRegion, geoLocal, } = this.state;
    // console.log('model\n', model);
    // this.setState({ [model.target.name]: model.target.value });
    const bizCategory = model.target.value;
    this.setState({ bizCategory, });
    // console.log('state\n', this.state);
    const createdAt = Date.now();
    const newData = { createdAt, bizCategory, geoNation, geoRegion, geoLocal, };
    const path = this.getPath();
    db.collection(path)
      .add(newData);
  }

  handleClickInfo = item => {
    // console.log('handling click info...');
    // console.log('item\n', item);
    this.setState({
      dialogOpen: true,
      dialogTitle: item.label,
      dialogContentText: item.desc,
      dialogButtonLabel: item.buttonLabel,
    });
  }

  handleCloseDialog = () => {
    this.setState(INITIAL_STATE_DIALOG);
  }

  render() {
    // console.log('user\n', this.props.user);
    // console.log('leads\n', this.props.leads);
    // console.log('profile\n', this.props.profile);
    // console.log('settings\n', this.props.settings);
    // console.log('dataHasLoaded\n', this.props.dataHasLoaded);

    const { classes, dataHasLoaded, dashboard, } = this.props; 
    // console.log('dashboard\n', dashboard,);

    const { handleSaveSettingsStepper, handleClickGeo, } = this;
    const { show, isError, } = this.state;

    const showConfig = {
      greet : <SettingsMessage onClick={handleClickGeo}           /> ,
      step  : <SettingsStepper onSave={handleSaveSettingsStepper} /> ,
      main  : <DashboardWidgets data={dashboard}                  /> ,
    }

    const getMain = () => <div className={classes.wrapper}>{showConfig[show]}</div>
    
    return ( !dataHasLoaded ? <Loading /> : ( isError ? <Error500Page /> : getMain() ) )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  // console.log('state\n', state);
  // const settings = state.firestore.ordered.users
  //               && state.firestore.ordered.users[0]
  //               && state.firestore.ordered.users[0].settings
  //               && state.firestore.ordered.users[0].settings[0];
  // const settings = state.settings;

  // const settings = state
  //               && state.myApp
  //               && state.myApp.reducers
  //               && state.myApp.reducers.settingsReducer
  //               && state.myApp.reducers.settingsReducer.settings;
  const dashboard = state
                 && state.myApp
                 && state.myApp.reducers
                 && state.myApp.reducers.userDataReducer
                 && state.myApp.reducers.userDataReducer.dashboard;

  const profile = state
               && state.firebase
               && state.firebase.profile;
  // replace user with profile; user contains default settings
  // const user = state.auth.user;
  // const leads = state.firestore.ordered.leads;
  const dataHasLoaded = !!profile && !!dashboard; // !!settings; // && !!leads && !!user && 
  
  // // console.log('user\n', user,);
  // // console.log('leads\n', leads,);
  // console.log('settings\n', settings,);

  // console.log('profile\n', profile,);
  // console.log('dashboard\n', dashboard,);
  // console.log('dataHasLoaded\n', dataHasLoaded,);
  
  // //       YES   YES      YES       NO     NO
  // return { user, profile, settings, leads, dataHasLoaded, }
  // return { profile, settings, dataHasLoaded, }
  return { profile, dashboard, dataHasLoaded, }
}

const mapDispatchToProps = dispatch => {
  return {
    // updateSettings: settings => dispatch(updateSettings(settings)),
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps),
  // withRouter(connect(mapStateToProps, mapDispatchToProps),
  // firestoreConnect(props => {
  //   return [
  //     { collection: 'leads', orderBy: ['createdAt', 'desc'] },
  //     {
  //       collection: 'users',
  //       doc: props.profile.uid,
  //       subcollections: [
  //         {
  //           collection: 'settings',
  //           limit: 1,
  //           orderBy: ['createdAt', 'desc',],
  //           storeAs: 'settings',
  //         },
  //       ],
  //     },
  //   ];
  // }),
)(Dashboard)
