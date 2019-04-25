// next generation version of FetchSettings.js:
// enables fetching of 'settings' and 'dashboard' via prop.path

// import React, { Component } from 'react';
import { Component } from 'react';
// import PropTypes from "prop-types";

// redux
import { connect } from 'react-redux';
// import { compose } from 'redux';
import compose from 'recompose/compose';

// import { withStyles, } from '@material-ui/core';
import { loadUserData, } from 'my-app/containers/LoadAsync';

// begin my add

import { updateUserData, saveUserDataToFirestore, } from 'my-app/store/actions/my-actions'; // updateSettings, updateDashboard,
import { getDashboardInitialValues, } from 'my-app/config/DashboardGridConfig';
import { settingsConfig, } from 'my-app/config/AppConfig';

// inspired by: src/my-app/layouts/crud/store/actions/crud.actions.js
// which was, in turn,
// inspired by: src/my-app/store/actions/my-actions/leadsActions.js
// ref: https://firebase.google.com/docs/firestore/quickstart#next_steps

const getInitialValues = path => {
  const initialValuesConfig = {
    settings: settingsConfig,
    dashboard: getDashboardInitialValues(),
  };
  const out = initialValuesConfig[path];
  // console.log('out\n', out,);
  return out;
}

const INITIAL_STATE = {
  items: null,
  isError: false,
  isLoading: true,
};

class FetchUserData extends Component {

  // state = INITIAL_STATE;
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.handleLoad();
  }

  componentWillUnmount() {
    this.handleCancel();
  }

  getPath() {
    // console.log('props\n', this.props);
    const uid = this && this.props && this.props.profile && this.props.profile.uid;
    if(!uid) throw new Error('uid not available');
    const path = this && this.props && this.props.path;
    if(!path) throw new Error('path variable not available');

    return uid ? [ 'users' , uid , path , ].join('/') : null;
  }

  // refs: https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data
  // https://stackoverflow.com/a/55093394/1640892 | https://codesandbox.io/s/lrvwm88pv7
  // handleLoad() {
  //   this._asyncRequest = loadUserData().then(
  //     externalData => {
  //       this._asyncRequest = null;
  //       this.setState({externalData});
  //     }
  //   );
  // }

  handleLoad = async () => {
    // console.log('props\n', this.props);
    const { path, updateUserData, saveUserDataToFirestore, } = this.props;
    const dataPath = await this.getPath();
    // console.log('dataPath\n', dataPath);

    this.setState({ isLoading: true, });
    // this._asyncRequest = loadUserData();
    this._asyncRequest = loadUserData(dataPath);
    const newData = await this._asyncRequest;

    if(!!newData) {
      updateUserData(path, newData,);
    } else {
      const initialValues = getInitialValues(path);
      // console.log('path\n', path,);
      // console.log('initialValues\n', initialValues,);  
      updateUserData( path, initialValues, ); // updates global state
      saveUserDataToFirestore( dataPath, initialValues, ); // updates firebase
    }

    const newState = { isLoading: false, };
    newState[path] = newData;
    this.setState({...newData});

    this._asyncRequest = null;
  }

  handleCancel = () => {
    this.setState(INITIAL_STATE);
    if (this._asyncRequest) {
      // this._asyncRequest.cancel();
      this._asyncRequest = null;
    }
  };
  
  render() {
    return null;
  }

}

FetchUserData.propTypes = {
  // classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  // console.log('state\n', state);
  // const settings = state.firestore.ordered.users
  //               && state.firestore.ordered.users[0]
  //               && state.firestore.ordered.users[0].settings
  //               && state.firestore.ordered.users[0].settings[0];
  // const user = state.auth.user; // better source might be: const profile = state.firebase.profile;
  // const leads = state.firestore.ordered.leads;
  const profile = state.firebase.profile;
  // const dataHasLoaded = user && leads && profile && settings;
  
  // console.log('user\n', user);
  // console.log('leads\n', leads);
  // console.log('profile\n', profile);
  // console.log('settings\n', settings);
  // console.log('dataHasLoaded\n', dataHasLoaded);
  
  // return { user, profile, settings, leads, dataHasLoaded, }
  //          YES   YES      NO        NO     NO
  return { profile, } // user,
}

const mapDispatchToProps = dispatch => ({
  updateUserData         : (path, newData,)  => dispatch(updateUserData        (path, newData,)),
  saveUserDataToFirestore : (path, newData,)  => dispatch(saveUserDataToFirestore(path, newData,)), // common mistakes: 1. forget to use this.props... when calling function in class 2. copy/paste forget to change function name in mapStateToProps => dispatch
  // updateSettings  : settings  => dispatch(updateSettings (settings )),
  // updateDashboard : dashboard => dispatch(updateDashboard(dashboard)),

  // createItem: ( path , item  ,                    ) => dispatch(createItem( path , item  ,                    )), // inspired by: src/my-app/components/forms/CreateLead.js
  // updateItem: ( path , docId , newItem , oldItem, ) => dispatch(updateItem( path , docId , newItem , oldItem, )),
  // deleteItem: ( path , docId ,                    ) => dispatch(deleteItem( path , docId ,                    )),
})

export default compose(
  // withStyles(styles, { withTheme: true }),
  connect( mapStateToProps, mapDispatchToProps, ),
  // connect( mapDispatchToProps, ),
)(FetchUserData)
