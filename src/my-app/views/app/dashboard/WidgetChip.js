// inspired by // https://material-ui.com/demos/chips/#chip | https://material-ui.com/demos/dialogs/

import React, { useState, } from 'react';

import {
  Button, Slide, Chip, Typography, // withStyles
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

import { DashboardGridConfig, } from 'my-app/views/app/dashboard/DashboardGridConfig.js';

const Transition = props => <Slide direction="up" {...props} />

// const handleClick = () => alert('You clicked the Chip.') // eslint-disable-line no-alert
// const handleClick = msg => alert(msg)

// const WidgetChip = props => <Chip className={classes.chip} />
// const WidgetChip = ({ label, message, }) => <Chip label={label} onClick={() => handleClick(message)} />
const WidgetChip = ({ type, data, label, message, }) => {
  const config = {
    chip: {
      // direction: 'up',
      element: (<Chip label={label} onClick={() => handleOpenDialog(message)} />),
    },
    data: {
      // direction: 'right',
      element: (
        <div className="text-center pt-12 pb-28 cursor-pointer" onClick={() => handleOpenDialog(message)}>
          <Typography className="text-72 leading-none text-blue">{data}</Typography>
          <Typography className="text-xs uppercase" color="textSecondary">{label}</Typography>
        </div>
      ),
    },
  };

  const [ dialogIsOpen, setDialogOpen, ] = useState(false);
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  // const Transition = props => (<Slide direction={config[type].direction} {...props} />);
  return (
    <div>
      {
      // <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
      //   Slide in alert dialog
      // </Button>
      // (type === 'chip')
      // ?
      // <Chip label={label} onClick={() => handleOpenDialog(message)} />
      // :
      // <div className="text-center pt-12 pb-28 cursor-pointer" onClick={() => handleOpenDialog(message)}>
      //   <Typography className="text-72 leading-none text-blue">{data}</Typography>
      //   <Typography className="text-xs uppercase" color="textSecondary">{label}</Typography>
      // </div>
      config[type].element
      }
      <Dialog
        open={dialogIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
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

export default WidgetChip;