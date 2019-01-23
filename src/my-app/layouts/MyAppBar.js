// cloned from // import MainToolbar from './main/MainToolbar';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import * as authActions from 'auth/store/actions';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

// @material-ui/core
// import Icon from "@material-ui/core/Icon";
import {
  AppBar, 
  Toolbar, Typography,
  Icon, IconButton,
  // Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  // Avatar, ListItemIcon, ListItemText, Popover, MenuItem, Hidden
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

  // root: {
  //   flexGrow: 1,
  // },
  grow: {
    flexGrow: 1,
  },
  leftButton: {
    marginLeft: -12,
    marginRight: 20,
  },

});

class MyAppBar extends Component {

  render() {
    const { classes, } = this.props;
    // const { userMenu } = this.state;

    return (

      // <React.Fragment>

        // <AppBar
        //   className="m-0"
        //   position="static"
        //   elevation={0}
        // >
        //   <Toolbar className="px-16">
        //     <Typography variant="subtitle1" color="inherit" className="flex-1">
        //       Inbox
        //     </Typography>
        //   </Toolbar>
        // </AppBar>

      <div className={classNames(classes.root, "lg:hidden")}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.leftButton} color="inherit" aria-label="Menu">
              {/* <MenuIcon /> */}
              <Icon>menu</Icon>
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              News
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
            <IconButton color="inherit" aria-label="Logout">
              {/* <Icon>exit_to_app</Icon> */}
              <Icon>more_vert</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>

      // </React.Fragment>

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

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(MyAppBar));
