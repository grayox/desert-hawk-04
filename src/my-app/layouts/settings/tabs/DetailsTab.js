import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';

import axios from 'axios/index';
import { Avatar, AppBar, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';

import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import ExtensionIcon from '@material-ui/icons/Extension';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// import SettingsStepper from 'my-app/components/steppers/SettingsStepper';
import GeoStepper from 'my-app/components/steppers/GeoStepper'; // see 'class UserMultiForm' for more examples

// utilities
import _ from 'lodash';
import * as EmailValidator from 'email-validator';
import NumberFormat from 'react-number-format';

// firebase
import firebase from '@firebase/app';
import '@firebase/firestore';
const db = firebase.firestore();

// this page was copied from ./AboutTab

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
});

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  bizCategory: '',
  geoNation: '',
  geoRegion: '',
  geoLocal: '',
  geoKey: Date.now(), // necessary to re-render GeoSelect component after reset

  isValidName: false,
  isValidEmail: false,
  isValidPhone: false,
  isValidBizCategory: false,
  isValidGeo: false,
  isValidForm: false,

  isErrorName: false,
  isErrorEmail: false,
  helperTextName: '',
  helperTextEmail: '',

  anchorElMenu1: null,
  anchorElMenu2: null,
  selectedIndexMenu1: 1,
  selectedIndexMenu2: 1,

  name: 'Maria Le',
  email: 'maria.le.4@gmail.com',
  mobile: '555-123-4567',

  nameDialogOpen: false,
  // emailDialogOpen: false,
  // mobileDialogOpen: false,
  geoSelectDialogOpen: false,
};


// const optionsMenu1 = [
//   'Show some love to Material-UI',
//   'Show all notification content',
//   'Hide sensitive notification content',
//   'Hide all notification content',
// ];

const optionsMenu2 = [
  'Select one',
  'Home',
  'Mortgage',
  'Insurance',
  'Financial',
];

