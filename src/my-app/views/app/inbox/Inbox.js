import React from 'react';
import PropTypes from 'prop-types';
// import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import MasterDetail from 'my-app/layouts/masterDetail/MasterDetail'

// import AcademyApp from 'my-app/apps/academy/courses/Courses';

const styles = theme => ({
  root: {
    padding: 0,
    width: '100vw',
    // width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function Inbox(props) {
  // <AcademyApp/>

  console.log('props\n', props);
  const { classes, items } = props;
  return (
    <MasterDetail
      // title={'Inbox Detail'}
      className={classes.root}
      items={items}
      condensed create
    />
  );
}

Inbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inbox);