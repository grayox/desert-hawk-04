import React from 'react';
import PropTypes from 'prop-types';

// redux
import { connect, } from 'react-redux';
import { compose, } from 'redux';

// lodash
import _ from '@lodash';

// @material-ui/core
import { withStyles, Paper, } from '@material-ui/core';

// import dashboardStyle from "my-app/vendors/creative-tim/assets/jss/material-dashboard-react/views/dashboardStyle";
// import SettingsMessage from 'my-app/components/SettingsMessage';
import SettingsStepper from 'my-app/components/steppers/SettingsStepper';
import CustomAlert from 'my-app/components/CustomAlert';
import { saveUserDataToFirestore, updateUserData, } from 'my-app/store/actions/my-actions/userDataActions'; //

// Custom Components
import DashboardWidgets from './DashboardWidgets';
import MiniDashboard from './MiniDashboard';

// config
import { uiSpecs, } from 'my-app/config/AppConfig'; // getMatchHash, getPath,

const styles = theme => ({
  // root: {
  //   // display: 'flex',
  //   // ...dashboardStyle,
  //   height: '100vh',
  // }, 
  wrapper: {
    padding: 0, // flush with top on mobile //'56px', // clears <AppBar />
    // verticalAlign: 'top', // overcomes default
    width: `calc(100vw - ${uiSpecs.drawerWidth})`, // flush with right edge on mobile
    height: 'calc(100vh - 128px)',
  },
});


const Dashboard = ({ classes, dashboard, settings, profile, show, type, saveUserDataToFirestore, }) => { // onChange,

  const handleSaveSettingsStepper = data => {
    // console.log('data\n', data,);
    // const { saveUserDataToFirestore, settings, dashboard, } = this.props; // updateUserData,
    // const { bizCategory, geoNation, geoRegion, geoLocal, } = data;
    const picked = _.pick( data, [ 'bizCategory', 'geoNation', 'geoRegion', 'geoLocal', ], );
    const createdAt = Date.now();
    // const matchHash = getMatchHash(picked);
    // const newData = { createdAt, bizCategory, geoNation, geoRegion, geoLocal, };
    const newData = { ...picked, createdAt, }; // matchHash,
    // console.log('newData\n', newData,);
    // console.log('settings\n', settings,);
    // console.log('dashboard\n', dashboard,);

    const newSettings = {
      ...settings,
      ...newData,
    };
    const newDashboard = {
      ...dashboard,
      ...newData,
    };

    // this.setState({ // this is a controlled component, so no state
    //   ...newData,
    //   show: 'main',  // show is controlled from DashboardContainer
    // }
    //   // , () => {
    //   //   console.log('props\n', this.props,);
    //   //   console.log('state\n', this.state,);
    //   // }
    // );

    const { uid, } = profile;
    const settingsPath  = [ 'settings'  , uid , ].join('/'); // getPath( uid , 'settings'  , );
    const dashboardPath = [ 'dashboard' , uid , ].join('/'); // getPath( uid , 'dashboard' , );
    // console.log('settingsPath\n', settingsPath,);
    // console.log('dashboardPath\n', dashboardPath,);
    // console.log('settingsPath\n', newSettings,);
    // console.log('newDashboard\n', newDashboard,);
    // db.collection(settingsPath).add(newData);
    // db.collection(dashboardPath).add(newData);
    // updateUserData( 'settings'  , newData , );
    // updateUserData( 'dashboard' , newData , ); 
    saveUserDataToFirestore( settingsPath  , newSettings  , );
    saveUserDataToFirestore( dashboardPath , newDashboard , );

    // this.handleChangeDashboard();
    // onChange();
  }

  // const handleClickGeo = () => {
  //   // this is a controlled component, so no state
  //   // this.setState({ show: 'step', }); // show is controlled from DashboardContainer
  //   window.scrollTo( 0, 0, );
  // }

  const getAlert = () => {
    // console.log('dashboard\n', dashboard,);
    const { net, } = dashboard;
    const ready1 = typeof net === 'number';
    const ready2 = net > 0;
    const hideAlert = !!ready1 && !!ready2;
    const showAlert = !hideAlert;
    return (
      showAlert &&
      <CustomAlert
        variant="traditional"
        heading="⚠️ Your lead balance is zero!"
        content="To access more referrals, you must refer a new lead now"
        shadow
      />
    )
  } 

  const dashConfig = {
    standard : <div className={classes.wrapper}><DashboardWidgets data={dashboard} settings={settings} /></div>,
    mini     : <Paper><MiniDashboard data={dashboard} /></Paper>,
    micro    : <Paper><MiniDashboard data={dashboard} micro /></Paper>,
  }

  const getDashConfig = type => dashConfig[type]

  const getMainContent = () => <React.Fragment>{getAlert()}{getDashConfig(type)}</React.Fragment>

  const showConfig = {
    // greet : <SettingsMessage onClick={handleClickGeo} /> ,
    step  : <SettingsStepper onSave={handleSaveSettingsStepper} /> ,
    main  : getMainContent(),
  }

  const getDashboard = () => ( type === 'standard' ) ? showConfig[show] : getMainContent();

  return getDashboard();
  // return <div>Hello Dashboard!</div>;
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  dashboard: PropTypes.object,
  type: PropTypes.oneOf([ 'standard', 'mini', 'micro', ]),
};

Dashboard.defaultProps = {
  type: 'standard',
};

const mapDispatchToProps = dispatch => ({
  // common mistakes: 1. forget to use this.props... when calling function in class 2. copy/paste forget to change function name in mapStateToProps => dispatch
  updateUserData          : ( path, newData, ) => dispatch(updateUserData         ( path, newData, )),
  saveUserDataToFirestore : ( path, newData, ) => dispatch(saveUserDataToFirestore( path, newData, )),
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