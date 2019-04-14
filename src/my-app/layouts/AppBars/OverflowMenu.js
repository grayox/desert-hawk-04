// inspired by https://material-ui.com/demos/menus/#simple-menu

import React, { Component } from 'react';
import {
  // Button,
  Menu, MenuItem, IconButton, Icon, Tooltip, Zoom,
} from '@material-ui/core';

import { Link, } from 'react-router-dom';
import { componentsNavConfig, } from 'my-app/config/AppConfig.js';

const items = componentsNavConfig.filter(r => r.overhead) // filters in only objects with overhead property

// class SimpleMenu extends Component {
class OverflowMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        {
        // <Button
        //   aria-owns={anchorEl ? 'simple-menu' : undefined}
        //   aria-haspopup="true"
        //   onClick={this.handleClick}
        // >
        //   Open Menu
        // </Button>
        }
        <Tooltip TransitionComponent={Zoom} title="Open links menu">
          <IconButton
            // className={classes.rightButton}
            color="inherit"
            aria-label="Overflow"

            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <Icon>more_vert</Icon>
          </IconButton>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {
          // <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          // <MenuItem onClick={this.handleClose}>My account</MenuItem>
          // <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          items.map(({ title, path, }, index) => (
            <MenuItem
              key={title}
              onClick={this.handleClose}
            >
              <Link to={path} className="no-underline text-black">
                {title}
              </Link>     
            </MenuItem>
          ))
          }
        </Menu>
      </div>
    );
  }
}

// export default SimpleMenu;
export default OverflowMenu;