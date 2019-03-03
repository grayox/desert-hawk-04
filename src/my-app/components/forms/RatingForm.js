// ref: http://dreyescat.github.io/react-rating/

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import PropTypes from "prop-types";

import { Typography, Paper, } from '@material-ui/core';

import Rating from 'react-rating';

const styles = theme => ({});

class RatingForm extends Component {

  render() {
    // const { classes, } = this.props;
    
    return (
      <Paper className="max-w-sm m-32 p-32">
        <Typography className="h1 mb-24">Rate us</Typography>
        <Rating stop={5} fractions={2} />
      </Paper>
    );
  }
}

// RatingForm.propTypes = {
//   classes: PropTypes.object.isRequired,
//   // heading: PropTypes.string,
//   // savePath: PropTypes.string,
// };

export default withStyles(styles)(RatingForm);