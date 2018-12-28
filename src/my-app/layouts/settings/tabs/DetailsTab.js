import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';

// import { Redirect } from 'react-router-dom'

// for actions
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import { updateSettings } from 'my-app/store/actions/my-actions'

// import axios from 'axios/index';
import {
  // Avatar, Button, Icon, IconButton, ListItemSecondaryAction,
  AppBar, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography,
} from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import EmailIcon from '@material-ui/icons/Email';
// import PersonIcon from '@material-ui/icons/Person';
import ExtensionIcon from '@material-ui/icons/Extension';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

// import SettingsStepper from 'my-app/components/steppers/SettingsStepper';
import GeoStepper from 'my-app/components/steppers/GeoStepper'; // see 'class UserMultiForm' for more examples

import SettingsDialog from './SettingsDialog';

// utilities
import _ from 'lodash';
// import * as EmailValidator from 'email-validator';
// import NumberFormat from 'react-number-format';

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

const INITIAL_STATE_SETTINGS_DIALOG = {
  dialogIsOpen: false,
  isDialogTextField: false,
  dialogContent: null, //<GeoStepper .../>
  dialogContentText: null, //'To subscribe to this website, please enter your email address here. We will send updates occasionally.',
  dialogFieldName: null, //'name',
  dialogTextFieldLabel: null, //'first and last',
  dialogTitle: '', //'Name',
  tempSetting: null,
}

const INITIAL_STATE = {

  settings: {
    // name: '',
    // email: '',
    // mobile: '',
    name: 'Maria Le',
    email: 'maria.le.4@gmail.com',
    mobile: '555-123-4567', 
    bizCategory: '',
    geoNation: '',
    geoRegion: '',
    geoLocal: '',
  },

  geoKey: Date.now(), // necessary to re-render GeoSelect component after reset

  isValidName: false,
  isValidEmail: false,
  isValidPhone: false,
  isValidBizCategory: false,
  isValidGeo: false,
  isValidForm: false,

  isErrorName: false,
  helperTextName: null,
  isErrorEmail: false,
  helperTextEmail: null,
  
  anchorElMenu: null,
  selectedIndexMenu: 0,
};

const optionsMenu = [
  'Select one',
  'Home',
  'Mortgage',
  'Insurance',
  'Financial',
];

class DetailsTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      ...INITIAL_STATE_SETTINGS_DIALOG,
    };
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

  handleValidGeoStepper = model => {
    // handleSaveGeoStepper = model => {
    const picked = _.pick(model, ['geoNation', 'geoRegion', 'geoLocal',]);
    const settings = {
      ...picked,
      isValidGeo: true,
    };
    this.setState(
      { settings },
      () => {
        console.log('settings\n', settings);
        console.log('state\n', this.state);
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

  // --------------------------------

  handleClickListItemMenu = event => {
    this.setState({ anchorElMenu: event.currentTarget });
  };

  handleMenuItemClickMenu = (event, index) => {
    this.setState({ selectedIndexMenu: index, anchorElMenu: null });
  };

  handleCloseMenu = () => {
    this.setState({ anchorElMenu: null });
  };

  // --------------------------------

  handleKeyPressDialog = event => {
    if (event.key === 'Enter') {
      // this.setState({ value: event.target.value })
      this.handleSaveDialog();
    }
  };

  handleChangeDialog = event => {
    // console.log('event.target\n', event.target);
    const val = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    // console.log('val\n', val);
    const tempSetting = { [event.target.name] : val };
    // console.log('tempSetting\n', tempSetting);
    this.setState({tempSetting});
    // console.log('state\n', this.state);
  };
  
  handleResetDialog = event => {
    this.setState({ dialogIsOpen: false, });
    this.setState({ ...INITIAL_STATE_SETTINGS_DIALOG });
  }
  
  handleSaveDialog = event => {
    // console.log('state\n', this.state);
    const settings = _.merge(this.state.settings, this.state.tempSetting);
    // console.log('settings\n', settings);
    this.setState({settings});
    // console.log('state\n', this.state);
    this.props.updateSettings(this.state.settings);
    this.handleResetDialog();
  }

  // --------------------------------
  
  handleClickListItemDialog = ob => event => {
    // consnulle.log('ob\n', ob);
    this.setState({
      dialogIsOpen: true,
      ...ob,
    });
  }
  
  // --------------------------------

  render() {
    const { classes, user, } = this.props;
    // if (!user.data.uid) return <Redirect to='/login' /> 
    // const { general, work, contact, } = this.state;
    const {
      anchorElMenu,
      dialogIsOpen, dialogContent, dialogContentText, dialogTitle,
      isDialogTextField, dialogTextFieldLabel, dialogFieldName,
      selectedIndexMenu,
      geoKey, isValidGeo, geoNation, geoRegion, geoLocal,
    } = this.state;
    const {
      handleValidGeoStepper,
      handleClickListItemDialog,
      handleClickListItemMenu, handleMenuItemClickMenu, handleCloseMenu,
      handleKeyPressDialog, handleChangeDialog,
      handleResetDialog, handleSaveDialog,
    } = this;

    return (
      <React.Fragment>

        <Menu
          id="menu"
          anchorEl={anchorElMenu}
          open={Boolean(anchorElMenu)}
          onClose={handleCloseMenu}
        >
          {optionsMenu.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === selectedIndexMenu}
              onClick={event => handleMenuItemClickMenu(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        <SettingsDialog
          onKeyPress={handleKeyPressDialog}
          onChange={handleChangeDialog}
          onClose={handleResetDialog}
          onCancel={handleResetDialog}
          onSave={handleSaveDialog}    
          dialogIsOpen={dialogIsOpen}
          dialogTitle={dialogTitle}
          dialogContent={dialogContent}
          dialogContentText={dialogContentText}
          dialogFieldName={dialogFieldName}
          dialogTextFieldLabel={dialogTextFieldLabel}
          isDialogTextField={isDialogTextField}
        />

        {/* "Block-level" group of two cards on this row */}
        <div className={classNames(classes.root, "md:flex max-w-2xl")}>

          <div className="flex flex-col flex-1 md:pr-32">
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideLeftBigIn"
              }}
            >
              <Card className="w-full m-0 md:mb-16">
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
                      onClick={handleClickListItemDialog({
                        dialogTitle: 'Name',
                        isDialogTextField: true,
                        dialogTextFieldLabel: 'first and last',
                        dialogFieldName: 'name',
                      })}
                    >
                      <ListItemIcon>
                        {/* <PersonIcon /> */}
                        <PermContactCalendarIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Name"
                        // secondary={name}
                        secondary={user.data.displayName}
                      />
                    </ListItem>
                    <ListItem
                      button
                      aria-haspopup="false"
                      aria-controls="email"
                      aria-label="email"
                      onClick={handleClickListItemDialog({
                        dialogTitle: 'Email',
                        isDialogTextField: true,
                        dialogTextFieldLabel: 'address',
                        dialogFieldName: 'email',
                      })}
                    >
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        // secondary={email}
                        secondary={user.data.email}
                      />
                    </ListItem>
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="mobile"
                      aria-label="mobile"
                      onClick={handleClickListItemDialog({
                        dialogTitle: 'Mobile',
                        isDialogTextField: true,
                        dialogTextFieldLabel: 'number',
                        dialogFieldName: 'mobile',
                      })}
                    >
                      <ListItemIcon>
                        <SmartphoneIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Mobile"
                        // secondary={mobile}
                        secondary={ user.data.phoneNumber || 'Click to enter...' }
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
              <Card className="w-full m-0 md:mb-16">
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
                      aria-controls="menu"
                      aria-label="Type"
                      onClick={handleClickListItemMenu}
                    >
                      <ListItemIcon>
                        <ExtensionIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Type"
                        secondary={optionsMenu[selectedIndexMenu]}
                      />
                    </ListItem>
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="menu"
                      aria-label="Type"
                      onClick={handleClickListItemDialog({
                        dialogTitle: 'Location',
                        dialogContent :
                          (<GeoStepper
                            key={geoKey} // reset with unique new key
                            // heading={geoStepperLabel}
                            heading={'Tell us your home market so we can send you leads'}
                            showSaveButton={false}
                            // onSave={handleSaveGeoStepper}
                            onValid={handleValidGeoStepper}
                          />),
                      })}
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

function mapStateToProps({ auth }) {
  return {
    user: auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSettings: settings => dispatch(updateSettings(settings)),
  }
}

// function mapDispatchToProps(dispatch)
// {
//     return bindActionCreators({
//         toggleQuickPanel: quickPanelActions.toggleQuickPanel,
//         logout          : authActions.logoutUser,
//         openChatPanel   : chatPanelActions.openChatPanel
//     }, dispatch);
// }

// export default withStyles(styles, { withTheme: true })(DetailsTab);
export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(DetailsTab));
