// import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';

// import { Redirect } from 'react-router-dom'

// import axios from 'axios/index';
import {
  // ListItemAvatar, Button, IconButton, ListItemSecondaryAction,
  Avatar, AppBar, Card, CardContent, Icon, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography,
} from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';

// import SettingsStepper from 'my-app/components/steppers/SettingsStepper';
import GeoStepper from 'my-app/components/steppers/GeoStepper'; // see 'class UserMultiForm' for more examples

// this page was inspired by ./AboutTab

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
//     user, //settings, profile, leads,
//     //geoKey, isValidGeo, 
//     //geoNation, geoRegion, geoLocal, bizCategory,
//     //handleValidGeoStepper, handleClickListItemDialog, handleClickListItemMenu,
//   } = props;

//   return (
//     <React.Fragment>Hello world</React.Fragment>
//   )
// }


const DetailsTab = props => {

  const {
    classes, profile, settings, // user, leads,
    geoKey, isValidGeo, geoNation, geoRegion, geoLocal, bizCategory,
    onValidGeoStepper, onClickListItemDialog, onClickListItemMenu,
  } = props;

  return (
    <React.Fragment>

      {
      // "Block-level" group of two cards on this row
      }
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
                    onClick={onClickListItemDialog({
                      dialogTitle: 'Name',
                      isDialogTextField: true,
                      dialogTextFieldLabel: 'first and last',
                      dialogFieldName: 'name',
                    })}
                  >
                    <ListItemIcon>
                      <Avatar>
                        {/* <PersonIcon /> */}
                        <Icon>perm_contact_calendar</Icon>
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary="Name"
                      // secondary={name}
                      // secondary={user.data.displayName}
                      secondary={
                        (settings && settings.displayName)
                        ||
                        (profile && profile.displayName)
                        ||
                        'Click to enter...'
                      }
                    />
                  </ListItem>
                  <ListItem
                    button
                    aria-haspopup="false"
                    aria-controls="email"
                    aria-label="email"
                    onClick={onClickListItemDialog({
                      dialogTitle: 'Email',
                      isDialogTextField: true,
                      dialogTextFieldLabel: 'address',
                      dialogFieldName: 'email',
                    })}
                  >
                    <ListItemIcon>
                      <Avatar>
                        <Icon>email</Icon>
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      // secondary={email}
                      // secondary={user.data.email}
                      secondary={
                        (settings && settings.email)
                        ||
                        (profile && profile.email)
                        ||
                        'Click to enter...'
                      }
                    />
                  </ListItem>
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="mobile"
                    aria-label="mobile"
                    onClick={onClickListItemDialog({
                      dialogTitle: 'Mobile',
                      isDialogTextField: true,
                      dialogTextFieldLabel: 'number',
                      dialogFieldName: 'mobile',
                    })}
                  >
                    <ListItemIcon>
                      <Avatar>
                        <Icon>smartphone</Icon>
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary="Mobile"
                      // secondary={mobile}
                      // secondary={ user.data.phoneNumber || 'Click to enter...' }
                      // secondary={ settings.mobile || profile.phoneNumber || 'Click to enter...' }
                      secondary={
                        (settings && settings.mobile)
                        ||
                        (profile && profile.mobile)
                        ||
                        'Click to enter...'
                      }
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
                    onClick={onClickListItemMenu}
                  >
                    <ListItemIcon>
                      <Avatar>
                        <Icon>extension</Icon>
                      </Avatar>
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
                    onClick={onClickListItemDialog({
                      dialogTitle: 'Location',
                      dialogContent :
                        (<GeoStepper
                          key={geoKey} // reset with unique new key
                          // heading={geoStepperLabel}
                          heading={'Tell us your home market so we can send you leads'}
                          showSaveButton={false}
                          // onSave={handleSaveGeoStepper}
                          onValid={onValidGeoStepper}
                        />),
                    })}
                  >
                    <ListItemIcon>
                      <Avatar>
                        <Icon>location_on</Icon>
                      </Avatar>
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