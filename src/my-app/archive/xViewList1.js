// https://codesandbox.io/s/382qvxn65p

import React, { Component } from 'react';

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ContactsIcon from "@material-ui/icons/Contacts";
import LabelIcon from "@material-ui/icons/Label";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import FlagIcon from "@material-ui/icons/Flag";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// import "@vaadin/vaadin-icons/vaadin-icons.js";

import {FuseAnimateGroup, FuseHighlight, FusePageSimple} from '@fuse';
import {Typography, List, ListItem} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class DashboardList1 extends Component {
  render() { 
    const { classes } = this.props;

    // return ( 'Hello world' );
    return (
      // <div>
      //   Hello world div
      // </div>
      // <div className={classes.root}>
      <div>
        <List component="nav">
          <ListSubheader disableSticky>Balances</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <AddIcon />
              {/*<iron-icon icon="vaadin:plus" />*/}
            </ListItemIcon>
            <ListItemText primary="Deposits" />
            <ListItemSecondaryAction>
              <ListItemText primary="5" />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <RemoveIcon />
            </ListItemIcon>
            <ListItemText primary="Withdrawals" />
            <ListItemSecondaryAction>
              <ListItemText primary="5" />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DragHandleIcon />
            </ListItemIcon>
            <ListItemText primary="Net" />
            <ListItemSecondaryAction>
              <ListItemText primary="5" />
            </ListItemSecondaryAction>
          </ListItem>
          <ListSubheader disableSticky>Inventories</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <CloudDownloadIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            <ListItemSecondaryAction>
              <ListItemText primary="5" />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SaveIcon />
            </ListItemIcon>
            <ListItemText primary="Archive" />
            <ListItemSecondaryAction>
              <ListItemText primary="5" />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CloudUploadIcon />
            </ListItemIcon>
            <ListItemText primary="Outbox" />
            <ListItemSecondaryAction>
              <ListItemText primary="5" />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
            <ListItemSecondaryAction>
              <ListItemText primary="5" />
            </ListItemSecondaryAction>
          </ListItem>
          <ListSubheader disableSticky>Key settings</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
            <ListItemSecondaryAction>
              <ListItemText primary="5" />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TrackChangesIcon />
            </ListItemIcon>
            <ListItemText primary="Location" />
            <ListItemSecondaryAction>
              <ListItemText primary="5" />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FlagIcon />
            </ListItemIcon>
            <ListItemText primary="State" />
            <ListItemSecondaryAction>
              <ListItemText primary="5" />
            </ListItemSecondaryAction>
          </ListItem>
          <ListSubheader disableSticky>Avaialble actions</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <NavigateNextIcon />
            </ListItemIcon>
            <ListItemText primary="Add new lead..." />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NavigateNextIcon />
            </ListItemIcon>
            <ListItemText primary="Review available leads..." />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NavigateNextIcon />
            </ListItemIcon>
            <ListItemText primary="Invite a contact..." />
          </ListItem>
        </List>
      </div>
    );
  }
}
 
export default DashboardList1;