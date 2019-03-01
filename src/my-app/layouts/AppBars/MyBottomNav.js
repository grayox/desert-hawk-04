// inpired by:
// https://material-ui.com/demos/bottom-navigation/#bottom-navigation
// https://stackoverflow.com/a/51255699/1640892

// import React from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

// @material-ui/core
import {
  withStyles,
  BottomNavigation, BottomNavigationAction,
  Icon, CssBaseline, FormHelperText,
  // MuiThemeProvider, AppBar, IconButton,
} from '@material-ui/core';

import {
  // withRouter,
  Link,
} from 'react-router-dom'; //
import { componentsNavConfig, } from 'my-app/config/AppConfig.js';
// import { FuseScrollbars, FuseMessage, FuseThemes, FuseDialog } from '@fuse';

const styles = theme => ({
  // ref: https://stackoverflow.com/a/54375949/1640892
  // demo: https://codesandbox.io/s/wq02759kk
  
  // root: {
  //   display: 'flex',
  // },

  wrapper: {
    // flexGrow: 1,
    width: '100vw',
    bottom: 0,
    position: 'fixed',
    background: theme.palette.secondary.main, //'pink',
    zIndex: theme.zIndex.drawer + 1,
    // color: 'white', // theme.palette.text.primary.contrastText, //'yellow',
    // '&$selected': {
    //   color: 'white', // theme.palette.text.primary.contrastText, //'blue', // targets label and icon when selected.color is not used below
    // },
  },

  actionClasses: {
    color: 'white', // theme.palette.text.primary.contrastText, //'yellow',
    // bgcolor: 'pink',
    // '&$active': {
    '&$selected': {
      color: 'white', // theme.palette.text.primary.contrastText, //'blue', // targets label and icon when selected.color is not used below
    },
  },
  // selected: {
  //   // color: 'red', // targets label only, no icon
  // },

  // footerWrapper: {
  //   position: 'relative',
  //   zIndex: 5
  // },
});

const items = componentsNavConfig.filter(r => r.bottomNav) // filters in only objects with bottomNav property
// [
//   { title: 'Dashboard' , url: '/dashboard' , icon: <Icon>star</Icon> , } ,
//   { title: 'Inbox'     , url: '/inbox'     , icon: <Icon>star</Icon> , } ,
//   { title: 'Settings'  , url: '/settings'  , icon: <Icon>star</Icon> , } ,
// ]

// class SimpleBottomNavigation extends Component {
class MyBottomNav extends Component {
  state = {
    value: null,
  };

  handleChange = ( event, value, ) => {
    this.setState({ value, });
  };

  // showLabels = () => items.length < 5;

  render() {
    const { classes, } = this.props; // settings,
    const { value, } = this.state;
    const { handleChange, } = this; // showLabels,

    return (
      <React.Fragment>
      {
      // <MuiThemeProvider
      //   theme={FuseThemes[settings.theme.footer]}
      // >
      //   <AppBar id="fuse-footer" className={classNames(classes.footerWrapper, "md:hidden")}
      //     // color="default"
      //     color="white"
      //   >
      }
        <CssBaseline />
        <BottomNavigation
          className={classes.wrapper}
          showLabels
          // showLabels={showLabels}
          value={value}
          onChange={handleChange}
          // selectedColor="yellow"
          // color="secondary"
        >
        {
          // <BottomNavigationAction component={Link} to={items[0]} label="Dashboard" icon={<RestoreIcon />}    />
          // <BottomNavigationAction component={Link} to={items[1]} label="Inbox"     icon={<FavoriteIcon />}   />
          // <BottomNavigationAction component={Link} to={items[2]} label="Settings"  icon={<LocationOnIcon />} />
          items.map((item, index) => (
            <BottomNavigationAction
              key={item.title}
              // className={classes.root}
              // classes={classes.actionClasses}
              // className="color-white"
              className={classes.actionClasses}
              component={Link}
              to={items[index].path}
              label={item.title}
              icon={<Icon>{item.icon}</Icon>}
              // icon={item.icon}
            />
          ))
        }
        </BottomNavigation>
      {
      //   </AppBar>
      // </MuiThemeProvider>
      }
      </React.Fragment>
    );
  }
}

// SimpleBottomNavigation.propTypes = {
MyBottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ fuse }) {
  return {
    settings: fuse.settings.current,
  }
}

// export default withStyles(styles, {withTheme: true})(SimpleBottomNavigation);
export default withStyles(styles, {withTheme: true})(MyBottomNav);
