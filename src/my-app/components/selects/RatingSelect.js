// ref: http://dreyescat.github.io/react-rating/

import React, { useState, } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import PropTypes from "prop-types";

import { Typography, Paper, Button, } from '@material-ui/core';

import { FaStar, FaRegStar, } from 'react-icons/fa'; // https://react-icons.netlify.com/#/

import Rating from 'react-rating';

const styles = theme => ({});

const RatingSelect = props => {
  const [ value           , setValue           , ] = useState(undefined);
  const [ disabledButtons , setDisabledButtons , ] = useState(true);

  const handleChange = n => {
    console.log('value\n', n,);
    setValue(n);
  }

  const handleClick = n => {
    console.log('value\n', n,);
    if(n === value) {
      handleReset();
    } else {
      handleChange(n);
      setDisabledButtons(false);
    }
  }

  const handleReset = () => {
    setValue(undefined);
    setDisabledButtons(true);
  }

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
      // <Rating fractions={2} />
      }
      <Rating
        stop={5} initialRating={value} onClick={handleClick} // onChange={handleChange}
        emptySymbol={<FaRegStar className="mx-8 text-3xl text-orange" />}
        fullSymbol={<FaStar className="mx-8 text-3xl text-orange" />}
      /> 
      <div className="mt-24 justify-right">
        <Button disabled={disabledButtons} onClick={handleReset}>Reset</Button>
        <Button variant="contained" color="secondary" disabled={disabledButtons}>Save</Button>
      </div>
    </Paper>
  );
}

// RatingSelect.propTypes = {
//   classes: PropTypes.object.isRequired,
//   // heading: PropTypes.string,
//   // savePath: PropTypes.string,
// };

export default withStyles(styles)(RatingSelect);