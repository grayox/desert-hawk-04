// import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';

// import { Redirect } from 'react-router-dom'

// import axios from 'axios/index';
import {
  // Avatar, ListItemAvatar, Button, Icon, IconButton, ListItemSecondaryAction,
  AppBar, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography,
} from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';

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

// this page was copied from ./AboutTab

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
});

// function DetailsTab1(props) {

//   // if(!this.props) return;
//   const {
//     //classes, 
//     user, 
//     //geoKey, isValidGeo, 
//     //geoNation, geoRegion, geoLocal, bizCategory,
//     //handleValidGeoStepper, handleClickListItemDialog, handleClickListItemMenu,
//   } = props;//settings, profile, leads,

//   return (
//     <React.Fragment>Hello world</React.Fragment>
//   )
// }


function DetailsTab(props) {

  const {
    classes, user, profile, settings,
    geoKey, isValidGeo, geoNation, geoRegion, geoLocal, bizCategory,
    handleValidGeoStepper, handleClickListItemDialog, handleClickListItemMenu,
  } = props; //settings, profile, leads, 

  return (
    <React.Fragment>

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
                      // secondary={user.data.displayName}
                      secondary={profile.displayName}
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
                      secondary={bizCategory}
                      // secondary={optionsMenu[selectedIndexMenu]}
                      // secondary={settings.bizCategory}
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
                        isValidGeo ? (`${geoLocal}, ${geoRegion}, ${geoNation}`)
                          : 'Click to select...'
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </FuseAnimateGroup>
        </div>
      </div>
    </React.Fragment >
  );
}

DetailsTab.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DetailsTab);