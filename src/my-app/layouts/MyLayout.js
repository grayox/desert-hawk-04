// import React from 'react';
import React, { useState, } from 'react';

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
  const { classes, profile, } = props; // settings,
  const { uid, } = profile;
  const t = Date.now();

  const [ timestamp, setTimestamp, ] = useState(t);
  const handleUpdateUserData = () => {
    const t = Date.now();
    setTimestamp(t);
    // console.log('settings\n', settings);
  }
  
  // const ready = profile && settings;
  // if(!ready) return null;

  const handleChangeUserData = ( path, newData, saveDataToFirestore, ) => {
    // console.log('handleChangeUserData-path\n', path,)
    console.log('handleChangeUserData-data\n', newData,)
    // console.log('saveDataToFirestore\n', saveDataToFirestore,)
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
      <FetchUserData key={timestamp+1} path="settings"  uid={uid} onChange={handleChangeUserData} />
      <FetchUserData key={timestamp+2} path="dashboard" uid={uid} onChange={handleChangeUserData} />
      {
      // <FetchSettings />
      // <div className="border-8 border-blue w-full overflow-auto">
      // <CssBaseline />
      // <div className="m-32">
      //   <button className="m-32 text-white" onClick={handleUpdateUserData}>Update data</button>
      // </div>
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
  // const settings = state.myApp.reducers.userDataReducer.settings;
  // const profile = state.firebase.profile;
  // const settings = state
  //   && state.myApp
  //   && state.myApp.reducers
  //   && state.myApp.reducers.userDataReducer
  //   && state.myApp.reducers.userDataReducer.settings;
  const profile = state
    && state.firebase
    && state.firebase.profile;
  return { profile, } // user, settings,
}

// export default MyLayout;
// export default withStyles(styles, { withTheme: true, })(MyLayout);
// export default withReducer( 'myLayout', reducer, )(withStyles(styles, { withTheme: true, })(MyLayout));
export default compose(
  connect( mapStateToProps, mapDispatchToProps, ),
  withReducer( 'myApp', reducer, ),
  withStyles( styles, { withTheme: true } ),
)(MyLayout)