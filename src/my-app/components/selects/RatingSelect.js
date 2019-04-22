// ref: http://dreyescat.github.io/react-rating/

import React, { useState, } from 'react';
import PropTypes from "prop-types";

// import { withStyles, } from '@material-ui/core/styles';
import { Typography, Paper, Button, } from '@material-ui/core'; // withStyles,

import { FaStar, FaRegStar, } from 'react-icons/fa'; // https://react-icons.netlify.com/#/

import Rating from 'react-rating';

const styles = theme => ({});

const RatingSelect = props => {
  const { heading, stop, forwardMinimum, redirectPath, } = props;

  const [ value           , setValue           , ] = useState(undefined);
  const [ disabledButtons , setDisabledButtons , ] = useState(true);

  const handleClick = n => {
    // console.log('value\n', n,);
    if(n === value) {
      handleReset();
    } else {
      handleChange(n);
      setDisabledButtons(false);
    }
  }

  const handleChange = n => {
    // console.log('value\n', n,);
    setValue(n);
  }

  const handleReset = () => {
    setValue(undefined);
    setDisabledButtons(true);
  }
  
  const handleSave = () => {
    if(value < forwardMinimum) {
      alert(value);
      return;
    }
    alert(`Would you like to go to ${redirectPath}?`)
  }
  
  return (
    <Paper className="max-w-sm m-32 p-32 w-full">
      <Typography className="h1 mb-12">{heading}</Typography>
      {
      // <Typography className="body1 mb-24">{value}</Typography>
      // <Rating fractions={2} />
      }
      <Rating
        stop={stop} initialRating={value} onClick={handleClick} // onChange={handleChange}
        emptySymbol={<FaRegStar className="mx-8 text-3xl text-orange" />}
        fullSymbol={<FaStar className="mx-8 text-3xl text-orange" />}
      /> 
      <Typography className="opacity-50">
        { value && `${value}/5 stars`}
      </Typography>
      <div className="mt-24 justify-right">
        <Button disabled={disabledButtons} onClick={handleReset}>Reset</Button>
        <Button variant="contained" color="secondary" disabled={disabledButtons} onClick={handleSave}>Submit</Button>
      </div>
    </Paper>
  );
}

RatingSelect.defaultProps = {
  heading: 'Rate us',
  stop: 5,
  forwardMinimum: 5,
  redirectPath: 'example.com',
};

RatingSelect.propTypes = {
  // classes: PropTypes.object.isRequired,
  heading: PropTypes.string,
  stop: PropTypes.number,
  forwardMinimum: PropTypes.number,
  redirectPath: PropTypes.string,
};

// export default withStyles(styles)(RatingSelect);
export default RatingSelect;