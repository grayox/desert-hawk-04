import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  List, Divider, Icon,
  ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    // display: 'flex',
  },
});

class DrawerContent extends Component {
  state = {
    open: false,
  };

  render() {
    const { classes, } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Icon>mail_fill</Icon> : <Icon>mail</Icon> }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon> }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

DrawerContent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DrawerContent);