// next generation version of FetchSettings.js:
// enables fetching of 'settings' and 'dashboard' via prop.path

import { Component } from 'react';
// import React, { Component } from 'react';
// import PropTypes from "prop-types";

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateSettings, updateDashboard, } from 'my-app/store/actions/my-actions';

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
    if(!uid) {
      throw 'uid not available';
      return;
    }
    const path = this && this.props && this.props.path;
    if(!path) {
      throw 'path variable not available';
      return;
    }

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
    const dataPath = this.getPath();
    // console.log('dataPath\n', dataPath);

    this.setState({
      isLoading: true,
    });
    // this._asyncRequest = loadUserData();
    this._asyncRequest = loadUserData(dataPath);
    const data = await this._asyncRequest;

    switch(this.props.path) {
      case 'settings':
        // console.log('settings\n', data);
        this.props.updateSettings(data);
        this.setState({
          settings: data,
          isLoading: false,
        });
        break;
      case 'dashboard':
        // console.log('dashboard\n', data);
        this.props.updateDashboard(data);
        this.setState({
          dashboard: data,
          isLoading: false,
        });
        break;
      default:
        throw 'Path must be one of: "settings" or "dashboard"';
    }

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
  updateSettings  : settings  => dispatch(updateSettings (settings )),
  updateDashboard : dashboard => dispatch(updateDashboard(dashboard)),
})

export default compose(
  // withStyles(styles, { withTheme: true }),
  connect( mapStateToProps, mapDispatchToProps, ),
  // connect( mapDispatchToProps, ),
)(FetchUserData)