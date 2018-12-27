import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';

import { Button, } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
});

class SettingsDialog extends Component {
  render() {
    const {
      dialogIsOpen, dialogTitle, dialogContentText, dialogFieldName, dialogLabel, 
      onChange, onClose, onCancel, onSave,
    } = this.props;
    return (
      <Dialog
        open={dialogIsOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          {dialogContentText &&
            (
              <DialogContentText className='mb-8'>
                {dialogContentText}
              </DialogContentText>
            )
          }
          <TextField
            id={dialogFieldName}
            name={dialogFieldName}
            type="text"
            margin="dense"
            variant="outlined"
            label={dialogLabel}
            onChange={onChange}
            autoFocus
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={onSave} id="saveButton" color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

SettingsDialog.propTypes = {
  classes           : PropTypes.object.isRequired,
  dialogContentText : PropTypes.string, // 'To subscribe to this website, please enter your email address here. We will send updates occasionally.'
  dialogFieldName   : PropTypes.string, // 'name',
  dialogIsOpen      : PropTypes.bool,   // false
  dialogLabel       : PropTypes.string, // 'first and last'
  dialogTitle       : PropTypes.string, // 'Name'
  onChange          : PropTypes.func,
  onClose           : PropTypes.func,
  onCancel          : PropTypes.func,
  onSave            : PropTypes.func,
}

export default withStyles(styles, { withTheme: true })(SettingsDialog);
