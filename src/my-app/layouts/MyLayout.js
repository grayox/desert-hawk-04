import React from 'react';

import classNames from 'classnames';
import { withStyles, } from '@material-ui/core';

import MediaWidth from './MediaWidth';
import MobileDrawer from './drawers/MobileDrawer';
import TabletDrawer from './drawers/TabletDrawer';
import LaptopDrawer from './drawers/LaptopDrawer';
// import ResponsiveDrawer from './drawers/ResponsiveDrawer';
// import { CssBaseline, } from '@material-ui/core';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { updateUserData, saveUserDataToFirestore, } from 'my-app/store/actions/my-actions'; // updateSettings, updateDashboard,

// import FetchSettings from 'my-app/containers/FetchSettings';
import FetchUserData from 'my-app/containers/FetchUserData';
import withReducer from 'store/withReducer';
// import reducer from './store/reducers';
import reducer from 'my-app/store/reducers';

const styles = theme => ({
  wrapper: {
    height: '100vh',
  },
})

const MyLayout = props => {
  const { classes, profile, } = props;
  const { uid, } = profile;

  const handleChangeUserData = (path, newData, saveDataToFirestore,) => {
    console.log('handleChangeUserData-path\n', path,)
    console.log('handleChangeUserData-data\n', newData,)
    console.log('saveDataToFirestore\n', saveDataToFirestore,)
    const { updateUserData, saveUserDataToFirestore, } = props;
    updateUserData( path, newData, ); // updates global state
    if(saveDataToFirestore) {
      const dataPath = [ 'users' , uid , path , ].join('/');
      saveUserDataToFirestore( dataPath, newData, ); // updates firebase
    }
  }  

  return (
    <div
      // className="w-full"
      className={classNames( "w-full overflow-auto", classes.wrapper, )}
    >
      <FetchUserData path="settings"  uid={uid} onChange={handleChangeUserData} />
      <FetchUserData path="dashboard" uid={uid} onChange={handleChangeUserData} />
      {
      // <FetchSettings />
      // <div className="border-8 border-blue w-full overflow-auto">
      // <CssBaseline />
      }
      <MediaWidth
        mobile={<MobileDrawer/>}
        tablet={<TabletDrawer/>}
        laptop={<LaptopDrawer/>}
        // <ResponsiveDrawer/>
      />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  updateUserData          : (path, newData,) => dispatch(updateUserData         (path, newData,)),
  saveUserDataToFirestore : (path, newData,) => dispatch(saveUserDataToFirestore(path, newData,)), // common mistakes: 1. forget to use this.props... when calling function in class 2. copy/paste forget to change function name in mapStateToProps => dispa)
})

const mapStateToProps = state => {
  const profile = state.firebase.profile;
  return { profile, } // user,
}

// export default MyLayout;
// export default withStyles(styles, { withTheme: true, })(MyLayout);
// export default withReducer( 'myLayout', reducer, )(withStyles(styles, { withTheme: true, })(MyLayout));
export default compose(
  connect( mapStateToProps, mapDispatchToProps, ),
  withReducer( 'myApp', reducer, ),
  withStyles( styles, { withTheme: true } ),
)(MyLayout)