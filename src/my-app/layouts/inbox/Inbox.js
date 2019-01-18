import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import ListDetail from '../ListDetail'

// import AcademyApp from 'my-app/apps/academy/courses/Courses';

// @material-ui/core
// import Icon from "@material-ui/core/Icon";
import {
  AppBar, Toolbar, Typography,
  // Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function Inbox(props) {
  // <AcademyApp/>

  console.log('props\n', props);
  const { classes, items } = props;
  return (

    <React.Fragment>

      <AppBar
        className="m-0"
        position="static"
        elevation={0}
      >
        <Toolbar className="px-16">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            Inbox
          </Typography>
        </Toolbar>
      </AppBar>

      <ListDetail
        // title={'Inbox Detail'}
        items={items}
        condensed
      />

    </React.Fragment>
  );
}

Inbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inbox);