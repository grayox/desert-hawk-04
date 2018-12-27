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
  // Avatar, Icon, IconButton, ListItemSecondaryAction,
  AppBar, Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography,
} from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import EmailIcon from '@material-ui/icons/Email';
import ExtensionIcon from '@material-ui/icons/Extension';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

// import SettingsStepper from 'my-app/components/steppers/SettingsStepper';
import GeoStepper from 'my-app/components/steppers/GeoStepper'; // see 'class UserMultiForm' for more examples

// utilities
import _ from 'lodash';

// firebase
import firebase from '@firebase/app';
import '@firebase/firestore';
const db = firebase.firestore();

const styles = theme => ({
  root: {
    width: '100%',
  },
});

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
  helperTextName: '',
  isErrorEmail: false,
  helperTextEmail: '',

  anchorElMenu1: null,
  selectedIndexMenu1: 1,
  anchorElMenu2: null,
  selectedIndexMenu2: 1,
  
  dialogIsOpen: false,
  dialogTitle: 'Name', //'Name',
  // dialogContentText: '', //'To subscribe to this website, please enter your email address here. We will send updates occasionally.',
  dialogLabel: 'first and last', //'first and last',
  dialogName: 'name', //'name',

};

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

  // dialog = () => {
  dialog = props => {
    return (
      <Dialog
        open={this.state.dialogIsOpen}
        onClose={this.handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        {/* <DialogTitle id="form-dialog-title">{this.state.dialogTitle}</DialogTitle> */}
        <DialogTitle id="form-dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
          {/* { this.state.dialogContentText && */}
          { props.dialogContentText &&
            (
              <DialogContentText className='mb-8'>
                {/* To subscribe to this website, please enter your email address here. We will send updates occasionally. */}
                {/* {this.state.dialogContentText} */}
                {props.dialogContentText}
              </DialogContentText>
            )
          }
          <TextField
            // id={this.state.dialogName}
            // name={this.state.dialogName}
            id={props.dialogName}
            name={props.dialogName}
            type="text"
            margin="dense"
            variant="outlined"
            // label={this.state.dialogLabel}
            label={props.dialogLabel}
            onChange={this.handleChange}
            autoFocus
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancelDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSaveDialog} id="name" color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  resetForm = () => {
    this.setState(INITIAL_STATE);
    this.setState({
      geoKey: Date.now(), // resets geoStepper
    });
  }

  // --------------------------------

  handleClickListItemMenu1 = event => {
    this.setState({ anchorElMenu1: event.currentTarget });
  };

  handleMenuItemClickMenu1 = (event, index) => {
    this.setState({ selectedIndexMenu1: index, anchorElMenu1: null });
  };

  handleCloseMenu1 = () => {
    this.setState({ anchorElMenu1: null });
  };

  // --------------------------------

  handleClickListItemMenu2 = event => {
    this.setState({ anchorElMenu2: event.currentTarget });
  };

  handleMenuItemClickMenu2 = (event, index) => {
    this.setState({ selectedIndexMenu2: index, anchorElMenu2: null });
  };

  handleCloseMenu2 = () => {
    this.setState({ anchorElMenu2: null });
  };

  // --------------------------------

  handleChange = event => {
    // console.log('event.target\n', event.target);
    const val = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    // console.log('val\n', val);
    const settings = { [event.target.name] : val };
    // console.log('setting\n', setting);
    this.setState({settings});
  };

  // --------------------------------
  
  // handleClickListItemDialog = ({dialogTitle, ˚dialogLabel, dialogName}) => {
  handleClickListItemDialog = event => {
    this.setState({ 
      dialogIsOpen: true,
      // dialogTitle: 'foo', dialogLabel: 'foo', dialogName: 'foo',
    });
  }
  
  handleCloseDialog = event => {
    this.setState({ dialogIsOpen: false, });
  }
  
  handleCancelDialog = event => {
    this.setState({ dialogIsOpen: false, });
    // this.setState({ name: '', });
  }
  
  handleSaveDialog = event => {
    // console.log('state\n', this.state);
    this.setState({ dialogIsOpen: false, });
    this.props.updateSettings(this.state.settings);
  }
  
  // --------------------------------
  
  handleClickListItemDialog1 = event => {
    this.setState({ dialog1isOpen: true, });
  }
  
  handleCloseDialog1 = event => {
    this.setState({ dialog1isOpen: false, });
  }
  
  handleCancelDialog1 = event => {
    this.setState({ dialog1isOpen: false, });
    // this.setState({ name: '', });
  }
  
  handleSaveDialog1 = event => {
    // console.log('state\n', this.state);
    this.setState({ dialog1isOpen: false, });
    this.props.updateSettings(this.state.settings);
  }
  
  // --------------------------------

  handleClickListItemDialog2 = event => {
    this.setState({ dialog2isOpen: true, });
  }

  handleCloseDialog2 = event => {
    this.setState({ dialog2isOpen: false, });
  }

  handleClickListItemDialog3 = event => {
    this.setState({ dialog3isOpen: true, });
  }

  handleCloseDialog3 = event => {
    this.setState({ dialog3isOpen: false, });
  }

  handleClickListItemDialog4 = event => {
    this.setState({ dialog4isOpen: true, });
  }

  handleCloseDialog4 = event => {
    this.setState({ dialog4isOpen: false, });
  }

  render() {
    const { classes, user, } = this.props;
    // if (!user.data.uid) return <Redirect to='/login' /> 
    // const { general, work, contact, } = this.state;
    const {
      dialog1isOpen, 
    } = this.state;
    const {
      handleChange, dialog,
      handleClickListItemDialog ,
      handleCancelDialog1, handleSaveDialog1, handleCloseDialog1,
    } = this;

    return (
      <React.Fragment>

        {
          this.dialog({
            dialogTitle: 'Name',
            // dialogContentText: 'To subscribe to this website, please enter your email address here. We will send updates occasionally.',
            label: 'first and last',
            name: 'name',
          })
        }

        <Dialog
          open={dialog1isOpen}
          onClose={handleCloseDialog1}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Name</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send
                updates occasionally.
              </DialogContentText> */}
            <TextField
              id="name"
              name="name"
              type="text"
              margin="dense"
              variant="outlined"
              label="first and last"
              onChange={handleChange}
              autoFocus
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDialog1} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveDialog1} id="name" color="secondary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

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
                      onClick={handleClickListItemDialog}
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

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(DetailsTab));
