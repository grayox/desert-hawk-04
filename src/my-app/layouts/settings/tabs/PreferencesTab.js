import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import {
  // Avatar, Button, Icon, IconButton,
  AppBar, Card, CardContent, List, ListItem, ListItemSecondaryAction, Menu, MenuItem, ListItemText, Toolbar, Typography
} from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';

import EmailIcon from '@material-ui/icons/Email';
import TextsmsIcon from '@material-ui/icons/Textsms';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
});

function PreferencesTab(props) {

  const { 
    classes,
    optionsMenu1, optionsMenu2,
    anchorElMenu1, anchorElMenu2,
    selectedIndexMenu1, selectedIndexMenu2,
    handleClickListItemMenu1, handleClickListItemMenu2,
  } = this.props;

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
                    Automation
                  </Typography>
                </Toolbar>
              </AppBar>

              <CardContent className="px-0">
                <List
                  className={classes.root}
                // subheader={<ListSubheader>Automation</ListSubheader>}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      {
                        this.state.checked.indexOf('claim') !== -1 ?
                          <AddLocationIcon /> :
                          <NotInterestedIcon />
                      }
                    </ListItemIcon>
                    <ListItemText
                      primary='Claim new leads'
                      secondary={
                        this.state.checked.indexOf('claim') !== -1 ?
                          <React.Fragment>
                            Automatically
                            <br />
                            (forward to archive)
                          </React.Fragment>
                          :
                          <React.Fragment>
                            Manually
                            <br />
                            (inspect inbox)
                          </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        onChange={this.handleToggle('claim')}
                        checked={this.state.checked.indexOf('claim') !== -1}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                <List subheader={<ListSubheader>Notify me</ListSubheader>} className={classes.root}>
                  <ListItem>
                    <ListItemIcon>
                      {
                        this.state.checked.indexOf('textMe') !== -1 ?
                          <TextsmsIcon /> :
                          <NotInterestedIcon />
                      }
                    </ListItemIcon>
                    <ListItemText
                      primary="Text"
                      secondary={
                        this.state.checked.indexOf('textMe') !== -1 ?
                          'Automatic' :
                          'Do not text me'
                      }
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        onChange={this.handleToggle('textMe')}
                        checked={this.state.checked.indexOf('textMe') !== -1}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {
                        this.state.checked.indexOf('emailMe') !== -1 ?
                          <EmailIcon /> :
                          <NotInterestedIcon />
                      }
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={
                        this.state.checked.indexOf('emailMe') !== -1 ?
                          'Automatic' :
                          'Do not email me'
                      }
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        onChange={this.handleToggle('emailMe')}
                        checked={this.state.checked.indexOf('emailMe') !== -1}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                <List subheader={<ListSubheader>Notify prospects</ListSubheader>} className={classes.root}>
                  <ListItem>
                    <ListItemIcon>
                      {
                        this.state.checked.indexOf('textProspect') !== -1 ?
                          <TextsmsIcon /> :
                          <NotInterestedIcon />
                      }
                    </ListItemIcon>
                    <ListItemText
                      primary="Text"
                      secondary={
                        this.state.checked.indexOf('textProspect') !== -1 ?
                          'Automatic' :
                          'Do not text prospect'
                      }
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        onChange={this.handleToggle('textProspect')}
                        checked={this.state.checked.indexOf('textProspect') !== -1}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {
                        this.state.checked.indexOf('emailProspect') !== -1 ?
                          <EmailIcon /> :
                          <NotInterestedIcon />
                      }
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={
                        this.state.checked.indexOf('emailProspect') !== -1 ?
                          'Automatic' :
                          'Do not email prospect'
                      }
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        onChange={this.handleToggle('emailProspect')}
                        checked={this.state.checked.indexOf('emailProspect') !== -1}
                      />
                    </ListItemSecondaryAction>
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
                    Display
                  </Typography>
                </Toolbar>
              </AppBar>

              <CardContent className="px-0">
                <List
                  className={classes.root}
                // subheader={<ListSubheader>Background</ListSubheader>}
                >
                  {/* <ListItem>
                    <ListItemIcon>
                      {
                        this.state.checked.indexOf('dark') !== -1 ?
                        <Brightness4Icon /> :
                        <NotInterestedIcon />
                      }
                    </ListItemIcon>
                    <ListItemText
                      primary='Background'
                      secondary={
                        this.state.checked.indexOf('dark') !== -1 ?
                        'Dark (saves battery)' :
                        'Light'
                      }
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        onChange={this.handleToggle('dark')}
                        checked={this.state.checked.indexOf('dark') !== -1}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {
                        this.state.checked.indexOf('condensed') !== -1 ?
                        <DashboardIcon /> :
                        <NotInterestedIcon />
                      }
                    </ListItemIcon>
                    <ListItemText
                      primary='Dashboard'
                      secondary={
                        this.state.checked.indexOf('condensed') !== -1 ?
                        'Condensed' :
                        'Expanded'
                      }
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        onChange={this.handleToggle('condensed')}
                        checked={this.state.checked.indexOf('condensed') !== -1}
                      />
                    </ListItemSecondaryAction>
                  </ListItem> */}

                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="menu2"
                    aria-label="Dashboard"
                    onClick={handleClickListItemMenu2}
                  >
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Dashboard"
                      secondary={optionsMenu2[selectedIndexMenu2]}
                    />
                  </ListItem>
                  <Menu
                    id="menu2"
                    anchorEl={anchorElMenu2}
                    open={Boolean(anchorElMenu2)}
                    onClose={this.handleCloseMenu2}
                  >
                    {optionsMenu2.map((option, index) => (
                      <MenuItem
                        key={option}
                        // disabled={index === 0}
                        selected={index === this.state.selectedIndex}
                        onClick={event => this.handleMenuItemClickMenu2(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>

                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="menu1"
                    aria-label="Background"
                    onClick={handleClickListItemMenu1}
                  >
                    <ListItemIcon>
                      <Brightness4Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Background"
                      secondary={optionsMenu1[selectedIndexMenu1]}
                    />
                  </ListItem>
                  <Menu
                    id="menu1"
                    anchorEl={anchorElMenu1}
                    open={Boolean(anchorElMenu1)}
                    onClose={this.handleCloseMenu1}
                  >
                    {optionsMenu1.map((option, index) => (
                      <MenuItem
                        key={option}
                        // disabled={index === 0}
                        selected={index === this.state.selectedIndex}
                        onClick={event => this.handleMenuItemClickMenu1(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </List>

              </CardContent>
            </Card>
          </FuseAnimateGroup>
        </div>

      </div>
    </React.Fragment>
  );

}

PreferencesTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreferencesTab);