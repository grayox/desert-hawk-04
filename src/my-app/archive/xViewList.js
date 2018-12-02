// 6v974l45jk | https://codesandbox.io/s/3v3r6q0zp1 | https://stackoverflow.com/a/51872883/1640892
// https://codesandbox.io/s/382qvxn65p

import React, { Component } from 'react';

// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ContactsIcon from '@material-ui/icons/Contacts';
import LabelIcon from '@material-ui/icons/Label';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import FlagIcon from '@material-ui/icons/Flag';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// import '@vaadin/vaadin-icons/vaadin-icons.js';

import {FuseAnimateGroup, FuseHighlight, FusePageSimple} from '@fuse';
// import {Typography, List, ListItem} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const list = [
  { type : 'subheader' , label : 'Balances'                  ,                                    } ,
  { type : 'button'    , label : 'Deposits'                  , icon : AddIcon           , data: 5 } ,
  { type : 'button'    , label : 'Withdrawals'               , icon : RemoveIcon        , data: 5 } ,
  { type : 'button'    , label : 'Net'                       , icon : DragHandleIcon    , data: 5 } ,
  { type : 'subheader' , label : 'Inventories'               ,                                    } ,
  { type : 'button'    , label : 'Inbox'                     , icon : CloudDownloadIcon , data: 5 } ,
  { type : 'button'    , label : 'Archive'                   , icon : SaveIcon          , data: 5 } ,
  { type : 'button'    , label : 'Outbox'                    , icon : CloudUploadIcon   , data: 5 } ,
  { type : 'button'    , label : 'Contacts'                  , icon : ContactsIcon      , data: 5 } ,
  { type : 'subheader' , label : 'Key settings'              ,                                    } ,
  { type : 'button'    , label : 'Category'                  , icon : LabelIcon         , data: 5 } ,
  { type : 'button'    , label : 'Location'                  , icon : TrackChangesIcon  , data: 5 } ,
  { type : 'button'    , label : 'State'                     , icon : FlagIcon          , data: 5 } ,
  { type : 'subheader' , label : 'Avaialble actions'         ,                                    } ,
  { type : 'button'    , label : 'Add new lead...'           , icon : NavigateNextIcon  , data: 5 } ,
  { type : 'button'    , label : 'Review available leads...' , icon : NavigateNextIcon  , data: 5 } ,
  { type : 'button'    , label : 'Invite a contact...'       , icon : NavigateNextIcon  , data: 5 } ,
];

const constructSubheader = (label) => (<ListSubheader disableSticky>{label}</ListSubheader>);

const constructListItem = (label, icon, data) => (
  <ListItem button key={label}>
    <ListItemIcon>
      {React.createElement(icon)}
      {/* {icon} */}
    </ListItemIcon>
    <ListItemText primary={label} />
    <ListItemSecondaryAction>
      <ListItemText primary={data} />
    </ListItemSecondaryAction>
  </ListItem>
);

class DashboardList extends Component {

  state = {
    list: list
  }

  render() { 
    const { classes } = this.props;
    return (
      <List component='nav'>
        <FuseAnimateGroup
          enter={{animation: 'transition.slideUpBigIn'}}
          leave={{animation: 'transition.slideUpBigOut'}}
        >
          {this.state.list.map((item) => (
            item.type==='button' ? constructListItem(item.label, item.icon, item.data) : constructSubheader(item.label)
            // switch(item.type) {
            //   case 'button':
            //     constructListItem(item.label, item.icon, item.data);
            //     break;
            //   case 'subheader':
            //     constructSubheader(item.label);
            //     break;
            //   default:
            //     console.log('Theme does not recognize item type') 
            // }
          ))}
        </FuseAnimateGroup>
      </List>
    );
  }
}
 
export default DashboardList;