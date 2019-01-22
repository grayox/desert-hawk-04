import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';
// import { Avatar, Button, Icon, IconButton, ListItemIcon, ListItemText, Popover, MenuItem, Typography, Hidden } from '@material-ui/core';
import { connect } from 'react-redux';
import * as quickPanelActions from 'main/quickPanel/store/actions';
import * as authActions from 'auth/store/actions';
import * as chatPanelActions from 'main/chatPanel/store/actions';
import { bindActionCreators } from 'redux';
import { FuseShortcuts, FuseAnimate, FuseSearch } from '@fuse';
import { Link } from 'react-router-dom';

// @material-ui/core
// import Icon from "@material-ui/core/Icon";
import {
  // AppBar, 
  Toolbar, Typography,
  // Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  // Avatar, Button, Icon, IconButton, ListItemIcon, ListItemText, Popover, MenuItem, Typography, Hidden
} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  // separator: {
  //     width          : 1,
  //     height         : 64,
  //     backgroundColor: theme.palette.divider
  // }
});

class MainToolbar extends Component {
  state = {
    userMenu: null
  };

  userMenuClick = event => {
    this.setState({ userMenu: event.currentTarget });
  };

  userMenuClose = () => {
    this.setState({ userMenu: null });
  };

  render() {
    const { classes, toggleQuickPanel, user, logout, openChatPanel } = this.props;
    const { userMenu } = this.state;

    return (
      <div className={classNames(classes.root, "flex flex-row px-16")}>

        {/* <Toolbar className="px-16"> */}
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            Inbox
          </Typography>
        {/* </Toolbar> */}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleQuickPanel: quickPanelActions.toggleQuickPanel,
    logout: authActions.logoutUser,
    openChatPanel: chatPanelActions.openChatPanel
  }, dispatch);
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(MainToolbar));
