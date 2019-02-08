// Mobile (&lt;600)
// inspired by https://material-ui.com/demos/drawers/#temporary-drawer

import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Routes from 'my-app/layouts/Routes.js';
// import ClassNames from 'classnames';

import { withStyles, Drawer, Zoom, Fab, Icon, } from '@material-ui/core';

import MyBottomNav from 'my-app/layouts/appBars/MyBottomNav.js';
import MobileAppBar from '../appBars/MobileAppBar';
import BrandAppBar from '../appBars/BrandAppBar';
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
    // flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing.unit * 3,
  },
  fab: {
    position: 'absolute',
    // // candidate
    // bottom : theme.spacing.unit * 8 ,
    // right  : theme.spacing.unit * 1 ,
    top   : theme.spacing.unit * 4 ,
    right : theme.spacing.unit * 9 ,
    zIndex: 1000,
  },
});

// class TemporaryDrawer extends Component {
class MobileDrawer extends Component {
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
    const { classes, theme, } = this.props;
    // const transitionDuration = {
    //   enter: theme.transitions.duration.enteringScreen,
    //   exit: theme.transitions.duration.leavingScreen,
    // };

    const sideList = (
      <React.Fragment>
        <BrandAppBar />
        <DrawerContent />
      </React.Fragment>
    );

    // const sideList1 = (
    //   <div className={classes.list}>
    //     <List>
    //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider />
    //     <List>
    //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </div>
    // );

    // const fullList = (
    //   <div className={classes.fullList}>
    //     <List>
    //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider />
    //     <List>
    //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </div>
    // );

    return (
      <React.Fragment>
      {
      // <div className="bg-grey-lightest">
      }

        <Zoom
          // key={fab.color}
          in unmountOnExit
          // timeout={transitionDuration}
          timeout={500}
          style={{
            transitionDelay: '500ms',
          }}
        >
          <Fab
            className={classes.fab}
            color='primary' //'secondary' // accent
          >
            <Icon>add</Icon>  
          </Fab>
        </Zoom>
        <MyBottomNav />
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
          onClick={this.toggleDrawer('left', false)}
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
          <Routes />
          {
          // <div className={classes.toolbar} />
          
          // <Typography paragraph>
          //   Mobile (&lt;600)
          // </Typography>
          // <Typography paragraph>
          //   https://material-ui.com/demos/drawers/#temporary-drawer
          // </Typography>
        
          // <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
          // <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
          // <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
          // <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>
          }
        </main>

      {
      // </div>
      }
      </React.Fragment> 
    );
  }
}

// TemporaryDrawer.propTypes = {
MobileDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(TemporaryDrawer);
export default withStyles(styles)(MobileDrawer);