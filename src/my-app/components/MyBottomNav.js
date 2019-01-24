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
  root: {
    width: '100vw',
    color: 'white',
  },
};

const items = componentsNavConfig
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
    this.setState({ value });
  };

  render() {
    const { classes, } = this.props;
    const { value, } = this.state;
    const { handleChange, } = this;

    return (
      <BottomNavigation
        className={classes.root}
        showLabels
        value={value}
        onChange={handleChange}
      >
      {
        // <BottomNavigationAction component={Link} to={items[0]} label="Dashboard" icon={<RestoreIcon />}    />
        // <BottomNavigationAction component={Link} to={items[1]} label="Inbox"     icon={<FavoriteIcon />}   />
        // <BottomNavigationAction component={Link} to={items[2]} label="Settings"  icon={<LocationOnIcon />} />
        items.map((item, index) => (
          item.bottomNav
          ?
          <BottomNavigationAction
            key={item.title}
            component={Link}
            to={items[index].url}
            label={item.title}
            // icon={item.icon}
            icon={<Icon>{item.icon}</Icon>}
          />
          :
          null
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
