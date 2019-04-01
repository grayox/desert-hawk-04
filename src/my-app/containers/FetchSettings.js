import React, { Component } from 'react';
import PropTypes from "prop-types";

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateSettings } from 'my-app/store/actions/my-actions';

import { withStyles, } from '@material-ui/core';

const db = firebase.firestore();

class FetchSettings extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.getSettings();
  }

  getPath() {
    if(!this.props.user) return;
    const uid = this && this.props && this.props.user &&
                this.props.user.data && this.props.user.data.uid;
    return uid ? [ 'users' , uid , 'settings' , ].join('/') : null;
  }

  getSettings() {
    // console.log('props\n', this.props);
    // debugger;
    const path = this.getPath();
    try {
      db.collection(path)
      // .collection('users/userme/settings')
      // .orderBy('added_at', 'desc')
      // .orderBy('createdAt', 'desc')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()
      .then(querySnapshot => {
        let out;
        querySnapshot.forEach(doc =>
          // doc.data() is always defined for query doc snapshots
          // console.log(doc.id, '\n', doc.data());
          // console.log('createdAt: ', doc.createdAt()); // throws error
          // console.log('createdAt: ', doc.get('createdAt')); // undefined
          // console.log('id: ', doc.id); // works
          // console.log('data\n', doc.data()); // works
          out = doc.data()
        );
        console.log('out\n', out);
        return out;
      })
        // }
      .then(result => {
        // this.setState(out);
        // always set state inside promise!
        // otherwise, function returns before data loads!
        const newState = {
          ...result,
          isLoading: false,
        };
        this.setState(newState);
      })
      .catch(error => {
        console.error('Error getting documents: \n', error);
        throw new Error(error);
      });
      // console.log('out\n', out); // returns before promise settles
      // return out;                // returns before promise settles
    } catch(error) {
      console.error(error.message);
      this.setState({
        isError: true,
        isLoading: false,
      });
    }
  }
  
  render() {
    
    return ();
  }

}

FetchSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  // console.log('state\n', state);
  const settings = state.firestore.ordered.users
                && state.firestore.ordered.users[0]
                && state.firestore.ordered.users[0].settings
                && state.firestore.ordered.users[0].settings[0];
  const user = state.auth.user;
  const leads = state.firestore.ordered.leads;
  const profile = state.firebase.profile;
  const dataHasLoaded = user && leads && profile && settings;
  
  console.log('user\n', user);
  console.log('leads\n', leads);
  console.log('profile\n', profile);
  console.log('settings\n', settings);
  console.log('dataHasLoaded\n', dataHasLoaded);
  
  return { user, leads, profile, settings, dataHasLoaded, }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSettings: settings => dispatch(updateSettings(settings)),
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps),
)(FetchSettings)
