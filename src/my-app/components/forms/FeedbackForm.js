import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

import { Typography, Button, TextField, } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';

const styles = theme => ({});

class FeedbackForm extends Component {
  state = {
    content: '',
    canSubmit: false,
  };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  onSubmit = model => {
    console.info('submit', model);
  };

  handleChange = name => event => {
    const newState = { [name]: event.target.value, }
    this.setState(newState);
  };

  render() {
    const { classes, } = this.props;
    const { content, canSubmit, } = this.state;

    return (
      <Paper className="max-w-sm m-32 p-32">
        {/* {this.state.content} */}
        <Typography className="h1 mb-24">Send feedback</Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            className={{...classes.margin, ...classes.textField}}
            // className={classes.textField}
            variant="outlined"
            id="feedback-form"
            label="Feedback"
            fullWidth
            multiline
            rows={5}
            value={content}
            onChange={this.handleChange('content')}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mx-auto mt-16"
            aria-label="LOG IN"
            disabled={!canSubmit}
          >
            Can submit
          </Button>
        </form>
      </Paper>
    );
  }
}

FeedbackForm.propTypes = {
  classes: PropTypes.object.isRequired,
  // heading: PropTypes.string,
  // savePath: PropTypes.string,
};

export default withStyles(styles)(FeedbackForm);