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

// import '@vaadin/vaadin-icons/vaadin-icons.js'; // fail
import { GoSignOut, } from 'react-icons/go'; // https://react-icons.netlify.com/#/

import Headroom from 'my-app/components/AutoHideOnScroll';

const styles = theme => ({

  root: {
    display    : 'flex'   ,
    alignItems : 'center' ,
    width      : '100%'   ,
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

  handleClick = () => this.props.onClick()

  render() {
    const { classes, } = this.props;
    const { handleClick, } = this;
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

      <Headroom>
      <div className={classNames(classes.root, "lg:hidden")}>
        <AppBar
          color="secondary"
          // ref: https://github.com/mui-org/material-ui/issues/10076#issuecomment-361232810
          // position="static" // somtimes height shortens depending on page/view
          // position="sticky" // also seems to shrink with content similar to static
          // position="fixed" // depending on screen width, can overlap content; e.g., laptop 1024px
          // position="standard" // somewhat solves overlap problem but still shrinks sometimes
          // position="relative" // shrinks
          position="absolute" // overlaps, no shrink
        >
          <Toolbar>
            <IconButton
              className={classes.leftButton}
              onClick={handleClick}
              color="inherit"
              aria-label="Menu"
            >
              {
              // <MenuIcon />
              }
              <Icon>menu</Icon>
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              News
            </Typography>
            {
            // <Button color="inherit">Login</Button>
            }
            <IconButton color="inherit" aria-label="Overflow">
              {
              // <Icon>exit_to_app</Icon>
              // <iron-icon icon="vaadin:sign-out" />
              // <GoSignOut />
              }
              <Icon>more_vert</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      </Headroom>

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
