// inpired by:
// https://material-ui.com/demos/bottom-navigation/#bottom-navigation
// https://stackoverflow.com/a/51255699/1640892

// import React from 'react';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import {Link, withRouter} from 'react-router-dom';

const styles = {
  root: {
    width: 500,
  },
};

const items = [
  { label: 'Dashboard' , path: '/dashboard' , icon: <RestoreIcon    /> , } ,
  { label: 'Inbox'     , path: '/inbox'     , icon: <FavoriteIcon   /> , } ,
  { label: 'Settings'  , path: '/settings'  , icon: <LocationOnIcon /> , } ,
]

class SimpleBottomNavigation extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, } = this.props;
    const { value, } = this.state;
    const { handleChange, } = this;

    return (
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        className={classes.root}
      >
      {
        // <BottomNavigationAction component={Link} to={items[0]} label="Dashboard" icon={<RestoreIcon />}    />
        // <BottomNavigationAction component={Link} to={items[1]} label="Inbox"     icon={<FavoriteIcon />}   />
        // <BottomNavigationAction component={Link} to={items[2]} label="Settings"  icon={<LocationOnIcon />} />
        items.map((item, index) => (
          <BottomNavigationAction
            component={Link}
            to={items[index].path}
            label={item.label}
            icon={item.icon}
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
