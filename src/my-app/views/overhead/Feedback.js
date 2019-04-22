// inspired by src/main/content/pages/faq/FaqPage.js

import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';

import ErrorBoundary from 'my-app/containers/ErrorBoundary';

import { Typography, } from '@material-ui/core';
import { FuseAnimate, } from '@fuse';

import FeedbackForm from 'my-app/components/forms/FeedbackForm';
import RatingSelect from 'my-app/components/selects/RatingSelect';

const styles = theme => ({
  root: {
    width: '100%'
  },
  wrapper: {
    verticalAlign: 'top', // overcomes default
    // paddingTop: '56px', // clears <AppBar />
  },
  card: {},
  cardHeader: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.getContrastText(theme.palette.grey[800])
  },
  header: {
    background: "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover',
    color: '#fff'
  },
  content: {},
  panel: {
    margin: 0,
    borderWidth: '1px 1px 0 1px',
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '&:first-child': {
      borderRadius: '16px 16px 0 0'
    },
    '&:last-child': {
      borderRadius: '0 0 16px 16px',
      borderWidth: '0 1px 1px 1px'
    }
  }
});

// function Feedback(props) {
class Feedback extends Component {

  // const { list, detail } = props;

  render()
  { 
    const { classes } = this.props;
    
    return (
      <div className={classNames(classes.root, classes.wrapper, "")}>

        <ErrorBoundary>
          <div className={classNames(classes.header, "flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360")}>
            <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
              <Typography color="inherit" className="text-36 sm:text-56 font-light">
                Send feedback
              </Typography>
            </FuseAnimate>
          </div>
        </ErrorBoundary>

        <ErrorBoundary>
          <div className={classNames(classes.content, "flex")}>
            <FuseAnimate animation="transition.slideUpIn" duration={450} delay={200}>
              <div className="flex-1 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
                <FeedbackForm />
              </div>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideUpIn" duration={300} delay={300}>
              <div className="flex-1 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
                <RatingSelect />
              </div>
            </FuseAnimate>
          </div>
        </ErrorBoundary>

      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Feedback);