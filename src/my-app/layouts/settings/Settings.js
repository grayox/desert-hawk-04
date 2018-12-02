import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';
// import Typography from '@material-ui/core/Typography';

import SplitScreen from '../SplitScreen'
import UserMultiForm from 'my-app/components/forms/UserMultiForm';
import CreateLead from 'my-app/components/forms/CreateLead';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';
import SimpleListMenu from 'my-app/components/selects/SimpleListMenu';
import ControlledExpansionPanel from 'my-app/components/expansion/ControlledExpansionPanel.js';
import GeoStepper from 'my-app/components/steppers/GeoStepper';
// import WifiIcon from '@material-ui/icons/Wifi';
// import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';

// firebase
// import firebase from '@firebase/app';
// import '@firebase/firestore';

// const db = firebase.firestore();

const username = 'userme';
const path = ['users', username, 'settings',].join('/');
// const location = 'users/userme/settings';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const optionsBizType = [
  // 'Show some love to Material-UI',
  // 'Show all notification content',
  // 'Hide sensitive notification content',
  // 'Hide all notification content',
  'Select one',
  'Home',
  'Mortgage',
  'Insurance',
  'Financial',
];

const optionsAutomation = [
  'Email you',
  'Text you',
  'Email your prospect',
  'Text your prospect',
]

// function getSettings() {
//   db.collection(path)
//     .orderBy('timestamp', 'desc')
//     .limit(1)
//     .onSnapshot(snapshot => { // https://firebase.google.com/docs/firestore/query-data/listen
//       snapshot.docChanges().forEach(change => {
//         const data = change.doc.data();
//         // console.log("Current data\n", data);
//         this.setState({
//           ...data,
//           show: (typeof data === 'object' ? 'main' : 'greet'),
//         });
//         // if (change.type === "added") {
//         //   console.log("New city: ", change.doc.data());
//         // }
//         // if (change.type === "modified") {
//         //   console.log("Modified city: ", change.doc.data());
//         // }
//         // if (change.type === "removed") {
//         //   console.log("Removed city: ", change.doc.data());
//         // }
//       });
//     });
// }

const handleChange = name => event => {
  this.setState({
    [name]: event.target.value,
  });
};

// handleToggle = value => () => {
//   // const { checked } = this.state;
//   const currentIndex = checked.indexOf(value);
//   const newChecked = [...checked];

//   if (currentIndex === -1) {
//     newChecked.push(value);
//   } else {
//     newChecked.splice(currentIndex, 1);
//   }

//   // this.setState({
//   //   checked: newChecked,
//   // });
// };

function Settings(props) {
  // const { left, right } = props;
  const { classes } = props;

  // componentDidMount() {
  //   this.getSettings();
  // }

  return (
    <SplitScreen
      left={
        <div>
          <List
            component="nav"
            subheader={
              <ListSubheader component="div" className="uppercase">
                YOUR DETAILS
              </ListSubheader>
            }
          >
          </List>
          <List className={classes.root}>
            <ControlledExpansionPanel
              heading='Name'
              secondaryHeading='Name'
              content={
                <TextField
                  fullWidth
                  id="standard-name"
                  label="Name"
                  className={classes.textField}
                  // value={this.state.name}
                  onChange={handleChange('name')}
                  margin="normal"
                />
              }
            />
            <ControlledExpansionPanel
              heading='Email'
              secondaryHeading='Email'
              content={
                <TextField
                  fullWidth
                  id="standard-email"
                  label="Email"
                  className={classes.textField}
                  // value={this.state.name}
                  onChange={handleChange('email')}
                  margin="normal"
                />
              }
            />
            <ControlledExpansionPanel
              heading='Location'
              secondaryHeading='Select'
              content={<GeoStepper />}
            />
            <SimpleListMenu
              heading='Business type'
              options={optionsBizType}
            />
          </List>
          <List
            component="nav"
            subheader={
              <ListSubheader component="div" className="uppercase">
                Automation Options
              </ListSubheader>
            }
          >
            {/* <ListItem>
              <ListItemIcon>
                <WifiIcon />
              </ListItemIcon>
              <ListItemText primary="Wi-Fi" />
              <ListItemSecondaryAction>
                <Switch
                // onChange={this.handleToggle('wifi')}
                // checked={this.state.checked.indexOf('wifi') !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem> */}
          </List>
          <List className={classes.root}>
            {optionsAutomation.map(value => (
              <ListItem
                key={value}
                // role={undefined}
                // dense
                button
                // onClick={this.handleToggle(value)}
                className={classes.listItem}
              >
                <Checkbox
                  // checked={this.state.checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={value} />
                <ListItemSecondaryAction>
                  {/* <IconButton aria-label="Comments">
                    <CommentIcon />
                  </IconButton> */}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      }
      right={
        <div>
          <CreateLead />
          <UserMultiForm
            heading='Settings'
            savePath={path}
            geoStepperLabel='Your location'
          />
        </div>
      }
    />
  );
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default Settings;
export default withStyles(styles)(Settings);
