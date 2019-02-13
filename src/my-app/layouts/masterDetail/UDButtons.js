// inspired by https://material-ui.com/demos/buttons/#icon-buttons

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton, Icon, } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class UDButtons extends Component {
  state = {  }
  render() { 
    const { classes, deleteButton, editButton, } = this.props;
    return (
      <React.Fragment>
        {
          deleteButton && (
            <IconButton className={classes.button} aria-label="Delete">
              <Icon>delete</Icon>
            </IconButton>
          )
        }    
        {
          editButton && (
            <IconButton className={classes.button} aria-label="Edit">
              <Icon>edit</Icon>
            </IconButton>
          )
        }
      </React.Fragment>
    );
  }
}

UDButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteButton: PropTypes.bool,
  editButton: PropTypes.bool,
};

UDButtons.defaultProps = {
  deleteButton: true,
  editButton: true,
};
 
// export default UDButtons;
export default withStyles(styles)(UDButtons);