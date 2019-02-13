import React, { Component, } from 'react';
import classNames from 'classnames';
import {
  withStyles, Button, Icon, TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  // rightIcon: {
  //   marginLeft: theme.spacing.unit,
  // },
  // iconSmall: {
  //   fontSize: 20,
  // },
});

class FormDialog extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, } = this.props;
    const { open, } = this.state;
    const { handleClickOpen, handleClose, } = this;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          className={classNames(classes.button, "w-full",)}
        >
          <Icon className={classes.leftIcon}>create</Icon>
          New
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
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
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FormDialog)