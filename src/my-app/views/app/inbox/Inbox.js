import React from 'react';
import PropTypes from 'prop-types';
// import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import CRUDview from 'my-app/layouts/crud/CRUDview'

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
    <CRUDview
      // title={'Inbox Detail'}
      className={classes.root}
      items={items}
      condensed creatable
    />
  );
}

Inbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inbox);