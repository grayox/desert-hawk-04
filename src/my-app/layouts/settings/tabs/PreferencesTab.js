import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import { Avatar, AppBar, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';

import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class PreferencesTab extends React.Component {
  state = {
    checked: ['wifi'],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;

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
              <Card className="w-full mb-16">
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
                    <ListItem>
                      <ListItemIcon>
                        <WifiIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary='Claim new leads'
                        secondary={
                          this.state.checked.indexOf('wifi') !== -1 ?
                          'Automatic (send to archive)' :
                          'Manual (inspect inbox)'
                        }
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('wifi')}
                          checked={this.state.checked.indexOf('wifi') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <List subheader={<ListSubheader>Notify me</ListSubheader>} className={classes.root}>
                    <ListItem>
                      <ListItemIcon>
                        <WifiIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Text"
                        secondary={
                          this.state.checked.indexOf('wifi') !== -1 ?
                          'Automatic' :
                          'Do not text'
                        }
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('wifi')}
                          checked={this.state.checked.indexOf('wifi') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <BluetoothIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={
                          this.state.checked.indexOf('bluetooth') !== -1 ?
                          'Automatic' :
                          'Do not email'
                        }
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('bluetooth')}
                          checked={this.state.checked.indexOf('bluetooth') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <List subheader={<ListSubheader>Notify prospects</ListSubheader>} className={classes.root}>
                    <ListItem>
                      <ListItemIcon>
                        <WifiIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Text"
                        secondary={
                          this.state.checked.indexOf('wifi') !== -1 ?
                          'Automatic' :
                          'Do not text'
                        }
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('wifi')}
                          checked={this.state.checked.indexOf('wifi') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <BluetoothIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={
                          this.state.checked.indexOf('bluetooth') !== -1 ?
                          'Automatic' :
                          'Do not email'
                        }
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('bluetooth')}
                          checked={this.state.checked.indexOf('bluetooth') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>

                </CardContent>
              </Card>
            </FuseAnimateGroup>
          </div>

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
                      Display
                    </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent className="px-0">


                  <List subheader={<ListSubheader>Background</ListSubheader>} className={classes.root}>
                    <ListItem>
                      <ListItemIcon>
                        <WifiIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary='Background'
                        secondary={
                          this.state.checked.indexOf('wifi') !== -1 ?
                          'Dark (saves battery)' :
                          'Light'
                        }
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          onChange={this.handleToggle('wifi')}
                          checked={this.state.checked.indexOf('wifi') !== -1}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>

                </CardContent>
              </Card>
            </FuseAnimateGroup>
          </div>


        </div>
      </React.Fragment>
    );
  }
}

PreferencesTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreferencesTab);