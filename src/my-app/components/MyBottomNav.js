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
  Icon,
  // MuiThemeProvider, AppBar, IconButton,
} from '@material-ui/core';

import { Link, } from 'react-router-dom'; // withRouter,
import { componentsNavConfig, } from 'my-app/config/AppConfig.js';
// import { FuseScrollbars, FuseMessage, FuseThemes, FuseDialog } from '@fuse';

const styles = theme => ({
  // ref: https://stackoverflow.com/a/54375949/1640892
  // demo: https://codesandbox.io/s/wq02759kk
  root: {
    width: '100vw',
    color: theme.palette.text.secondary, //'yellow',
    background: theme.palette.secondary.main, //'pink',
    // bgcolor: 'pink',
    // '&$active': {
    '&$selected': {
      color: theme.palette.text.primary, //'blue', // targets label and icon when selected.color is not used below
    },
  },
  selected: {
    // color: 'red', // targets label only, no icon
  },

  footerWrapper: {
    position: 'relative',
    zIndex: 5
  },
});

const items = componentsNavConfig.filter(ob => ob.bottomNav) // filters in only objects with bottomNav property
// [
//   { title: 'Dashboard' , url: '/dashboard' , icon: <RestoreIcon    /> , } ,
//   { title: 'Inbox'     , url: '/inbox'     , icon: <FavoriteIcon   /> , } ,
//   { title: 'Settings'  , url: '/settings'  , icon: <LocationOnIcon /> , } ,
// ]

class SimpleBottomNavigation extends Component {
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

    const actionClasses = this.props.classes;
    return (
      // <MuiThemeProvider
      //   theme={FuseThemes[settings.theme.footer]}
      // >
      //   <AppBar id="fuse-footer" className={classNames(classes.footerWrapper, "md:hidden")}
      //     // color="default"
      //     color="white"
      //   >     
          <BottomNavigation
            className={classes.root}
            showLabels
            // showLabels={showLabels}
            value={value}
            onChange={handleChange}
            // selectedColor="yellow"
            color="secondary"
          >
          {
            // <BottomNavigationAction component={Link} to={items[0]} label="Dashboard" icon={<RestoreIcon />}    />
            // <BottomNavigationAction component={Link} to={items[1]} label="Inbox"     icon={<FavoriteIcon />}   />
            // <BottomNavigationAction component={Link} to={items[2]} label="Settings"  icon={<LocationOnIcon />} />
            items.map((item, index) => (
              <BottomNavigationAction
                key={item.title}
                // className={classes.root}
                classes={actionClasses}
                component={Link}
                to={items[index].url}
                label={item.title}
                icon={<Icon>{item.icon}</Icon>}
                // icon={item.icon}
              />
            ))
          }
          </BottomNavigation>
      //   </AppBar>
      // </MuiThemeProvider>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ fuse }) {
  return {
    settings: fuse.settings.current,
  }
}

export default withStyles(styles, {withTheme: true})(SimpleBottomNavigation);
