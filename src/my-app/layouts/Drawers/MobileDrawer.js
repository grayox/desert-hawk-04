// Mobile (&lt;600)
// inspired by https://material-ui.com/demos/drawers/#temporary-drawer

import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ClassNames from 'classnames';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { Typography, } from '@material-ui/core';

import MobileAppBar from '../AppBars/MobileAppBar';
import BrandAppBar from '../AppBars/BrandAppBar';
import DrawerContent from './DrawerContent';
// import DrawerContent1 from './DrawerContent1'; // specs/dimensions reference for sizing, spacing, etc

import { drawerWidth } from 'my-app/config/AppConfig';

const styles = theme => ({

  root: {
    display: 'flex',
  },

  list: {
    width: drawerWidth, // 250,
  },
  fullList: {
    width: 'auto',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#303030', // 262933 per styles/index.css
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },

});

class TemporaryDrawer extends Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <React.Fragment>
        <BrandAppBar />
        <DrawerContent />
      </React.Fragment>
    );

    const sideList1 = (
      <div className={classes.list}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    const fullList = (
      <div className={classes.fullList}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className="bg-grey-lightest">

        <MobileAppBar className="w-full" onClickMenuButton={this.toggleDrawer('left', true)} />

        <Drawer
          className={classes.drawer}
          // variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          // anchor="left"
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
        >
          <BrandAppBar />
          <DrawerContent userHeader />
        </Drawer>

        {
        // <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
        //   <div
        //     tabIndex={0}
        //     role="button"
        //     onClick={this.toggleDrawer('left', false)}
        //     onKeyDown={this.toggleDrawer('left', false)}
        //   >
        //     {sideList}
        //   </div>
        // </Drawer>
        // <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
        //   <div
        //     tabIndex={0}
        //     role="button"
        //     onClick={this.toggleDrawer('top', false)}
        //     onKeyDown={this.toggleDrawer('top', false)}
        //   >
        //     {fullList}
        //   </div>
        // </Drawer>
        // <Drawer
        //   anchor="bottom"
        //   open={this.state.bottom}
        //   onClose={this.toggleDrawer('bottom', false)}
        // >
        //   <div
        //     tabIndex={0}
        //     role="button"
        //     onClick={this.toggleDrawer('bottom', false)}
        //     onKeyDown={this.toggleDrawer('bottom', false)}
        //   >
        //     {fullList}
        //   </div>
        // </Drawer>
        // <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
        //   <div
        //     tabIndex={0}
        //     role="button"
        //     onClick={this.toggleDrawer('right', false)}
        //     onKeyDown={this.toggleDrawer('right', false)}
        //   >
        //     {sideList}
        //   </div>
        // </Drawer>
        }

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography paragraph>
            Mobile (&lt;600)
          </Typography>
          <Typography paragraph>
            https://material-ui.com/demos/drawers/#temporary-drawer
          </Typography>

          <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
          <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
          <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
          <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>

        </main>

      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);