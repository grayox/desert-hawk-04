// inspired by: https://material-ui.com/demos/menus/#selected-menus

import React, { useState, } from 'react';
import { makeStyles } from '@material-ui/styles';
import { MenuItem, Menu, Icon, IconButton, } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
}));

// const options = [
//   // 'Show some love to Material-UI',
//   // 'Show all notification content',
//   // 'Hide sensitive notification content',
//   // 'Hide all notification content',
//   'Filter by', 'All', 'Starred', 'Unstarred', 'Challenged', 'Pending', 'Resolved', 'Won', 'Lost',
// ];

const config = {
  filter: {
    icon: 'filter_list',
  },
  sort: {
    icon: 'sort',
  },
}

// function SimpleListMenu() {
const SortFilterMenu = ({ variant, filterOptions, sortOptions, }) => {
  const classes = useStyles();
  const [ anchorEl      , setAnchorEl      , ] = useState(null);
  const [ selectedIndex , setSelectedIndex , ] = useState(1);

  const optionsConfig = {
    filter: filterOptions,
    sort: sortOptions,
  }

  const options = optionsConfig[variant];

  const handleClickListItem = event => setAnchorEl(event.currentTarget);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  }

  const handleClose = () => setAnchorEl(null);

  return (
    <div className={classes.root}>
      {
      // <List component="nav">
      //   <ListItem
      //     button
      //     aria-haspopup="true"
      //     aria-controls="lock-menu"
      //     aria-label="When device is locked"
      //     onClick={handleClickListItem}
      //   >
      //     <ListItemText primary="When device is locked" secondary={options[selectedIndex]} />
      //   </ListItem>
      // </List>
      }
      <IconButton onClick={handleClickListItem}>
        <Icon>{config[variant].icon}</Icon>
      </IconButton>
      <Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option, index,) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

// export default SimpleListMenu;
export default SortFilterMenu;