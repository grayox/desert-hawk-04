import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import MyMainToolbar from 'my-app/layouts/MyMainToolbar'
import MasterDetail from '../MasterDetail'

// import AcademyApp from 'my-app/apps/academy/courses/Courses';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function Inbox(props) {
  // <AcademyApp/>

  console.log('props\n', props);
  const { classes, items } = props;
  return (
    <React.Fragment>
      <MyMainToolbar />
      <MasterDetail
        // title={'Inbox Detail'}
        items={items}
        condensed
      />
    </React.Fragment>
  );
}

Inbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inbox);