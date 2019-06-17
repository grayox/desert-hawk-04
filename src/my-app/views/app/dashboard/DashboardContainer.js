// inspired by:
// src/my-app/layouts/crud/DashboardContainer.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Tooltip, Zoom, IconButton, Icon, } from '@material-ui/core'; // withStyles, Paper,
import { saveUserDataToFirestore, updateUserData, } from 'my-app/store/actions/my-actions/userDataActions'; //
// import _ from '@lodash';

import Dashboard from './Dashboard';
import Loading from 'my-app/components/Loading';
import Error500Page from 'my-app/components/Error500Page';
import SettingsMessage from 'my-app/components/SettingsMessage';
import SettingsStepper from 'my-app/components/steppers/SettingsStepper';

const INITIAL_STATE_ITEMS = {
  items: [],
}

const INITIAL_STATE_LOADING = {
  isError: false,
  isLoading: true,
  show: 'main', // 'main' | 'step' | 'greet'
}

const INITIAL_STATE = {
  ...INITIAL_STATE_ITEMS,
  ...INITIAL_STATE_LOADING,
};

class DashboardContainer extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.computeShow();
  }

  computeShow = () => {
    const { dashboard, } = this.props; // profile, settings,
    // console.log('profile\n', profile,);
    // console.log('dashboard\n', dashboard,);
    const ready1 = dashboard;
    if(!ready1) return null;
    const ready2 = dashboard.geoNation   && dashboard.geoNation.length   ;
    const ready3 = dashboard.geoRegion   && dashboard.geoRegion.length   ;
    const ready4 = dashboard.geoLocal    && dashboard.geoLocal.length    ;
    const ready5 = dashboard.bizCategory && dashboard.bizCategory.length ;
    const ready6 = ready1 && ready2 && ready3 && ready4 && ready5;
    const show = ready6 ? 'main' : 'step';
    this.setState({ show, });
    // return show;
  }

  handleSaveSettingsStepper = data => {
    const { saveUserDataToFirestore, settings, dashboard, } = this.props; // updateUserData,
    const { bizCategory, geoNation, geoRegion, geoLocal, } = data;
    const createdAt = Date.now();
    const newData = { createdAt, bizCategory, geoNation, geoRegion, geoLocal, };
    console.log('newData\n', newData,);
    console.log('settings\n', settings,);
    console.log('dashboard\n', dashboard,);

    const newSettings = {
      ...settings,
      ...newData,
    };
    const newDashboard = {
      ...dashboard,
      ...newData,
    };

    // this.setState({
    //   ...newData,
    //   show: 'main',
    // }
    //   // , () => {
    //   //   console.log('props\n', this.props,);
    //   //   console.log('state\n', this.state,);
    //   // }
    // );

    const settingsPath  = this.getPath('settings');
    const dashboardPath = this.getPath('dashboard');
    // db.collection(settingsPath).add(newData);
    // db.collection(dashboardPath).add(newData);
    // updateUserData('settings', newData,);
    // updateUserData('dashboard', newData,);
    saveUserDataToFirestore(settingsPath, newSettings,);
    saveUserDataToFirestore(dashboardPath, newDashboard,);
    this.handleChangeDashboard();
  }

  handleClickGeo = () => {
    this.setState({ show: 'step', });
    window.scrollTo( 0, 0, );
  }

  render() {
    const {
      isLoading, isError, show,
    } = this.state;
    const {
      classes, profile, dashboard, settings, dataHasLoaded, type,
    } = this.props;
    
    const getDashboard = () => <Dashboard dashboard={dashboard} type={type} /> //null;

    const getRefreshButton = () => //null;
      <Tooltip TransitionComponent={Zoom} title="Refresh data">
        <IconButton className={classes.refresh} onClick={() => null} color="inherit">
          <Icon>refresh</Icon>
        </IconButton>
      </Tooltip>

    const showConfig = {
      greet : <SettingsMessage onClick={this.handleClickGeo} /> ,
      step  : <SettingsStepper onSave={this.handleSaveSettingsStepper} /> ,
      main  : getMainContent(),
    }
      
    const getMainContent = () => <React.Fragment> {getRefreshButton()} {getDashboard()} </React.Fragment>
    const getIsError = () => <div className="h-full"><Error500Page /></div>
    const getHasLoaded = () => isError ? getIsError() : showConfig[show]
    const getIsLoading = () => <div className="h-full"><Loading /></div>
    const getDashboardContainer = () => ( isLoading ? getIsLoading() : getHasLoaded() )
    
    return getDashboardContainer();
  }
}

DashboardContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dashboard: PropTypes.object,
  dataHasLoaded: PropTypes.bool,
  type: PropTypes.oneOf(['standard', 'mini', 'micro',]),
};

DashboardContainer.defaultProps = {
  type: 'standard',
};

const mapStateToProps = state => {
  console.log('state\n', state);
  // const settings = state.firestore.ordered.users
  //               && state.firestore.ordered.users[0]
  //               && state.firestore.ordered.users[0].settings
  //               && state.firestore.ordered.users[0].settings[0];
  // const settings = state.settings;

  const settings = state
                && state.myApp
                && state.myApp.reducers
             // && state.myApp.reducers.settingsReducer
             // && state.myApp.reducers.settingsReducer.settings;
                && state.myApp.reducers.userDataReducer
                && state.myApp.reducers.userDataReducer.settings;
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
  console.log('settings\n', settings,);

  console.log('profile\n', profile,);
  console.log('dashboard\n', dashboard,);
  // console.log('dataHasLoaded\n', dataHasLoaded,);
  
  // //       YES   YES      YES       NO     NO
  // return { user, profile, settings, leads, dataHasLoaded, }
  // return { profile, settings, dataHasLoaded, }
  // return { profile, dashboard, dataHasLoaded, }
  return { profile, dashboard, settings, dataHasLoaded, }
}

const mapDispatchToProps = dispatch => ({
  updateUserData          : (path, newData,) => dispatch(updateUserData         (path, newData,)), // common mistakes: 1. forget to use this.props... when calling function in class 2. copy/paste forget to change function name in mapStateToProps => dispatch
  saveUserDataToFirestore : (path, newData,) => dispatch(saveUserDataToFirestore(path, newData,)), // common mistakes: 1. forget to use this.props... when calling function in class 2. copy/paste forget to change function name in mapStateToProps => dispatch
  // updateSettings: settings => dispatch(updateSettings(settings)),
})

// export default DashboardContainer;
// export default withStyles(styles, {withTheme: true})(DashboardContainer);
export default compose(
  // withStyles(styles, { withTheme: true }),
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