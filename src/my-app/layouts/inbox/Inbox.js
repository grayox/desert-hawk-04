import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SplitScreen from '../SplitScreen'
import UserMultiForm from 'my-app/components/forms/UserMultiForm';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function Inbox(props) {
  const { classes, items } = props;
  return (
    <SplitScreen
      left={
        <div className={classes.root}>
          <List component="nav">
          {
            items.map(item => (
              <ListItem button key={item.timestamp}>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
                <ListItemText primary="Vacation" secondary={item.name} />
              </ListItem>
            ))
          }
          </List>
        </div>
    }
      // left={'hello world'}
      right={
        <UserMultiForm
          withPhone
          heading='Add new lead'
          savePath='leads'
          geoStepperLabel='Lead location'
        />        
      }
    />
  );
}

Inbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inbox);