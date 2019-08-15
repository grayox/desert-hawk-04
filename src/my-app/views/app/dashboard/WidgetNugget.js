// inspired by // https://material-ui.com/demos/chips/#chip | https://material-ui.com/demos/dialogs/

import React, { useState, useEffect, } from 'react';

import {
  Button, Slide, Chip, // Typography, // withStyles
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

import WidgetData from './WidgetData';

import _ from '@lodash';
import numeral from 'numeral';

const computeFontSize = ( data = '' ) => {

  if(typeof data === 'string') return 'text-18';

  // minimum white space
  const fontSizeLookupTable = () => {
    // some values of 'text-x' work, some don't
    // work: text-72 70 68 64 56 48 40 36 32 28 24 20 18 16
    // don't work: text-30
    let a = [];
    a.length = 32;
    a.fill( 'text-72'        ); // alt
    a.fill( 'text-68' ,  4 , ); // 70
    a.fill( 'text-64' ,  5 , ); // 68
    a.fill( 'text-48' ,  6 , ); // 64 // too big for 'Canada'
    a.fill( 'text-40' ,  7 , ); // 56
    a.fill( 'text-36' ,  8 , ); // 48
    a.fill( 'text-32' ,  9 , ); // 36
  //a.fill( 'text-32' , 10 , ); // used to be 'text-30', but 'text-30' didn't render as expected (it was too small -- same as undefined)
    a.fill( 'text-28' , 12 , );
    a.fill( 'text-24' , 14 , );
    a.fill( 'text-20' , 16 , );
    a.fill( 'text-18' , 24 , );
    // console.log('a\n', a,);
    return a;
  }

  // // minimum font-size differential in text fields
  // const fontSizeLookupTable = () => {
  //   let a = [];
  //   a.length = 32;
  //   a.fill( 'text-72'        );
  //   a.fill( 'text-68' ,  4 , );
  //   a.fill( 'text-64' ,  5 , );
  //   a.fill( 'text-48' ,  6 , );
  //   a.fill( 'text-40' ,  7 , );
  //   a.fill( 'text-18' ,  8 , );
  //   // a.fill( 'text-18' ,  9 , );
  //   // a.fill( 'text-18' , 12 , );
  //   // a.fill( 'text-18' , 14 , );
  //   // a.fill( 'text-18' , 16 , );
  //   // a.fill( 'text-18' , 24 , );
  //   // console.log('a\n', a,);
  //   return a;
  // }

  const lookupTable = fontSizeLookupTable();
  const lookupTableLength = lookupTable.length;

  const newString = _.toString(data);
  const stringLength = newString.length;

  // account for commas
  const numberOfCommas = newString.split(',').length - 1; // count number of commas
  const adjLength = stringLength - numberOfCommas;
  
  // console.log('data\n', data,);
  // console.log('newString\n', newString,);
  // console.log('adjLength\n', adjLength,);
  // console.log('lookupTableLength\n', lookupTableLength,);
  const out = (adjLength < lookupTableLength) ? lookupTable[adjLength] : 'text-16' ;
  // console.log('out\n', out,);
  return out;
}

const Transition = props => <Slide direction="up" {...props} />

// const handleClick = () => alert('You clicked the Chip.') // eslint-disable-line no-alert
// const handleClick = msg => alert(msg)

// const WidgetNugget = props => <Chip className={classes.chip} />
// const WidgetNugget = ({ label, message, }) => <Chip label={label} onClick={() => handleClick(message)} />
const WidgetNugget = ({ type, data, label, message, dataSource, }) => {
  // if(dataSource) console.log('dataSource\n', dataSource,);

  const [ dialogIsOpen    , setDialogIsOpen    , ] = useState(false);
  // const [ formattedResult , setFormattedResult , ] = useState('');
  const [ fontSize        , setFontSize        , ] = useState('text-72');

  // useEffect(() => {
  //   const newFontSize = computeFontSize(formattedResult);
  //   console.log('formattedResult\n', formattedResult,);
  //   console.log('fontSize\n', fontSize,);
  //   console.log('newFontSize\n', newFontSize,);
  //   debugger;
  //   if(newFontSize !== fontSize) setFontSize(newFontSize);
  // }, [ formattedResult, ]);

  const getFormat = unformatted => {
    let out;
    const typeOfData = typeof unformatted;
    // console.log( 'typeOfData\n', typeOfData, );
    switch (typeOfData) {
      case 'number':
        out = numeral(unformatted).format('0,0')
        break;
      case 'string':
        out = unformatted.toUpperCase();
        break;
      case 'object':
        out = unformatted;
        break;
      default:
        out = unformatted;
    }
    return out;
  }

  const getChip = () => <Chip label={label} onClick={() => handleOpenDialog()} /> // direction: 'up',

  const getKernelData = () => <WidgetData dataSource={dataSource} />

  const getKernel = () => {
    const result = ( !!data || data===0 ) ? data : getKernelData();
    // console.log('result\n', result,);
    const formattedResult = getFormat(result);
    // console.log('formattedResult\n', formattedResult,);
    // setFormattedResult(formattedResult);
    // const computedFontSize = computeFontSize(result); // formattedResult converts all to text
    // console.log('computedFontSize\n', computedFontSize,);
    return (
      <div
        className="flex flex-col h-116 text-center cursor-pointer" // direction: 'right', text-16 text-72
        onClick={() => handleOpenDialog()}
      >
        <div className={`${fontSize} h-72 flex items-end leading-none text-blue`}>
          <span className="flex-1">{formattedResult}</span>
        </div>
        <div className="text-xs uppercase mt-8" color="textSecondary">{label}</div>
      </div>
    )
  }

  const config = {
    chip: getChip(),
    kernel: getKernel(),
  };

  const getConfig = type => config[type];

  const getDialog = () =>
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
  
  const handleOpenDialog = () => setDialogIsOpen(true);
  const handleCloseDialog = () => setDialogIsOpen(false);
  // const Transition = props => (<Slide direction={config[type].direction} {...props} />);

  const getWidgetNugget = () => <div> {getConfig(type)} {getDialog()} </div>

  return getWidgetNugget();
}

export default WidgetNugget;