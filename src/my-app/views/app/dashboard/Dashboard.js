import React from 'react';
import PropTypes from 'prop-types';

// redux
import { compose } from 'redux';

// @material-ui/core
import { withStyles, Paper, } from '@material-ui/core';

import dashboardStyle from "my-app/vendors/creative-tim/assets/jss/material-dashboard-react/views/dashboardStyle";

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


const Dashboard = ({ classes, dashboard, type, }) => {

  const dashConfig = {
    standard : <div className={classes.wrapper}><DashboardWidgets data={dashboard} /></div>,
    mini     : <Paper><MiniDashboard data={dashboard} /></Paper>,
    micro    : <Paper><MiniDashboard data={dashboard} micro /></Paper>,
  }

  const getDashboard = () => dashConfig[type];

  return getDashboard();
  // return <div>Hello World!</div>;
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  dashboard: PropTypes.object,
  type: PropTypes.oneOf(['standard', 'mini', 'micro',]),
};

Dashboard.defaultProps = {
  type: 'standard',
};

export default compose(
  withStyles(styles, { withTheme: true }),
  // connect(mapStateToProps, mapDispatchToProps),
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