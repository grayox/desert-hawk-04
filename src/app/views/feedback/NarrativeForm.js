import React, { useState, } from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';

import {
  Typography, Button, TextField,
  AppBar, Card, CardContent, Toolbar, // Paper,
  FormControl, FormLabel, FormControlLabel, Radio, RadioGroup,
} from '@material-ui/core';

// const styles = theme => ({});

// const ALERT_SUCCESS = 'Your note was submitted. Thank you!';
// eslint-disable-next-line
const ALERT_WARN = 'Your note has exceeded the maximum allowable size.\
                    Consider shortening it or splitting it into two parts.';

const NarrativeForm = props => {
  // const { classes, } = props;
  // const { container, margin, textField, } = classes;
  const {
    heading, label, rowsCount, minLength, maxLength,
    initialType, initialContent, initialCanSubmit, onSave,
  } = props;
  const [ type      , setType      , ] = useState(initialType);
  const [ content   , setContent   , ] = useState(initialContent);
  const [ canSubmit , setCanSubmit , ] = useState(initialCanSubmit);

  const handleSubmit = event => {
    const newData = { type, content, };
    onSave(newData);
    // console.log('content\n', content,);
    // alert(`${ALERT_SUCCESS}\n\n${content}`);
    setType(initialType);
    setContent(initialContent);
    setCanSubmit(initialCanSubmit);
  }

  const handleChangeType = event => {
    setType(event.target.value);
  }

  const handleEnableButton = () => {
    const ready1 = type && type.length;
    const ready2 = ( content && content.length ) > minLength;
    const ready = ready1 && ready2;
    setCanSubmit(ready);
  }

  const handleChangeContent = ({ target, }) => {
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

  const getAppBar = () =>
    <AppBar position="static" elevation={0}>
      <Toolbar className="pl-16 pr-8">
        <Typography variant="subtitle1" color="inherit" className="flex-1">
          {heading}
        </Typography>
      </Toolbar>
    </AppBar>

  const typeRadioConfig = [
    { value : 'bug'        , label : 'Bug report'      , } ,
    { value : 'review'     , label : 'Product review'  , } ,
    { value : 'comment'    , label : 'Comment'         , } ,
    { value : 'question'   , label : 'Question'        , } ,
    { value : 'suggestion' , label : 'Suggestion'      , } ,
    { value : 'request'    , label : 'Feature request' , } ,
  ]

  const getTypeRadio = () =>
    <FormControl component="fieldset">
      <FormLabel component="legend">Type</FormLabel>
      <RadioGroup
        aria-label="position" name="position" value={type} onChange={handleChangeType} // row
      >
        {
          typeRadioConfig.map( ( { value, label, }, ) =>
            <FormControlLabel
              value={value}
              control={<Radio color="secondary" />} // primary
              label={label}
              labelPlacement="end" // start | end | top | bottom
            />
          )
        }
      </RadioGroup>
    </FormControl>

  const getTextField = () =>
    <TextField
      // className={classNames(margin, textField,)} // className={textField}
      variant="outlined"
      id="feedback-form"
      label={label}
      fullWidth
      multiline
      rows={rowsCount}
      value={content}
      onChange={handleChangeContent}
      margin="normal"
    />

  const getButton = () =>
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

  const getCardContent = () =>
    <CardContent className="px-32 pb-32 pt-12">
    {/* <Paper className="max-w-sm m-32 p-32"> */}
      {/* <Typography className="h1 mb-24">{heading}</Typography> */}
      {getTypeRadio()}
      {getTextField()}
      {getButton()}
    {/* </Paper> */}
    </CardContent>

  return (
    <Card className="w-full m-0 md:mb-16">
      {getAppBar()} 
      {getCardContent()}
    </Card>
  );
}

NarrativeForm.defaultProps = {
  heading: 'Send us a note',
  label: 'What’s on your mind?',
  rowsCount: 8,
  minLength: 4,
  maxLength: 9999, // 1Mb/document, firestore limit
  initialType: null,
  initialContent: '',
  initialCanSubmit: false,
};

NarrativeForm.propTypes = {
  // classes: PropTypes.object.isRequired,
  heading: PropTypes.string,
  label: PropTypes.string,
  rowsCount: PropTypes.number,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  initialType: PropTypes.string,
  initialContent: PropTypes.string,
  initialCanSubmit: PropTypes.bool,
};

// export default withStyles(styles)(NarrativeForm);
export default NarrativeForm;