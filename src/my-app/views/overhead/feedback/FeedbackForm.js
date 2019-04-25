import React, { useState, } from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';

import {
  Typography, Button, TextField,
  AppBar, Card, CardContent, Toolbar, // Paper,
} from '@material-ui/core';

// const styles = theme => ({});

const ALERT_SUCCESS = 'Your note was submitted. Thank you!';
// eslint-disable-next-line
const ALERT_WARN = 'Your note has exceeded the maximum allowable size.\
                    Consider shortening it or splitting it into two parts.';

const FeedbackForm = props => {
  // const { classes, } = props;
  // const { container, margin, textField, } = classes;
  const { heading, label, rowsCount, minLength, maxLength, initialContent, initialCanSubmit, } = props;
  const [ content   , setContent   , ] = useState(initialContent);
  const [ canSubmit , setCanSubmit , ] = useState(initialCanSubmit);

  const handleSubmit = () => {
    // console.log('content\n', content,);
    alert(`${ALERT_SUCCESS}\n\n${content}`);
    setContent(initialContent);
    setCanSubmit(initialCanSubmit);
  };

  const handleEnableButton = () => {
    const { length, } = content;
    const ready = length > minLength;
    setCanSubmit(ready);
  }

  const handleChange = ({ target, }) => {
    // console.log('target\n', target,);
    const { value, } = target;
    // console.log('value\n', value,);
    const { length, } = content;
    const isWarning = length > maxLength;
    if(isWarning) {
      alert(ALERT_WARN);
      const newStr = content.slice(0, -1);
      setContent(newStr);
      return;
    }
    setContent(value);
    handleEnableButton();
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

      <CardContent className="px-32 pb-32 pt-12">
      {/* <Paper className="max-w-sm m-32 p-32"> */}
        {/* <Typography className="h1 mb-24">{heading}</Typography> */}
        <TextField
          // className={classNames(margin, textField,)} // className={textField}
          variant="outlined"
          id="feedback-form"
          label={label}
          fullWidth
          multiline
          rows={rowsCount}
          value={content}
          onChange={handleChange}
          margin="normal"
        />
        <div className="text-right">
          <Button
            type="submit"
            variant="contained"
            // color="primary"
            color="secondary"
            className="mx-auto mt-16"
            aria-label="Submit"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      {/* </Paper> */}
      </CardContent>
    </Card>
  );
}

FeedbackForm.defaultProps = {
  heading: 'Send us a note',
  label: 'What’s on your mind?',
  rowsCount: 8,
  minLength: 4,
  maxLength: 9999, // 1Mb/document, firestore limit
  initialContent: '',
  initialCanSubmit: false,
};

FeedbackForm.propTypes = {
  // classes: PropTypes.object.isRequired,
  heading: PropTypes.string,
  label: PropTypes.string,
  rowsCount: PropTypes.number,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  initialContent: PropTypes.string,
  initialCanSubmit: PropTypes.bool,
};

// export default withStyles(styles)(FeedbackForm);
export default FeedbackForm;