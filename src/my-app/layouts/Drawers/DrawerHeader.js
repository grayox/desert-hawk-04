import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class DrawerHeader extends Component {
  state = {
    open: false,
  };

  render() {
    const { classes, } = this.props;

    return (
      <div className={classes.root}>
        DrawerHeader
      </div>
    );
  }
}

DrawerHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DrawerHeader);