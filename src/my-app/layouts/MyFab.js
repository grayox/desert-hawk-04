import React from 'react';
import { withStyles, Zoom, Fab, Icon, } from '@material-ui/core';

const styles = theme => ({
  fab: {
    position: 'absolute',
    // zIndex: theme.zIndex.appBar + 1,
    zIndex: 1202, // undefined: // zIndex: theme.zIndex.bottomNavigation + 1,
    // // candidate 0 - spec
    // bottom : theme.spacing.unit * 2 ,
    // right  : theme.spacing.unit * 2 ,
    // // candidate 1
    // bottom : theme.spacing.unit * 8 ,
    // right  : theme.spacing.unit * 1 ,
    // // candidate 2
    // top    : theme.spacing.unit * 3 ,
    // right  : theme.spacing.unit * 9 ,
    // // candidate 3
    // bottom : theme.spacing.unit *  3 ,
    // right  : theme.spacing.unit * 12 ,
    // candidate 4
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 0.5,
  },
})

const MyFab = props => {

  const { classes, } = props; // theme
  // const transitionDuration = {
    // enter: theme.transitions.duration.enteringScreen,
    // exit: theme.transitions.duration.leavingScreen,
  // };

  return (
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
  );
}
 
export default withStyles(styles)(MyFab);