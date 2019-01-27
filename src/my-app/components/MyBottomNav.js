// inpired by:
// https://material-ui.com/demos/bottom-navigation/#bottom-navigation
// https://stackoverflow.com/a/51255699/1640892

// import React from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import RestoreIcon from '@material-ui/icons/Restore';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';

import { Link, withRouter, } from 'react-router-dom';
import { componentsNavConfig, } from 'my-app/config/AppConfig.js';

// @material-ui/core
import {
  Icon,
  // IconButton,
} from '@material-ui/core';

const styles = {
  // ref: https://stackoverflow.com/a/54375949/1640892
  // demo: https://codesandbox.io/s/wq02759kk
  root: {
    width: '100vw',
    color: 'yellow',
    background: 'pink',
    // bgcolor: 'pink',
    // '&$active': {
    '&$selected': {
      color: 'blue', // targets label and icon when selected.color is not used below
    },
  },
  selected: {
    // color: 'red', // targets label only, no icon
  },
};

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
    const { classes, } = this.props;
    const { value, } = this.state;
    const { handleChange, showLabels, } = this;

    const actionClasses = this.props.classes;
    return (
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
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
