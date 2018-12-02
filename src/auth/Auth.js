import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from 'auth/store/actions';
import { bindActionCreators } from 'redux';
import * as Actions from 'store/actions';
import firebaseService from 'firebaseService';

class Auth extends Component {
  constructor(props) {
    super(props);
    firebaseService.init();
  }
  componentDidMount() {
    this.firebaseCheck();
  }
  firebaseCheck = () => {
    firebaseService.onAuthStateChanged(authUser => {
      if (authUser) {
        console.log('authUser\n', authUser); // my add
        // debugger;
        this.props.showMessage({ message: 'Logging in' });
        // Retrieve user data from Firebase
        firebaseService.getUserData(authUser/*.uid*/)
          .then(user => {
            // debugger;
            this.props.setUserDataFirebase(user, authUser);
            this.props.showMessage({ message: 'Logged in' });
          })
          // begin my add
          .catch(error => {
            console.error('error in firebaseCheck() in Auth.js\n', error);
          });
        // end my add
      }
    });
  };
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserDataFirebase: userActions.setUserDataFirebase,
    showMessage: Actions.showMessage,
    hideMessage: Actions.hideMessage,
  },
    dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
