// inspired by // https://material-ui.com/demos/chips/#chip | https://material-ui.com/demos/dialogs/

import React, { useState, } from 'react';
import _ from '@lodash';
import {
  Button, Slide, Chip, // Typography, // withStyles
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

const computeFontSize = ( data = '' ) => {  

  const fontSizeLookupTable = () => {
    let a = [];
    a.length = 32;
    a.fill( 'text-72'        );
    a.fill( 'text-68' ,  4 , );
    a.fill( 'text-64' ,  5 , );
    a.fill( 'text-48' ,  6 , );
    a.fill( 'text-40' ,  7 , );
    a.fill( 'text-36' ,  8 , );
    a.fill( 'text-32' ,  9 , );
    a.fill( 'text-30' , 10 , );
    a.fill( 'text-28' , 12 , );
    a.fill( 'text-24' , 14 , );
    a.fill( 'text-20' , 16 , );
    a.fill( 'text-18' , 24 , );
    // console.log('a\n', a,);
    return a;
  }

  const lookupTable = fontSizeLookupTable();
  const lookupTableLength = lookupTable.length;

  const newString = _.toString(data);
  const stringLength = newString.length;
  
  // console.log('stringLength\n', stringLength,);
  // console.log('lookupTableLength\n', lookupTableLength,);
  const out = (stringLength >= lookupTableLength) ? 'text-16' : lookupTable[stringLength];
  // console.log('out\n', out,);
  return out;
}

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
      // text-16
      // text-72
      element: (
        <div
          className="flex flex-col h-128 text-center pb-12 cursor-pointer"
          onClick={() => handleOpenDialog()}
        >
          <div className={`${computeFontSize(data)} h-72 flex items-end leading-none text-blue`}>
            <span className="flex-1">{data}</span>
          </div>
          <div className="text-xs uppercase mt-16" color="textSecondary">{label}</div>
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