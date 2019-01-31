// inspired by https://material-ui.com/demos/app-bar/#simple-app-bar

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    // flexGrow: 1, // moves drawer contents to align flush / justify with the bottom of screen
  },
};

function BrandAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar
        // position="fixed" // overlays MyAppBar
        position="static"
        // color="default"
      >
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

BrandAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BrandAppBar);