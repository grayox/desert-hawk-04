// ref: http://dreyescat.github.io/react-rating/

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import PropTypes from "prop-types";

import { Typography, Paper, } from '@material-ui/core';

import Rating from 'react-rating';

const styles = theme => ({});

class RatingSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
    };
  }

  handleChange = value => {
    // console.log('value\n', value);
    this.setState({ value, });
  }

  render() {
    // const { classes, } = this.props;
    const { value } = this.state;
    const { handleChange } = this;
    
    return (
      <Paper className="max-w-sm m-32 p-32">
        <Typography className="h1 mb-12">
          Rate us
          {
            value && `: ${value}/5 stars`
          }
        </Typography>
        {
        // <Typography className="body1 mb-24">{value}</Typography>
        }
        <Rating stop={5} fractions={2} initialRating={value} onChange={handleChange} />
      </Paper>
    );
  }
}

// RatingSelect.propTypes = {
//   classes: PropTypes.object.isRequired,
//   // heading: PropTypes.string,
//   // savePath: PropTypes.string,
// };

export default withStyles(styles)(RatingSelect);