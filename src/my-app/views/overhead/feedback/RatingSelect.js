// ref: http://dreyescat.github.io/react-rating/

import React, { useState, } from 'react';
import PropTypes from 'prop-types';

// import { withStyles, } from '@material-ui/core/styles';
import {
  Typography, Button,
  AppBar, Card, CardContent, Toolbar, // Paper,
} from '@material-ui/core'; // withStyles,

import { FaStar, FaRegStar, } from 'react-icons/fa'; // https://react-icons.netlify.com/#/

import Rating from 'react-rating';

// const styles = theme => ({});

// eslint-disable-next-line
const THANKS_MESSAGE = 'Thanks! 👼 Please consider also rating us at';
const FEEDBACK_REQUEST = 'Feedback submitted. Thank you. 🙏\n\nPlease consider sending us a note about how we can improve.';

const RatingSelect = props => {
  const { heading, initialRating, stop, forwardMinimum, redirectPath, } = props;
  const [ value           , setValue           , ] = useState(initialRating);
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
      // alert(value);
      // alert(`${value}. ${FEEDBACK_REQUEST}`);
      alert(FEEDBACK_REQUEST);
      return;
    }
    alert(`${THANKS_MESSAGE} ${redirectPath}`);
  }
  
  return (

    <Card className="w-full m-0 md:mb-16">
      
      <AppBar position="static" elevation={0}>
        <Toolbar className="pl-16 pr-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            {heading}
          </Typography>
        </Toolbar>
      </AppBar>

    {
    // <Paper className="max-w-sm m-32 p-32">
    //   <Typography className="h1 mb-36">{heading}</Typography>
      
      // <Typography className="body1 mb-24">{value}</Typography>
      // <Rating fractions={2} />
    }

      <CardContent className="p-32">
        <Rating
          stop={stop} initialRating={value} onClick={handleClick} // onChange={handleChange}
          emptySymbol={<FaRegStar className="mx-8 text-3xl text-orange" />}
          fullSymbol={<FaStar className="mx-8 text-3xl text-orange" />}
        />
        <Typography className="ml-12 opacity-50" hidden={!value} >
          {value && `${value}/5 stars`}
        </Typography>
        <div className="mt-24 text-right">
          <Button disabled={disabledButtons} onClick={handleReset}>Reset</Button>
          <Button variant="contained" color="secondary" disabled={disabledButtons} onClick={handleSave}>Submit</Button>
        </div>
    {/* </Paper> */}
      </CardContent>
    </Card>
  );
}

RatingSelect.defaultProps = {
  heading: 'Rate us',
  initialRating: undefined,
  stop: 5,
  forwardMinimum: 5,
  redirectPath: 'example.com',
};

RatingSelect.propTypes = {
  // classes: PropTypes.object.isRequired,
  heading: PropTypes.string,
  initialRating: PropTypes.number,
  stop: PropTypes.number,
  forwardMinimum: PropTypes.number,
  redirectPath: PropTypes.string,
};

// export default withStyles(styles)(RatingSelect);
export default RatingSelect;