class DetailsTab extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  saveToFirebase = data => {
    const collectionRef = db.collection(this.props.savePath);
    console.info('submitting...', data);
    collectionRef.add(data)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
    console.info('submitted: ', data);
  }

  resetForm = () => {
    this.setState(INITIAL_STATE);
    this.setState({
      geoKey: Date.now(), // resets geoStepper
    });
  }

  // handleValidFormSubmit = model => {
  //   const picked = _.pick(model, [ 'name', 'email', 'phone', 'bizCategory', 'geoNation', 'geoRegion', 'geoLocal', ]);
  //   const newData = {
  //     ...picked,
  //     timestamp: Date.now(),
  //   };
  //   this.saveToFirebase(newData);
  //   this.resetForm();
  // };

  handleValidGeoStepper = model => {
    // handleSaveGeoStepper = model => {
    const picked = _.pick(model, ['geoNation', 'geoRegion', 'geoLocal',]);
    const newState = {
      ...picked,
      isValidGeo: true,
    };
    this.setState(newState, () => {
      console.log('newState', newState);
      console.log('state', this.state);
      // this.handleChangeForm();
      // this.saveToFirebase(picked);
    });
  };

  // state = {
  //   general: null,
  //   work: null,
  //   contact: null,
  //   groups: null,
  //   friends: null
  // };

  // componentDidMount() {
  //   axios.get('/api/profile/about').then(res => {
  //     this.setState(res.data);
  //   });
  // }

  handleClickListItemMenu1 = event => {
    this.setState({ anchorElMenu1: event.currentTarget });
  };

  handleMenuItemClickMenu1 = (event, index) => {
    this.setState({ selectedIndexMenu1: index, anchorElMenu1: null });
  };

  handleCloseMenu1 = () => {
    this.setState({ anchorElMenu1: null });
  };

  handleClickListItemMenu2 = event => {
    this.setState({ anchorElMenu2: event.currentTarget });
  };

  handleMenuItemClickMenu2 = (event, index) => {
    this.setState({ selectedIndexMenu2: index, anchorElMenu2: null });
  };

  handleCloseMenu2 = () => {
    this.setState({ anchorElMenu2: null });
  };

  handleClickListItemContact = event => {
    this.setState({ nameDialogOpen: true, });
  }

  handleClickListItemGeoSelect = event => {
    this.setState({ geoSelectDialogOpen: true, });
  }

  handleCloseDialog = event => {
    // console.log('event\n', event.target);
    this.setState({ nameDialogOpen: false, });
  }

  handleCloseGeoDialog = event => {
    // console.log('event\n', event.target);
    this.setState({ geoSelectDialogOpen: false, });
  }

  render() {
    const { classes, } = this.props;
    // const { general, work, contact, } = this.state;
    const {
      anchorElMenu1, anchorElMenu2,
      nameDialogOpen, geoSelectDialogOpen,
      selectedIndexMenu2,
      name, email, mobile,
      geoKey, isValidGeo, geoNation, geoRegion, geoLocal,
    } = this.state;
    const {
      handleValidGeoStepper, handleCloseDialog,
      handleClose, handleClickListItemContact,
      handleCloseGeoDialog, handleGeoClose,
      handleClickListItemMenu2, handleClickListItemGeoSelect,
      handleCloseMenu2, handleMenuItemClickMenu2,
    } = this;

    return (
      <React.Fragment>
        {/* <div className={classNames(classes.root, "md:flex max-w-2xl")}>

          <div className="flex flex-col flex-1 md:pr-32">
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideUpBigIn"
              }}
            >
              
              <Card className="w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                      Contact
                      </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent>
                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Name</Typography>
                    <Typography>Maria Le</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Email</Typography>
                    <Typography>maria.le.4@gmail.com</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Cell</Typography>
                    <Typography>add &plus;</Typography>
                  </div>
                </CardContent>
              </Card>
            </FuseAnimateGroup>
          </div>
          
          <div className="flex flex-col flex-1 md:pr-32">
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideLeftBigIn"
              }}
            >
              <Card className="w-full">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                      Contact
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent className="px-0">
                  <List component="nav">
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="lock-menu"
                      aria-label="When device is locked"
                      onClick={this.handleClickListItem}
                    >
                      <ListItemText
                        primary="When device is locked"
                        secondary={options[this.state.selectedIndex]}
                      />
                    </ListItem>
                  </List>
                  <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === this.state.selectedIndex}
                        onClick={event => this.handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </CardContent>
              </Card>
            </FuseAnimateGroup>
          </div>
          
        </div> */}

        <Menu
          id="menu2"
          anchorEl={anchorElMenu2}
          open={Boolean(anchorElMenu2)}
          onClose={handleCloseMenu2}
        >
          {optionsMenu2.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === selectedIndexMenu2}
              onClick={event => handleMenuItemClickMenu2(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        <Dialog
          open={nameDialogOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Name</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send
                updates occasionally.
              </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleCloseDialog} color="secondary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={geoSelectDialogOpen}
          onClose={handleGeoClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Business Location</DialogTitle>
          <DialogContent>
            <GeoStepper
              key={geoKey} // reset with unique new key
              // heading={geoStepperLabel}
              heading={'Tell us your home market so we can send you leads'}
              showSaveButton={false}
              // onSave={handleSaveGeoStepper}
              onValid={handleValidGeoStepper}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseGeoDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleCloseGeoDialog} color="secondary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* "Block-level" group of two cards on this row */}
        <div className={classNames(classes.root, "md:flex max-w-2xl")}>
          {/* 
          <div className="flex flex-col flex-1 md:pr-32">
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideLeftBigIn"
              }}
            >
              <Card className="w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                      Contact
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent className="px-0 mb-24">
                  <List component="nav" className="px-0 mb-4">
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="menu1"
                      aria-label="When device is locked"
                      onClick={this.handleClickListItemMenu1}
                    >
                      <ListItemText
                        primary="When device is locked"
                        secondary={optionsMenu1[this.state.selectedIndexMenu1]}
                      />
                    </ListItem>
                  </List>
                  <Menu
                    id="menu1"
                    anchorEl={anchorElMenu1}
                    open={Boolean(anchorElMenu1)}
                    onClose={this.handleClose}
                  >
                    {optionsMenu1.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === this.state.selectedIndexMenu1}
                        onClick={event => this.handleMenuItemClickMenu1(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </CardContent>
              </Card>
            </FuseAnimateGroup>
          </div>
          */}

          <div className="flex flex-col flex-1 xxw-screen xxm-0 xxp-0 md:pr-32">
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideLeftBigIn"
              }}
            >
              <Card className="xxw-screen xxm-0 xxmd:xxmb-16 w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                      Contact
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent className="px-0">
                  <List component="nav" className="px-0 mb-4">
                    <ListItem
                      button
                      aria-haspopup="false"
                      aria-controls="username"
                      aria-label="username"
                      onClick={handleClickListItemContact}
                    >
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Name"
                        secondary={name}
                      />
                    </ListItem>
                    <ListItem
                      button
                      aria-haspopup="false"
                      aria-controls="email"
                      aria-label="email"
                      onClick={handleClickListItemContact}
                    >
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={email}
                      />
                    </ListItem>
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="mobile"
                      aria-label="mobile"
                      onClick={handleClickListItemContact}
                    >
                      <ListItemIcon>
                        <SmartphoneIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Mobile"
                        secondary={mobile}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </FuseAnimateGroup>
          </div>

          <div className="flex flex-col flex-1 md:pr-32">
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideLeftBigIn"
              }}
            >
              <Card className="w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                      Business
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent className="px-0">
                  <List component="nav" className="px-0 mb-4">
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="menu2"
                      aria-label="Type"
                      onClick={handleClickListItemMenu2}
                    >
                      <ListItemIcon>
                        <ExtensionIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Type"
                        secondary={optionsMenu2[selectedIndexMenu2]}
                      />
                    </ListItem>
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="menu2"
                      aria-label="Type"
                      onClick={handleClickListItemGeoSelect}
                    >
                      <ListItemIcon>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Location"
                        secondary={
                          isValidGeo ? `${geoLocal}, ${geoRegion}, ${geoNation}`
                            : 'Click to select...'
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </FuseAnimateGroup>
          </div>

        </div >
      </React.Fragment >
    );
  }
}

DetailsTab.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(DetailsTab);
