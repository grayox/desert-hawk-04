import React from 'react';
import { Hidden, } from '@material-ui/core';

// import MediaWidth from 'my-app/layouts/MediaWidth';

const MediaWidth = props => {
  const { mobile, tablet, laptop, } = props;
  return (
    <React.Fragment>
      <Hidden mdDown>{laptop}</Hidden>
      <Hidden xsDown lgUp>{tablet}</Hidden>
      <Hidden smUp>{mobile}</Hidden>
    </React.Fragment>
  );
}

export default MediaWidth;