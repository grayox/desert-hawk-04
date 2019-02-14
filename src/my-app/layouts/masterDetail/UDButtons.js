// inspired by https://material-ui.com/demos/buttons/#icon-buttons

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, IconButton, Icon, Button, TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class UDButtons extends Component {

  state = {
    isOpen: false,
  };

  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() { 
    const { classes, deletable, editable, } = this.props;
    const { isOpen, } = this.state;
    const { handleClickOpen, handleClose, } = this;
    
    return (
      <React.Fragment>
        {
          deletable && (
            <IconButton className={classes.button} aria-label="Delete" onClick={handleClickOpen}>
              <Icon>delete</Icon>
            </IconButton>
          )
        }    
        {
          editable && (
            <IconButton className={classes.button} aria-label="Edit">
              <Icon>edit</Icon>
            </IconButton>
          )
        }
        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Confirm Delete?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this record?
              After deleted, this record will not be recoverable.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

UDButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  deletable: PropTypes.bool,
  editable: PropTypes.bool,
};

UDButtons.defaultProps = {
  deletable: true,
  editable: true,
};
 
// export default UDButtons;
export default withStyles(styles)(UDButtons);