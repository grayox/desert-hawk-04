import React, { Component } from 'react';
import { matchRoutes } from 'react-router-config';
import { bindActionCreators } from 'redux';
// import {withRouter} from 'react-router-dom';
// begin my add
import { withRouter, Route, } from 'react-router-dom';
// import { withRouter, Route, Redirect, } from 'react-router-dom';
// import { withRouter, Route, Redirect, Switch, } from "react-router-dom";
// import Error404Page from 'main/content/pages/errors/404/Error404Page'
// end my add
import { connect } from 'react-redux';
import _ from '@lodash';

import Login from 'main/content/login/Login'; // my add
// import { FuseLayout, FuseTheme } from '@fuse'; // my add

// fetch settings, etc.
// import { FetchFirestore } from 'my-app/config/AppConfig'; // fails
// import FetchFirestore from 'my-app/config/AppConfig'; // success

let redirect = false;

class FuseAuthorization extends Component {

  constructor(props) {
    super(props);
    this.checkAuth();
  }

  componentDidUpdate(prevProps) {
    /**
     * If route is changed
     * Update auths
     */
    if (!_.isEqual(this.props.location.pathname, prevProps.location.pathname)) {
      this.checkAuth();
    }
  }

  checkAuth() {
    const matched = matchRoutes(this.props.routes, this.props.location.pathname)[0];
    if (matched && matched.route && matched.route.auth && matched.route.auth.length > 0) {
      if (!matched.route.auth.includes(this.props.user.role)) {
        redirect = true;
        if (this.props.user.role === 'guest') {
        // if (!this.props.loggedIn) { // my add
          this.props.history.push({
            pathname: '/login',
            state: { redirectUrl: this.props.location.pathname }
          });
        }
        else {
          this.props.history.push({
            pathname: '/'
          });
        }
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (redirect) {
      redirect = false;
      return false;
    }
    else {
      return true;
    }
  }

  render() {
    // begin my add
    // const timestamp = Date.now();
    
    // uid forwards to dashboard,
    // loggedIn makes you login before forwarding after every reload
    const { children, uid, loggedIn, } = this.props; // loggedIn, uid: my add
    // const { children, uid, loggedIn, } = this.props; // loggedIn, uid: my add
    // console.log('children\n', children);
    // console.log('uid\n', uid);
    // console.log('loggedIn\n', loggedIn);
    // debugger;

    // if (loggedIn) return <Redirect to='/' />

    // end my add

    return (

      // original
      // <React.Fragment>
      //   {children}
      // </React.Fragment>

      // begin my add

      // // https://reacttraining.com/react-router/web/api/Redirect/to-string
      // <Route exact path="/" render={() => (
      //   loggedIn ? (
      //     <Redirect to="/dashboard" />
      //   ) : (
      //       <PublicHomePage />
      //     )
      // )}/>

      // works partially
      // <React.Fragment>
      // {
      //   loggedIn ? 
      //     <React.Fragment>
      //       {children}
      //     </React.Fragment>
      //     :
      //     <Login />
      // } 
      // </React.Fragment>

      // router-react-dom router react dom
      // ref: https://reacttraining.com/react-router/web/guides/basic-components/route-matching
      // <Switch>
      //   <Route exact path="/" children={children} />
      //   <Route path="/login" component={Login} />
      //   <Route component={Error404Page} />
      // </Switch>

      // refs:
      // code: https://github.com/techsithgit/react-router/blob/master/src/App.js
      // video: https://www.youtube.com/watch?v=XRfD8xIOroA
      // <Route path="/" exact render={()=>(
      //   loggedIn ? (<Redirect to='/dashboard' />) : (<Login />)
      // )}/>

      // works!
      // ref: https://reacttraining.com/react-router/web/api/Route/children-func
      
      <Route children={() => (
        // loggedIn ? children : <Login />
        uid
        ?
        children
        // <FetchFirestore key={timestamp}>{children}</FetchFirestore>
        :
        <Login />
      )} />
      
      // end my add
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ fuse, auth, }) {
// begin my add
// function mapStateToProps({ fuse, auth, firestore, }) {
  // console.log('fuse\n', fuse);
  // console.log('auth\n', auth);
  // console.log('firestore\n', firestore); // we have firestore data here from the store
  // debugger;
  // const { user: { data: { uid } }, login: { success: loggedIn }, } = auth;
  const { user: { uid }, } = auth;
  // console.log('uid\n', uid);
  // console.log('loggedIn\n', loggedIn);
  return {
    uid, // loggedIn,
  }
// end my add
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseAuthorization));
