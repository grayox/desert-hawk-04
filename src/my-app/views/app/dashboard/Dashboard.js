import React from 'react';
import PropTypes from 'prop-types';

// redux
import { connect, } from 'react-redux';
import { compose, } from 'redux';

// @material-ui/core
import { withStyles, Paper, } from '@material-ui/core';

import dashboardStyle from "my-app/vendors/creative-tim/assets/jss/material-dashboard-react/views/dashboardStyle";
import SettingsMessage from 'my-app/components/SettingsMessage';
import SettingsStepper from 'my-app/components/steppers/SettingsStepper';
import { saveUserDataToFirestore, updateUserData, } from 'my-app/store/actions/my-actions/userDataActions'; //

// Custom Components
import DashboardWidgets from './DashboardWidgets';
import MiniDashboard from './MiniDashboard';

// config
import { uiSpecs, } from 'my-app/config/AppConfig';

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


const Dashboard = ({ classes, dashboard, settings, profile, show, type, updateUserData, saveUserDataToFirestore, }) => {

  const getPath = path => {
    const uid = profile.uid;
    const out = [ 'users' , uid , path , ].join('/');
    return out;
  }

  const handleSaveSettingsStepper = data => {
    // const { saveUserDataToFirestore, settings, dashboard, } = this.props; // updateUserData,
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

    const settingsPath  = getPath('settings');
    const dashboardPath = getPath('dashboard');
    // db.collection(settingsPath).add(newData);
    // db.collection(dashboardPath).add(newData);
    // updateUserData('settings', newData,);
    // updateUserData('dashboard', newData,);
    saveUserDataToFirestore(settingsPath, newSettings,);
    saveUserDataToFirestore(dashboardPath, newDashboard,);
    // this.handleChangeDashboard();
  }

  const handleClickGeo = () => {
    this.setState({ show: 'step', });
    window.scrollTo( 0, 0, );
  }

  const dashConfig = {
    standard : <div className={classes.wrapper}><DashboardWidgets data={dashboard} /></div>,
    mini     : <Paper><MiniDashboard data={dashboard} /></Paper>,
    micro    : <Paper><MiniDashboard data={dashboard} micro /></Paper>,
  }

  const getMainContent = () => dashConfig[type]

  const showConfig = {
    greet : <SettingsMessage onClick={handleClickGeo} /> ,
    step  : <SettingsStepper onSave={handleSaveSettingsStepper} /> ,
    main  : getMainContent(),
  }

  const getDashboard = () => showConfig[show];

  return getDashboard();
  // return <div>Hello Dashboard!</div>;
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  dashboard: PropTypes.object,
  type: PropTypes.oneOf(['standard', 'mini', 'micro',]),
};

Dashboard.defaultProps = {
  type: 'standard',
};

const mapDispatchToProps = dispatch => ({
  updateUserData          : ( path, newData, ) => dispatch(updateUserData         ( path, newData, )), // common mistakes: 1. forget to use this.props... when calling function in class 2. copy/paste forget to change function name in mapStateToProps => dispatch
  saveUserDataToFirestore : ( path, newData, ) => dispatch(saveUserDataToFirestore( path, newData, )), // common mistakes: 1. forget to use this.props... when calling function in class 2. copy/paste forget to change function name in mapStateToProps => dispatch
  // updateSettings: settings => dispatch(updateSettings(settings)),
})

export default compose(
  withStyles(styles, { withTheme: true }),
  // connect(mapStateToProps, mapDispatchToProps, ),
  connect(null, mapDispatchToProps,),
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