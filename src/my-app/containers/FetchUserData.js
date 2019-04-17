// next generation version of FetchSettings.js:
// enables fetching of 'settings' and 'dashboard' via prop.path

import { Component } from 'react';
// import React, { Component } from 'react';
// import PropTypes from "prop-types";

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateUserData, } from 'my-app/store/actions/my-actions'; // updateSettings, updateDashboard,

// import { withStyles, } from '@material-ui/core';
import { loadUserData, } from 'my-app/containers/LoadAsync';

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
    const uid = this && this.props && this.props.user && this.props.user.uid;
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
    const { path, updateUserData, } = this.props;
    const dataPath = await this.getPath();
    // console.log('dataPath\n', dataPath);

    this.setState({ isLoading: true, });
    // this._asyncRequest = loadUserData();
    this._asyncRequest = loadUserData(dataPath);
    const newData = await this._asyncRequest;
    updateUserData(path, newData,);
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
  const user = state.auth.user; // better source might be: const profile = state.firebase.profile;
  // const leads = state.firestore.ordered.leads;
  // const profile = state.firebase.profile;
  // const dataHasLoaded = user && leads && profile && settings;
  
  console.log('user\n', user);
  // console.log('leads\n', leads);
  // console.log('profile\n', profile);
  // console.log('settings\n', settings);
  // console.log('dataHasLoaded\n', dataHasLoaded);
  
  // return { user, profile, settings, leads, dataHasLoaded, }
  //          YES   YES      NO        NO     NO
  return { user, }
}

const mapDispatchToProps = dispatch => ({
  updateUserData: (path, newData,)  => dispatch(updateUserData(path, newData,)),
  // updateSettings  : settings  => dispatch(updateSettings (settings )),
  // updateDashboard : dashboard => dispatch(updateDashboard(dashboard)),
})

export default compose(
  // withStyles(styles, { withTheme: true }),
  connect( mapStateToProps, mapDispatchToProps, ),
  // connect( mapDispatchToProps, ),
)(FetchUserData)
