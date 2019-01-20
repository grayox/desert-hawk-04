// cloned from // import MainToolbar from './main/MainToolbar';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import * as authActions from 'auth/store/actions';
import { bindActionCreators } from 'redux';

// @material-ui/core
// import Icon from "@material-ui/core/Icon";
import {
  AppBar, Toolbar, Typography,
  // Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  // Avatar, Button, Icon, IconButton, ListItemIcon, ListItemText, Popover, MenuItem, Typography, Hidden
} from '@material-ui/core';

const styles = theme => ({
  root     : {
      display   : 'flex',
      alignItems: 'center',
      width     : '100%'
  },
  // separator: {
  //     width          : 1,
  //     height         : 64,
  //     backgroundColor: theme.palette.divider
  // }
});

class MyMainToolbar extends Component {

  render() {
    // const { classes, } = this.props;
    // const { userMenu } = this.state;

    return (
      <AppBar
        className="m-0"
        position="static"
        elevation={0}
      >
        <Toolbar className="px-16">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            Inbox
            </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout: authActions.logoutUser,
  }, dispatch);
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(MyMainToolbar));
