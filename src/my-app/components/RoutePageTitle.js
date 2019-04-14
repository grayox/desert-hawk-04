import React, { useState, } from 'react';
import { Route, Redirect, } from "react-router-dom";
import { componentsNavConfig, } from 'my-app/config/AppConfig.js';

import {
  Button, Slide, Tooltip, Zoom, // Chip, Typography, // withStyles
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

// const pageTitle = ({ location, }) => { // model // 
//   // console.log('model\n', model); // {"history":{"length":50,"action":"POP","location":{"pathname":"/archive","search":"","hash":"","key":"1pelhl"}},"location":{"pathname":"/archive","search":"","hash":"","key":"1pelhl"},"match":{"path":"/","url":"/","isExact":false,"params":{}}}
//   const { pathname } = location;
//   const items = componentsNavConfig.filter(r => (r.path === pathname));
//   // console.log('items\n', items);
//   const out = items && items[0] && items[0].title;
//   return out || <Redirect to='/error404' />;
// }

const RoutePageTitle = () => <Route path="/" component={pageTitle} />

const getItem = pathname => {
  const items = componentsNavConfig.filter(r => (r.path === pathname));
  // console.log('items\n', items);
  return ((items && items[0]) || undefined );
}

const Transition = props => <Slide direction="up" {...props} />

const pageTitle = ({ location, }) => {
  const { pathname, } = location;
  const item = getItem(pathname);

  const [ dialogIsOpen, setDialogIsOpen, ] = useState(false);
  const handleOpenDialog = () => setDialogIsOpen(true);
  const handleCloseDialog = () => setDialogIsOpen(false);

  return (
    <div>
      <Tooltip TransitionComponent={Zoom} title={item.desc}>
        <span className="cursor-pointer" onClick={handleOpenDialog}>{item.title}</span>
      </Tooltip>
      <Dialog
        keepMounted
        open={dialogIsOpen}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {item.title || <Redirect to='/error404' />}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{item.desc}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Ok, got it</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
 
export default RoutePageTitle;