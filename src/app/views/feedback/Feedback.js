// inspired by src/main/content/pages/faq/FaqPage.js

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import ErrorBoundary from 'app/containers/ErrorBoundary';

import { Typography, } from '@material-ui/core';
import { FuseAnimate, } from '@fuse';

import FeedbackForm from './FeedbackForm';
import RatingSelect from './RatingSelect';

const styles = theme => ({
  root: {
    width: '100%',
  },
  wrapper: {
    verticalAlign: 'top', // overcomes default
    // paddingTop: '56px', // clears <AppBar />
  },
  card: {},
  cardHeader: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.getContrastText(theme.palette.grey[800]),
  },
  header: {
    background: "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover',
    color: '#fff',
  },
  content: {},
  panel: {
    margin: 0,
    borderWidth: '1px 1px 0 1px',
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '&:first-child': {
      borderRadius: '16px 16px 0 0',
    },
    '&:last-child': {
      borderRadius: '0 0 16px 16px',
      borderWidth: '0 1px 1px 1px',
    },
  },
});

const Feedback = props => {
  const { classes, } = props;
  return (
    <div className={classNames(classes.root, classes.wrapper, "")}>

      <div className={classNames(classes.header, "flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360")}>
      {/* <div className="flex flex-col flex-1 md:pr-32"> */}
        <FuseAnimate animation="transition.slideDownIn" duration={400} delay={300}>
          <Typography color="inherit" className="text-36 sm:text-56 font-light">
            Send feedback
          </Typography>
        </FuseAnimate>
      </div>

      <div className={classNames(classes.content, "md:flex md:mx-24")}>
      
        <FuseAnimate animation="transition.slideLeftIn" duration={600} delay={600}>
          <ErrorBoundary>
            {/* <div className="border border-red border flex-1 max-w-xl mx-auto px-16 sm:px-24 py-24 sm:py-32"> */}
            <div className="flex-1 my-24 md:mr-12">
              <RatingSelect initialRating={undefined} />
            </div>
          </ErrorBoundary>
        </FuseAnimate>

        <FuseAnimate animation="transition.slideRightIn" duration={800} delay={900}>
          <ErrorBoundary>
            {/* <div className="border border-red flex-1 max-w-xl mx-auto px-16 sm:px-24 py-24 sm:py-32"> */}
            <div className="flex-1 my-24 md:ml-12">
              <FeedbackForm />
            </div>
          </ErrorBoundary>
        </FuseAnimate>

      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Feedback);