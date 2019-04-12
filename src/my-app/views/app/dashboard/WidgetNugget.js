// inspired by // https://material-ui.com/demos/chips/#chip | https://material-ui.com/demos/dialogs/

import React, { useState, } from 'react';

import {
  Button, Slide, Chip, // Typography, // withStyles
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

const Transition = props => <Slide direction="up" {...props} />

// const handleClick = () => alert('You clicked the Chip.') // eslint-disable-line no-alert
// const handleClick = msg => alert(msg)

// const WidgetNugget = props => <Chip className={classes.chip} />
// const WidgetNugget = ({ label, message, }) => <Chip label={label} onClick={() => handleClick(message)} />
const WidgetNugget = ({ type, data, label, message, }) => {
  const config = {
    chip: {
      // direction: 'up',
      element: (<Chip label={label} onClick={() => handleOpenDialog()} />),
    },
    kernel: {
      // direction: 'right',
      element: (
        <div className="text-center pt-12 pb-28 cursor-pointer" onClick={() => handleOpenDialog()}>
          <div className="text-72 leading-none text-blue">{data}</div>
          <div className="text-xs uppercase" color="textSecondary">{label}</div>
        </div>
      ),
    },
  };

  const [ dialogIsOpen, setDialogIsOpen, ] = useState(false);
  const handleOpenDialog = () => setDialogIsOpen(true);
  const handleCloseDialog = () => setDialogIsOpen(false);
  // const Transition = props => (<Slide direction={config[type].direction} {...props} />);
  return (
    <div>
      {config[type].element}
      <Dialog
        keepMounted
        open={dialogIsOpen}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{label}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {
          // <Button onClick={handleCloseDialog} color="primary">Disagree</Button>
          // <Button onClick={handleCloseDialog} color="primary">Agree</Button>
          }
          <Button onClick={handleCloseDialog} color="primary">Ok, got it</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default WidgetNugget;