// inspired by https://material-ui.com/demos/buttons/#icon-buttons

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, IconButton, Icon, Button, Slide, Zoom, // TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const INITIAL_STATE = {
  isOpen: false,
  isBeingEdited: false,
  isBeingDeleted: false,
};

// https://material-ui.com/demos/dialogs/#alerts
const Transition = props => (<Zoom in {...props} />); // (<Slide direction="up" {...props} />);

class UDButtons extends Component {

  state = {...INITIAL_STATE};

  handleClickOpen = task => {
    this.setState({
      isOpen: true,
      [task]: true,
    });
  };

  handleClose = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() { 
    const { classes, deletable, editable, } = this.props;
    const { isOpen, isBeingEdited, isBeingDeleted, } = this.state;
    const { handleClickOpen, handleClose, } = this;
    
    return (
      <React.Fragment>
        {
          deletable && (
            <IconButton 
              className={classes.button} 
              aria-label="Delete" 
              onClick={() => handleClickOpen('isBeingDeleted')}
            >
              <Icon>delete</Icon>
            </IconButton>
          )
        }    
        {
          editable && (
            <IconButton 
              className={classes.button} 
              aria-label="Edit" 
              onClick={() => handleClickOpen('isBeingEdited')}
            >
              <Icon>edit</Icon>
            </IconButton>
          )
        }
        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          TransitionComponent={Transition} // https://material-ui.com/demos/dialogs/#alerts
          keepMounted
          // aria-labelledby="alert-dialog-slide-title"
          // aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="form-dialog-title">Permanently delete item?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              It&rsquo;s permanent and cannot be undone.
              {
              // Are you sure you want to delete this record?
              // After deleted, this record will not be recoverable.
              }
            </DialogContentText>
            {
            // <TextField autoFocus margin="dense" id="dialog" label="dialog" type="email" fullWidth />
            }
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
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

UDButtons.defaultProps = {
  deletable: true,
  editable: true,
};
 
// export default UDButtons;
export default withStyles(styles)(UDButtons);